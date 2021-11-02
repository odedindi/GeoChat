import { log } from '../../config';
import * as chatControl from '../../controllers/chat';
import { chat } from '../../repositories/seeds';
import * as socketio from 'socket.io';
import { generate } from '../../utils';
import { Message, User } from 'src/repositories/model';

export const handleJoinUserToRoom = (
	socket: socketio.Socket,
	roomname: string,
) => {
	log.info(
		`add user: ${socket.data.user.id} to public room and activeUsers list`,
	);
	const updatedUser = chatControl.addUserToRoom(socket.data.user, roomname);

	log.info(`update user: ${socket.data.user.id} information in socket.data`);
	socket.data.user = updatedUser;

	log.info(`join the user: ${socket.data.user.id} to roomname: ${roomname}`);
	socket.join(socket.data.user.currentRoomname);
	socket.to(socket.data.user.currentRoomname).emit('userChange', {
		user: socket.data.user.username,
		event: 'enter',
	});
};

export const handleConnectAndDisconnect = (socket: socketio.Socket) => {
	let addedUser = false;

	socket.on('setUser', (user: IUser) => {
		if (addedUser) return;
		const newUser = new User(user);
		socket.data.user = newUser;
		log.info(`add user: ${newUser.id} to public room`);
		chat.roomsDict.publicRoom.users.push(newUser);
		handleJoinUserToRoom(socket, chat.roomsnames.publicRoom);
		addedUser = true;
	});

	socket.on('disconnect', () => {
		if (addedUser) log.info(`User ${socket.data.user.id} disconneted`);
		socket.broadcast.emit('userChange', {
			username: socket.data.userusername,
			event: 'exit',
		});
		addedUser = false;
	});
};

export const handleUserIsTyping = (socket: socketio.Socket) => {
	socket.on('typing', () => {
		log.info(`user: ${socket.data.user.id} is typing`);
		socket.broadcast.emit('typing', { username: socket.data.user.username });
	});

	socket.on('stop typing', () => {
		log.info(`user: ${socket.data.user.id} stopped typing`);
		socket.broadcast.emit('stop typing', {
			username: socket.data.user.username,
		});
	});
};

export const handlePublicMessage = (socket: socketio.Socket) => {
	socket.on('sendMessageToServer', (msg) => {
		const newMessage = new Message({
			createdAt: Date.now(),
			from: socket.data.user,
			id: generate.id(),
			text: msg.text,
		});

		log.info(``);
		chat.roomsDict[
			socket.data.user.currentRoomname as keyof typeof chat.roomsDict
		].messages.push(newMessage);

		log.info(`message (id: ${newMessage.id}) was sent`);
		socket.emit('message', newMessage);
	});
};

export const handlePrivateMessage = (
	io: socketio.Server,
	socket: socketio.Socket,
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
