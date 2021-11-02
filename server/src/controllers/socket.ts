import * as socketio from 'socket.io';
import * as log from '../logger';
import * as chat from '../chat';
import * as chatControl from '../controllers/chat';
import { generate } from '../utils';

export const socketController = (socket: socketio.Socket) => {
	socket.on('setUser', (user: User) => {
		log.info(`add user: ${user.id} to users list`);
		chatControl.addUserToUsersList(user);

		log.info(`add user: ${user.id} to public room and activeUsers list`);
		const updatedUser = chatControl.addUserToRoomAndActiveUsersList(
			user,
			chat.roomsnames.publicRoom,
		);
		log.info(
			`join the user: ${user.id} to room: ${updatedUser.currentRoomname} on the socket`,
		);
		socket.join(updatedUser.currentRoomname);

		log.info(`update user: ${user.id} data on the socket: ${socket.id}`);
		socket.data.user = updatedUser;

		socket.to(updatedUser.currentRoomname).emit('userChange', {
			user: updatedUser,
			event: 'enter',
		});
		const roomIndex = chatControl.get.roomIndex(updatedUser.currentRoomname);
		socket.emit('updateRoomDetails', {
			messages: chat.rooms[roomIndex].messages,
			users: chat.rooms[roomIndex].users,
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
		socket.broadcast.to(updatedUser.currentRoomname).emit('welcomeMessage', {
			createdAt: Date.now(),
			from: 'server',
			id: generate.id(),
			text: `${updatedUser.username} has joined the chat`,
		});
	});

	socket.on('sendMessageToServer', (msg) => {
		const {
			data: { user },
		}: { data: { user: User } } = socket;
		const message: Message = {
			createdAt: Date.now(),
			from: user,
			id: generate.id(),
			text: msg.text,
		};

		const currentRoomIndex = chatControl.get.roomIndex(user.currentRoomname);
		chat.rooms[currentRoomIndex].messages.push(message);

		log.info(`message (id: ${message.id}) was sent`);
		socket.emit('message', message);
	});

	socket.on('private message', (anotherSocketId, msg) => {
		socket.to(anotherSocketId).emit('private message', socket.id, msg);
	});

	socket.on('disconnect', () => {
		log.info('user disconnected, remove user from data base');
		const { user }: { user: User } = socket.data;
		if (user) {
			chatControl.userDisconnected(user);
			log.info(`delete from socket: ${socket.id} all saved data `);
			socket.data = null;
		}
		socket.emit('userChange', { user, event: 'exit' });
	});
};

export default socketController;
