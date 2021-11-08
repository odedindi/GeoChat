import { userRepository, messageRepository } from 'src/repositories';
import * as socketio from 'socket.io';
import log from 'src/config/logger';
import { botName } from '../config/constants';
import formatMessage from '../utils/formatMessage';

class ChatController {
	socket: socketio.Socket;
	constructor(socket: socketio.Socket) {
		this.socket = socket;

		socket.on('joinRoom', ({ user, room }: { user: User; room: string }) =>
			this.joinRoom(user, room),
		);
		// Listen for chatMessage
		socket.on('chatMessage', (msg) => this.handleChatMessage(msg));
		socket.on('disconnect', () => this.handleDisconnection());

		// ====> older stuff
		socket.on('getMessages', () => this.getMessages());
		socket.on('connect_error', (err) =>
			log.error(`connect_error: ${err.message}`),
		);
	}

	userJoin = (socketID: ID, user: User, room: string) => {
		const updatedUser: User = { ...user, socketID, room };
		log.info(`set updatedUser: ${JSON.stringify(updatedUser)} in users db`);
		userRepository.addUser(updatedUser.socketID, updatedUser);
		return updatedUser;
	};
	getCurrentUser = (socketID: ID) => userRepository.getUserBySocketID(socketID);
	userLeave = (socketID: ID) => userRepository.getUserBySocketID(socketID);
	getRoomUsers = (room: string) => userRepository.getUsersByRoom(room);

	joinRoom = (user: User, room: string) => {
		const joinedUser = this.userJoin(this.socket.id, user, room);
		this.socket.join(joinedUser.room);

		log.info(`Welcome ${joinedUser.socketID}`);
		this.emitMessage(formatMessage(botName, 'Welcome!'));

		log.info(
			`Broadcast to ${joinedUser.room} that ${joinedUser.socketID} connected`,
		);
		this.broadcastMessage(
			joinedUser.room,
			formatMessage(botName, `${joinedUser.username} has joined the chat`),
		);

		log.info(
			`Send number of room users (${
				this.getRoomUsers(joinedUser.room).length
			}) and room info to room: ${room} `,
		);
		this.broadcastRoomUsers(joinedUser.room, {
			room: joinedUser.room,
			users: this.getRoomUsers(joinedUser.room),
		});
	};
	handleChatMessage = (msg: string) => {
		const user = this.getCurrentUser(this.socket.id);
		console.log('handleChatMessage: user: ', user);
		const message: Message = formatMessage(user.username, msg);
		messageRepository.addMessage(message);
		this.broadcastMessage(user.room, message);
	};
	handleDisconnection = () => {
		const user = this.userLeave(this.socket.id);
		if (user) {
			log.info(`${user.socketID} has left the chat`);
			userRepository.removeUser(this.socket.id);
			log.info(`Broadcast to ${user.room} that ${user.socketID} disconnected`);
			this.broadcastMessage(
				user.room,
				formatMessage(botName, `${user.username} has left the chat`),
			);
			this.broadcastRoomUsers(user.room, {
				room: user.room,
				users: this.getRoomUsers(user.room),
			});
		}
	};

	getMessages = () => {
		const allMessages = messageRepository.getAllMessages();
		allMessages.forEach((message) => this.emitMessage(message));
	};
	emitMessage = (message: Message) => {
		this.socket.emit('message', message);
	};
	broadcastMessage = (room: string, message: Message) => {
		this.socket.broadcast.to(room).emit('message', message);
	};
	broadcastRoomUsers = (
		room: string,
		message: { room: string; users: User[] },
	) => this.socket.broadcast.to(room).emit('roomUsers', message);
}

export default ChatController;
