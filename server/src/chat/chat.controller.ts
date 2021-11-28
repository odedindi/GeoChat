import { Controller } from '@nestjs/common';
import * as socketio from 'socket.io';
import log from '../config/logger';
import { botName } from '../config/constants';
import formatMessage from '../utils/formatMessage';
import { getAerialDistance } from '../utils/haversine';

@Controller()
export default class ChatController {
  constructor(
    private readonly msgRepo: MessageRepository,
    private readonly usrRepo: UserRepository,
  ) {}
  initConnection = (socket: socketio.Socket) => {
    socket.on('join', ({ user }: { user: UserDTO }) =>
      this.handleUserJoining(socket, user),
    );
    // Listen for chatMessage
    socket.on('messageFromUser', (messageFromUser: MessageFromUser) =>
      this.handleMessageFromUser(socket, messageFromUser),
    );
    socket.on('disconnect', async () => this.handleDisconnection(socket));

    // Listen to users requests
    socket.on('getMessages', () => this.getMessagesInProximity(socket));
    socket.on('getOtherUsers', () => this.getUsersInProximity(socket));

    // Listen to error
    socket.on('connect_error', (error) =>
      log.error(`connect_error: ${error.message}`),
    );
  };

  userJoin = async (
    socket: socketio.Socket,
    user: UserDTO,
    room = 'geoChat',
  ) => {
    const updatedUser: UserDTO = { ...user, socketID: socket.id, room };
    socket.join(updatedUser.room);
    const { userID } = updatedUser;

    log.info('check if user is already in users table if not create it');
    const match = await this.usrRepo.getUser({ userID });
    log.info(`Welcome ${updatedUser.socketID}`);
    if (match.length) {
      log.info(`user found ${JSON.stringify(match)} `);
      socket.emit('raiseToast', `${botName}: Welcome Back ${user.username}!`);
    } else {
      log.info('user not found adding user to db');
      const newUser = await this.usrRepo.addUser(updatedUser);
      socket.emit('raiseToast', `${botName}: Welcome ${user.username}!`);
      log.info(`${newUser}`);
    }
    return updatedUser;
  };

  getCurrentUser = async (socketID: string) =>
    await this.usrRepo.getUser({ socketID });

  handleUserJoining = async (socket: socketio.Socket, user: UserDTO) => {
    log.info(`handling user: ${user.userID} joining`);
    const joinedUser = await this.userJoin(socket, user);

    await this.usrRepo.updateUser({
      data: joinedUser,
      where: { userID: joinedUser.userID },
    });
    log.info(`updated user: ${joinedUser.userID} in pgDB`);

    log.info(`get messages within range`);
    const messages = await this.msgRepo.getMessagesWithinRange(
      user.geolocation_lat,
      user.geolocation_lng,
      user.preferedDistance,
    );
    log.info(`Send all messages`);
    messages.forEach((message) => socket.emit('message', message));
  };

  handleMessageFromUser = async (
    socket: socketio.Socket,
    { content, coord, mentions }: MessageFromUser,
  ) => {
    const user = await this.getCurrentUser(socket.id);
    const author = user[0];
    log.info(`handling message from user ${author.userID}, ${author.username}`);
    const message: MessageDTO = formatMessage(author.username, content, coord);
    this.msgRepo.addMessage(message);

    if (mentions.length) {
      log.info(`message ${message.id} contains mentions`);
      mentions.forEach(async ({ userID }, index) => {
        const mentionedUser = await this.usrRepo.getUser({ userID });
        log.info(`${index + 1}: ${mentionedUser[0].userID}`);
        const mentionedSocketID = mentionedUser[0]?.socketID;
        if (mentionedSocketID)
          socket
            .to(mentionedSocketID)
            .emit('youGotMentioned', author.username, content);
      });
    }
    log.info(
      `broadcast message to users that are in author's preferred distance: ${author.preferedDistance} `,
    );
    const usersInProximity = await this.usrRepo.getUsersWithinRange(
      coord.lat,
      coord.lng,
      author.preferedDistance,
    );
    if (usersInProximity.length) {
      usersInProximity.forEach(
        ({
          geolocation_lat: lat,
          geolocation_lng: lng,
          preferedDistance,
          socketID,
        }) => {
          const withinUserpreferedDistance =
            preferedDistance > getAerialDistance({ lat, lng }, coord);
          if (withinUserpreferedDistance)
            socket.to(socketID).emit('message', message);
        },
      );
    }
  };

  handleDisconnection = async (socket: socketio.Socket) => {
    const user = await this.getCurrentUser(socket.id);
    if (user[0]) {
      log.info(`${user[0].socketID} left the chat`);
    }
  };

  getGeoDataFromUser = async (socketID: string) => {
    const user = await this.getCurrentUser(socketID);
    log.info(`user: ${user[0].userID} found`);
    const {
      geolocation_lat: lat,
      geolocation_lng: lng,
      preferedDistance: radius,
    } = user[0];
    return { lat, lng, radius };
  };

  getMessagesInProximity = async (socket: socketio.Socket) => {
    const { lat, lng, radius } = await this.getGeoDataFromUser(socket.id);
    const messages = await this.msgRepo.getMessagesWithinRange(
      lat,
      lng,
      radius,
    );
    messages.forEach((message) => socket.emit('messagesInProximity', message));
  };

  getUsersInProximity = async (socket: socketio.Socket) => {
    const { lat, lng, radius } = await this.getGeoDataFromUser(socket.id);
    const users = await this.usrRepo.getUsersWithinRange(lat, lng, radius);
    socket.emit('usersInProximity', users);
  };
}
