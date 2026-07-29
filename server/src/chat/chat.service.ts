import { Injectable, Logger } from '@nestjs/common';
import type { Server, Socket } from 'socket.io';
import { v4 as uuid } from 'uuid';

import { PrismaService } from '../prisma/prisma.service';
import { haversineKm } from '../utils/haversine';

export type Coord = { lat: number; lng: number };

export type UserDTO = {
  userID: string;
  username: string;
  avatar: string;
  socketID: string;
  room: string;
  preferedDistance: number;
  geolocation_lat: number;
  geolocation_lng: number;
  beSeenBeyondRange: boolean;
};

export type MessageDTO = {
  messageID: string;
  fromuser: string;
  content: string;
  createdat: string;
  geolocation_lat: number;
  geolocation_lng: number;
};

export type Mention = { userID: string; username: string };

export type MessageFromUser = {
  content: string;
  coord: Coord;
  mentions: Mention[];
};

const BOT = 'GeoBot';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(private readonly prisma: PrismaService) {}

  async upsertUserOnJoin(socket: Socket, user: UserDTO): Promise<UserDTO> {
    const merged: UserDTO = {
      ...user,
      socketID: socket.id,
      room: user.room || 'geoChat',
    };
    socket.join(merged.room);
    // Keep the merged user on the socket immediately so other handlers
    // can use it before the DB write completes (prevents transient races).
    socket.data = { ...socket.data, user: merged };
    // Let the client know it may proceed; DB upsert follows.
    try {
      socket.emit('joined');
    } catch (err) {
      this.logger.debug('failed to emit joined event');
      console.error('failed to emit joined event', { cause: err });
    }

    // Try find by userID first. If not found, check username collision and update that record.
    const existing = await this.prisma.user.findUnique({
      where: { userID: merged.userID },
    });
    if (existing) {
      await this.prisma.user.update({
        where: { userID: merged.userID },
        data: {
          socketID: merged.socketID,
          room: merged.room,
          avatar: merged.avatar,
          username: merged.username,
          preferedDistance: merged.preferedDistance,
          geolocation_lat: merged.geolocation_lat,
          geolocation_lng: merged.geolocation_lng,
          beSeenBeyondRange: merged.beSeenBeyondRange,
        },
      });
    } else {
      const byName = await this.prisma.user.findUnique({
        where: { username: merged.username },
      });
      if (byName) {
        // Username exists for another record — update it to attach this socket and userID.
        await this.prisma.user.update({
          where: { username: merged.username },
          data: {
            socketID: merged.socketID,
            userID: merged.userID,
            room: merged.room,
            avatar: merged.avatar,
            preferedDistance: merged.preferedDistance,
            geolocation_lat: merged.geolocation_lat,
            geolocation_lng: merged.geolocation_lng,
            beSeenBeyondRange: merged.beSeenBeyondRange,
          },
        });
      } else {
        await this.prisma.user.create({
          data: {
            username: merged.username,
            userID: merged.userID,
            avatar: merged.avatar,
            socketID: merged.socketID,
            room: merged.room,
            preferedDistance: merged.preferedDistance,
            geolocation_lat: merged.geolocation_lat,
            geolocation_lng: merged.geolocation_lng,
            beSeenBeyondRange: merged.beSeenBeyondRange,
          },
        });
        socket.emit('raiseToast', `${BOT}: Welcome, ${merged.username}!`);
        this.logger.log(`New user joined: ${merged.username}`);
      }
    }

    return merged;
  }

  async getMessagesInRange(lat: number, lng: number, radiusKm: number): Promise<MessageDTO[]> {
    const rows = await this.prisma.$queryRaw<MessageDTO[]>`
      SELECT "messageID", "fromuser", "content", "createdat",
             "geolocation_lat", "geolocation_lng"
      FROM "Message"
      WHERE ST_DWithin(
        ST_MakePoint("geolocation_lng", "geolocation_lat")::geography,
        ST_MakePoint(${lng}, ${lat})::geography,
        ${radiusKm * 1000}
      )
      ORDER BY "createdat" ASC
      LIMIT 500
    `;
    return rows;
  }

  async getUsersInRange(lat: number, lng: number, radiusKm: number) {
    return this.prisma.$queryRaw<UserDTO[]>`
      SELECT "userID", "username", "avatar", "socketID", "room",
             "preferedDistance", "geolocation_lat", "geolocation_lng",
             "beSeenBeyondRange"
      FROM "User"
      WHERE ST_DWithin(
        ST_MakePoint("geolocation_lng", "geolocation_lat")::geography,
        ST_MakePoint(${lng}, ${lat})::geography,
        ${radiusKm * 1000}
      )
    `;
  }

  async getUserBySocket(socketID: string) {
    return this.prisma.user.findUnique({ where: { socketID } });
  }

  async addMessage(username: string, content: string, coord: Coord): Promise<MessageDTO> {
    const msg = await this.prisma.message.create({
      data: {
        messageID: uuid(),
        content,
        createdat: Date.now().toString(),
        geolocation_lat: coord.lat,
        geolocation_lng: coord.lng,
        user: { connect: { username } },
      },
    });
    return {
      messageID: msg.messageID,
      fromuser: msg.fromuser,
      content: msg.content,
      createdat: msg.createdat,
      geolocation_lat: msg.geolocation_lat,
      geolocation_lng: msg.geolocation_lng,
    };
  }

  async handleJoin(server: Server, socket: Socket, user: UserDTO) {
    void server;
    const joined = await this.upsertUserOnJoin(socket, user);
    const msgs = await this.getMessagesInRange(
      joined.geolocation_lat,
      joined.geolocation_lng,
      joined.preferedDistance,
    );
    for (const m of msgs) socket.emit('message', m);
  }

  async handleMessage(server: Server, socket: Socket, payload: MessageFromUser) {
    let author: any = await this.getUserBySocket(socket.id);
    if (!author) {
      // Try to upsert user again if socket.data.user exists (race condition fix)
      const suser = socket.data?.user as UserDTO | undefined;
      if (suser) {
        await this.upsertUserOnJoin(socket, suser);
        author = await this.getUserBySocket(socket.id);
      }
    }
    if (!author) {
      socket.emit('raiseToast', `${BOT}: Please rejoin to send messages.`);
      return;
    }

    const message = await this.addMessage(author.username, payload.content, payload.coord);

    // Mention DMs
    if (payload.mentions?.length) {
      for (const m of payload.mentions) {
        const target = await this.prisma.user.findUnique({
          where: { userID: m.userID },
        });
        if (target?.socketID) {
          server.to(target.socketID).emit('youGotMentioned', author.username, payload.content);
        }
      }
    }

    // Broadcast to listeners in author's preferred range AND
    // whose own range covers the message (or who opted to be seen beyond range).
    const nearby = await this.getUsersInRange(
      payload.coord.lat,
      payload.coord.lng,
      author.preferedDistance,
    );
    for (const u of nearby as UserDTO[]) {
      if (u.socketID === socket.id) continue;
      const dist = haversineKm({ lat: u.geolocation_lat, lng: u.geolocation_lng }, payload.coord);
      if (u.beSeenBeyondRange || u.preferedDistance >= dist) {
        server.to(u.socketID).emit('message', message);
      }
    }
    socket.emit('message', message);
  }

  async sendMessagesInProximity(socket: Socket) {
    let author: any = await this.getUserBySocket(socket.id);
    if (!author) {
      author = socket.data?.user as UserDTO | undefined;
    }
    if (!author) return;
    const msgs = await this.getMessagesInRange(
      author.geolocation_lat,
      author.geolocation_lng,
      author.preferedDistance,
    );
    socket.emit('messagesInProximity', msgs);
  }

  async sendUsersAroundMe(socket: Socket) {
    let author: any = await this.getUserBySocket(socket.id);
    if (!author) {
      author = socket.data?.user as UserDTO | undefined;
    }
    if (!author) return;
    const others = (
      await this.getUsersInRange(
        author.geolocation_lat,
        author.geolocation_lng,
        author.preferedDistance,
      )
    ).filter((u) => u.socketID !== socket.id);
    socket.emit('usersInAuthorProximity', others);
  }

  async handleDisconnect(socket: Socket) {
    const user =
      (await this.getUserBySocket(socket.id)) ?? (socket.data?.user as UserDTO | undefined);
    if (user) this.logger.log(`${user.username} disconnected`);
  }
}
