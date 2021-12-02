import { Controller } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
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
  initConnection = (server: Server, socket: Socket) => {
    socket.on('join', ({ user }: { user: UserDTO }) =>
      this.handleUserJoining(socket, user),
    );
    // Listen for chatMessage
    socket.on('messageFromUser', (messageFromUser: MessageFromUser) =>
      this.handleMessageFromUser(server, socket, messageFromUser),
    );
    socket.on('disconnect', async () => this.handleDisconnection(socket));

    // Listen to users requests
    socket.on('getMessages', () => this.getMessagesInProximity(socket));
    socket.on('getUsersAroundMe', () => this.getUsersInAuthorProximity(socket));

    // Listen to error
    socket.on('connect_error', (error) =>
      log.error(`connect_error: ${error.message}`),
    );
  };

  getCurrentUser = async (socketID: string) =>
    await this.usrRepo.getUser({ socketID });

  userJoin = async (socket: Socket, user: UserDTO, room = 'geoChat') => {
    const updatedUser: UserDTO = { ...user, socketID: socket.id, room };
    socket.join(updatedUser.room);
    const { userID } = updatedUser;

    log.info('check if user is already in users table if not create it');
    const match = await this.usrRepo.getUser({ userID });
    if (match.length) {
      log.info(`user found`);
      socket.emit('raiseToast', `${botName}: Welcome Back ${user.username}!`);
    } else {
      log.info('user not found, adding user to db');
      const newUser = await this.usrRepo.addUser(updatedUser);
      socket.emit('raiseToast', `${botName}: Welcome ${user.username}!`);
      log.info(`user: ${newUser.userID} added to db`);
    }
    return updatedUser;
  };

  handleUserJoining = async (socket: Socket, user: UserDTO) => {
    log.info(`handling user: ${user.userID} joining`);
    const joinedUser = await this.userJoin(socket, user);

    log.info(`updated user: ${joinedUser.userID} in pgDB`);
    await this.usrRepo.updateUser({
      data: joinedUser,
      where: { userID: joinedUser.userID },
    });

    log.info(`get messages within range`);
    const messages = await this.msgRepo.getMessagesWithinRange(
      user.geolocation_lat,
      user.geolocation_lng,
      user.preferedDistance,
    );
    log.info(`Send all messages`);
    messages.forEach((message) => socket.emit('message', message));
  };

  handleMentions = (
    server: Server,
    { content, fromuser }: MessageDTO,
    mentions: MentionedUser[],
  ) => {
    mentions.forEach(async ({ userID }, index) => {
      const mentionedUser = await this.usrRepo.getUser({ userID });
      log.info(`${index + 1}: ${mentionedUser[0].userID}`);
      const mentionedSocketID = mentionedUser[0]?.socketID;
      if (mentionedSocketID)
        server.to(mentionedSocketID).emit('youGotMentioned', fromuser, content);
    });
  };

  handleMessageFromUser = async (
    server: Server,
    socket: Socket,
    { content, coord, mentions }: MessageFromUser,
  ) => {
    const user = await this.getCurrentUser(socket.id);
    const author = user[0];
    log.info(`handling message from user ${author.userID}, ${author.username}`);
    const message = await this.msgRepo.addMessage(
      formatMessage(author.username, content, coord),
    );

    if (mentions.length) {
      log.info(`message ${message.id} contains ${mentions.length} mentions`);
      this.handleMentions(server, message, mentions);
    }
    log.info(
      `broadcast to all that are within preferred distance: ${author.preferedDistance}`,
    );
    const inAuthorProximity = await this.usrRepo.getUsersWithinRange(
      coord.lat,
      coord.lng,
      author.preferedDistance,
    );
    if (inAuthorProximity.length) {
      inAuthorProximity
        .filter(({ socketID }) => socketID !== socket.id) // exclude author for better control
        .forEach(
          ({
            geolocation_lat: lat,
            geolocation_lng: lng,
            preferedDistance,
            socketID,
          }) => {
            const withinPreferedDistance =
              preferedDistance > getAerialDistance({ lat, lng }, coord);
            if (withinPreferedDistance)
              server.to(socketID).emit('message', message);
          },
        );
    }
    log.info(`broadcast to author: ${author.userID} as well`);
    server.to(author.socketID).emit('message', message);
  };

  handleDisconnection = async (socket: Socket) => {
    const user = await this.getCurrentUser(socket.id);
    if (user[0]) {
      log.info(`${user[0].socketID} left the chat`);
    }
  };

  getUserGeoDatabySocketID = async (socketID: string) => {
    const user = await this.getCurrentUser(socketID);
    log.info(`user: ${user[0].userID} found`);
    const {
      geolocation_lat: lat,
      geolocation_lng: lng,
      preferedDistance: radius,
    } = user[0];
    return { lat, lng, radius };
  };

  getMessagesInProximity = async (socket: Socket) => {
    const { lat, lng, radius } = await this.getUserGeoDatabySocketID(socket.id);
    const messages = await this.msgRepo.getMessagesWithinRange(
      lat,
      lng,
      radius,
    );
    messages.forEach((message) => socket.emit('messagesInProximity', message));
  };

  getUsersInAuthorProximity = async (socket: Socket) => {
    const { lat, lng, radius } = await this.getUserGeoDatabySocketID(socket.id);
    const inAuthorProximity = await this.usrRepo.getUsersWithinRange(
      lat,
      lng,
      radius,
    );
    const authorLocation = { lat, lng };
    const match = inAuthorProximity.filter(
      ({
        beSeenBeyondRange,
        geolocation_lat: lat,
        geolocation_lng: lng,
        preferedDistance,
        socketID,
      }) => {
        if (socketID === socket.id) return false; // if userInProximity is the author
        const userLocation = { lat, lng };
        const withinPreferedDistance =
          preferedDistance > getAerialDistance(userLocation, authorLocation);
        if (withinPreferedDistance || beSeenBeyondRange) return true;
        return false;
      },
    );

    socket.emit('usersInAuthorProximity', match);
  };
}
