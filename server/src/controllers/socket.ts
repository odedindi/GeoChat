import * as socketio from 'socket.io';
import { log } from '../config';
import * as chatControl from '../controllers/chat';
import { chat } from '../repositories/seeds';
import { generate } from '../utils';

export const socketController = (socket: socketio.Socket) => {
	socket.on('setUser', (user: IUser) => {
		log.info(`add user: ${user.id} to users list`);
		chatControl.addUserToUsersList(user);

		log.info(`add user: ${user.id} to public room and activeUsers list`);
		const updatedUser = chatControl.addUserToRoom(
			user,
			chat.roomsnames.publicRoom,
		);
		log.info(
			`join the user: ${user.id} to room: ${updatedUser.roomHistory[0]} on the socket`,
		);
		socket.join(updatedUser.roomHistory[0]);

		log.info(`update user: ${user.id} data on the socket: ${socket.id}`);
		socket.data.user = updatedUser;

		socket.to(updatedUser.roomHistory[0]).emit('userChange', {
			user: updatedUser,
			event: 'enter',
		});
		socket.emit('updateRoomDetails', {
			messages:
				chat.roomsDict[
					updatedUser.roomHistory[0] as keyof typeof chat.roomsDict
				].messages,
			users:
				chat.roomsDict[
					updatedUser.roomHistory[0] as keyof typeof chat.roomsDict
				].users,
		});
		log.info(
			`user: ${updatedUser.id}) connected and joined to the public chat`,
		);
		log.info(`display welcome message to user: ${user.id}`);
		socket.emit('welcomeMessage', {
			createdAt: Date.now(),
			from: 'server',
			id: generate.id(),
			text: `Welcome ${updatedUser.username}`,
		});

		log.info('displays joined room message to all other users');
		socket.broadcast.to(updatedUser.roomHistory[0]).emit('welcomeMessage', {
			createdAt: Date.now(),
			from: 'server',
			id: generate.id(),
			text: `${updatedUser.username} has joined the chat`,
		});
	});

	socket.on('sendMessageToServer', (msg) => {
		const message: IMessage = {
			createdAt: Date.now(),
			from: socket.data.user,
			id: generate.id(),
			text: msg.text,
		};

		chat.roomsDict[
			socket.data.user.roomHistory[0] as keyof typeof chat.roomsDict
		].messages.push(message);

		log.info(`message (id: ${message.id}) was sent`);
		socket.emit('message', message);
	});

	socket.on('private message', (anotherSocketId, msg) => {
		socket.to(anotherSocketId).emit('private message', socket.id, msg);
	});

	socket.on('disconnect', () => {
		log.info('user disconnected, remove user from data base');
		const { user }: { user: IUser } = socket.data;
		if (user) {
			chatControl.userDisconnected(user);
			log.info(`delete from socket: ${socket.id} all saved data `);
			socket.data = null;
		}
		socket.emit('userChange', { user, event: 'exit' });
	});
};

export default socketController;
