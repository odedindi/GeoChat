import { log } from '@src/config';
import { User, Message, ChatApp } from '@src/repositories/model';
import seed from '@src/repositories/seed';
import * as socketio from 'socket.io';
import { generate } from '@src/utils';
import geoChat from '@src/services/geoChat';
import { publicRoomName } from '@src/config/constants';

export const connectDisconnect = (socket: socketio.Socket) => {
	log.info(
		`connectDisconnect| new socket connection: ${JSON.stringify(socket.data)}`,
	);
	socket.on('setUser', (user: IUser) => {
		const newUser = new User({ ...user });
		geoChat.newUser(newUser);

		log.info(`update geoChat ${JSON.stringify(geoChat)}`);
		socket.data.user = newUser;
		log.info(`add user: ${socket.data.user?.id} to public room`);
		joinUserToRoom(socket, publicRoomName);
	});

	socket.on('disconnect', () => {
		log.info(`User ${socket.data.user?.id} disconneted`);
		socket.broadcast.emit('userChange', {
			username: socket.data.user?.username,
			event: 'exit',
		});
	});
};

export const joinUserToRoom = (socket: socketio.Socket, roomname: string) => {
	log.info(`joinUserToRoom| socket.data: ${JSON.stringify(socket.data.user)}`);
	log.info(`add user: ${socket.data.user?.id} to room: ${roomname}`);
	// const room: IRoom = geoChat.getRoom(roomname)
	// room.newUser(socket.data.user);
	// log.info(`update user: ${socket.data.user?.id} information in socket.data`);
	// socket.data.user?.newRoom(roomname);
	// socket.data.user = updatedUser;

	log.info(`join the user: ${socket.data.user?.id} to roomname: ${roomname}`);
	socket.join(roomname);
	socket.to(roomname).emit('userChange', {
		user: socket.data.user?.username,
		event: 'enter',
	});
};

export const changeRoom = (socket: socketio.Socket) => {
	socket.on('changeRoom', (roomname: string) =>
		joinUserToRoom(socket, roomname),
	);
};

export const userIsTyping = (socket: socketio.Socket) => {
	socket.on('typing', () => {
		log.info(`user: ${socket.data.user?.id} is typing`);
		socket.broadcast.emit('typing', { username: socket.data.user?.username });
	});

	socket.on('stop typing', () => {
		log.info(`user: ${socket.data.user?.id} stopped typing`);
		socket.broadcast.emit('stop typing', {
			username: socket.data.user?.username,
		});
	});
};

export const publicMessage = (socket: socketio.Socket) => {
	socket.on('sendMessageToServer', (msg) => {
		const newMessage = new Message({
			createdAt: Date.now(),
			from: socket.data.user,
			id: generate.id(),
			text: msg.text,
		});

		log.info(``);

		socket.data.user?.newOutgoingMessage(msg);
		socket.data.user?.roomHistory[0].newMessage(msg);
		log.info(`message (id: ${newMessage.id}) was sent`);
		socket.emit('message', newMessage);
	});
};

export const privateMessage = (
	socket: socketio.Socket,
	io: socketio.Server,
) => {
	socket.on('sendPrivateMessage', (msg: IMessage) => {
		const newPrivateMessage = new Message({
			createdAt: Date.now(),
			from: socket.data.user as IUser,
			id: generate.id(),
			text: msg.text,
		});
		io.to(socket.id).emit('incomingPrivateMessage', newPrivateMessage);
	});
};
