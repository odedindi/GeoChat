import moment from 'moment';
import * as socketio from 'socket.io';
import log from 'src/config/logger';
import { botName } from '../config/constants';
import formatMessage from '../utils/formatMessage';

class SocketController {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly messageRepository: MessageRepository,
	) {}
	initConnection = (socket: socketio.Socket) => {
		socket.on('joinRoom', ({ user, room }: { user: User; room: string }) =>
			this.joinRoom(socket, user, room),
		);
		// Listen for chatMessage
		socket.on('chatMessage', (content) =>
			this.handleChatMessage(socket, content),
		);
		socket.on('disconnect', async () => {
			this.handleDisconnection(socket);
		});
		// ====> older stuff
		socket.on('getMessages', () => this.getMessages());
		socket.on('connect_error', (error) =>
			log.error(`connect_error: ${error.message}`),
		);
	};

	userJoin = async (socketID: ID, user: User, room: string) => {
		const updatedUser: User = { ...user, socketID, room };

		// ==== InMemoryUserRepository ====
		log.info(`updatedUser: ${updatedUser.userID} in InMemoryUserRepository`);
		this.userRepository.addUser(updatedUser);

		// ==== pg Database users table ====
		log.info('check if user is already in users table if not create it');
		const match = await this.userRepository.getUserByUserID(updatedUser.userID);
		if (!match) this.userRepository.addUser(updatedUser);

		return updatedUser;
	};

	getCurrentUser = (socketID: ID) =>
		this.userRepository.getUserBySocketID(socketID);

	getRoomUsers = (room: string) => this.userRepository.getUsersByRoom(room);

	joinRoom = async (socket: socketio.Socket, user: User, room: string) => {
		const joinedUser = await this.userJoin(socket.id, user, room);
		socket.join(joinedUser.room);

		this.userRepository.updateUser(joinedUser);
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
		const messages = await this.getMessages();
		messages.forEach((message) => socket.emit('message', message));
	};

	handleChatMessage = async (socket: socketio.Socket, content: string) => {
		const user = await this.getCurrentUser(socket.id);
		const message: Message = formatMessage(user[0].username, content);
		this.messageRepository.addMessage(message);
		socket.broadcast.to(user[0].room).emit('message', message);
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
			log.info(`${user[0].socketID} is leaving the chat`);
			// this.userRepository.updateUser({ ...user[0], room: '', socketID: '' });
		}
	};

	getMessages = () => this.messageRepository.getAllMessages();
}

export default SocketController;
