import { Controller } from '@nestjs/common';
import * as socketio from 'socket.io';
import log from 'src/config/logger';
import { botName } from '../config/constants';
import formatMessage from '../utils/formatMessage';

@Controller()
export default class ChatController {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly userRepository: UserRepository,
  ) {}
  initConnection = (socket: socketio.Socket) => {
    socket.on('join', ({ user, room }: { user: UserDTO; room: string }) =>
      this.joinRoom(socket, user, room),
    );
    // Listen for chatMessage
    socket.on('chatMessage', ({ content, coord }) =>
      this.handleChatMessage(socket, content, coord),
    );
    socket.on('disconnect', async () => this.handleDisconnection(socket));
    // ====> older stuff
    socket.on('getMessages', () => this.getMessages(socket));
    socket.on('connect_error', (error) =>
      log.error(`connect_error: ${error.message}`),
    );
  };

  userJoin = async (socketID: string, user: UserDTO, room: string) => {
    const updatedUser: UserDTO = { ...user, socketID, room };
    const { userID } = updatedUser;

    log.info('check if user is already in users table if not create it');
    const match = await this.userRepository.getUser({ userID });
    if (!match) this.userRepository.addUser(updatedUser);

    return updatedUser;
  };

  getCurrentUser = async (socketID: string) =>
    await this.userRepository.getUser({ socketID });

  // TODO: modify join room ============>
  // migrate from rooms to only geolocations

  getRoomUsers = (room: string) =>
    this.userRepository.getAllUsers({ where: { room } });

  joinRoom = async (socket: socketio.Socket, user: UserDTO, room: string) => {
    const joinedUser = await this.userJoin(socket.id, user, room);
    socket.join(joinedUser.room);

    this.userRepository.updateUser({
      data: joinedUser,
      where: { userID: joinedUser.userID },
    });
    log.info(
      `updated user: ${joinedUser.userID} room: ${room} details in pgDB`,
    );

    log.info(`Welcome ${joinedUser.socketID}`);
    socket.emit('message', formatMessage(botName, 'Welcome Back!'));

    log.info(
      `Broadcast to ${joinedUser.room} that ${joinedUser.socketID} connected`,
    );
    socket.broadcast
      .to(joinedUser.room)
      .emit(
        'message',
        formatMessage(botName, `${joinedUser.username} has joined the chat`),
      );

    const users = await this.getRoomUsers(joinedUser.room);
    log.info(
      `Send room users (total of ${users.length}) and to room: ${room} `,
    );

    socket.broadcast.to(joinedUser.room).emit('roomUsers', {
      room: joinedUser.room,
      users,
    });

    log.info(`Send old messages`);

    const messages = await this.messageRepository.getMessagesWithinRange(
      user.geolocation_lat,
      user.geolocation_lng,
      user.preferedDistance,
    );
    messages.forEach((message) => socket.emit('message', message));
  };
  // TODO: modify join room <===================

  handleChatMessage = async (
    socket: socketio.Socket,
    content: string,
    coord: Coord,
  ) => {
    const user = await this.getCurrentUser(socket.id);
    const message: MessageDTO = formatMessage(user[0].username, content, coord);
    this.messageRepository.addMessage(message);
    socket.emit('message', message);
  };

  handleDisconnection = async (socket: socketio.Socket) => {
    const user = await this.getCurrentUser(socket.id);
    if (user[0]) {
      log.info(
        `Broadcast to ${user[0].room} that ${user[0].socketID} disconnected`,
      );
      socket.broadcast
        .to(user[0].room)
        .emit(
          'message',
          formatMessage(botName, `${user[0].username} has left the chat`),
        );
      socket.broadcast.to(user[0].room).emit('roomUsers', {
        room: user[0].room,
        users: this.getRoomUsers(user[0].room),
      });
      log.info(`${user[0].socketID} left the chat`);
      // this.userRepository.updateUser({ ...user[0], room: '', socketID: '' });
    }
  };

  getMessages = async (socket: socketio.Socket) => {
    const user = await this.getCurrentUser(socket.id);
    if (user[0]) {
      log.info(`user: ${user[0].userID} found`);
      const {
        geolocation_lat: lat,
        geolocation_lng: lng,
        preferedDistance: radius,
      } = user[0];
      const messages = await this.messageRepository.getMessagesWithinRange(
        lat,
        lng,
        radius,
      );
      messages.forEach((message) => socket.emit('message', message));
    } else log.error(`User with socketID: ${socket.id} was not found `);
  };
}
