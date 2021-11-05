import * as socketio from 'socket.io';
import { v4 as uuid } from 'uuid';
import { io } from 'src/server';
import * as socketController from 'src/controllers/socket';
import {
	sessionRepository,
	roomRepository,
	userRepository,
	messageRepository,
} from 'src/repositories';
import seed from 'src/repositories/seed';
import log from 'src/config/logger';

// seed
seed.users.forEach((user) => userRepository.addOrUpdateUser(user));
seed.roomnames.forEach((roomname) => roomRepository.createRoom(roomname));

io.use((socket, next) => {
	const sessionID = socket.handshake.auth.sessionID;
	if (sessionID) {
		const session = sessionRepository.getSession(sessionID);
		if (session) {
			socket.data.sessionID = sessionID;
			socket.data.user = session.user;
			return next();
		}
	}
	const username = socket.handshake.auth.username;
	if (!username) {
		return next(new Error('invalid username'));
	}
	socket.data.sessionID = uuid();
	socket.data.user.id = uuid();
	socket.data.user.username = username;
	next();
});

io.on('connection', (socket: socketio.Socket) => {
	log.info(`new socket connected! socket id: ${socket.id})`);
	sessionRepository.newSession(socket.data.sessionID, {
		user: socket.data.user,
		connected: true,
	});

	log.info(`create and join "${socket.data.user.id}" room`);
	roomRepository.createRoom(socket.data.user.id);
	roomRepository.joinUserToRoom(socket.data.user, socket.data.user.id);

	log.info(`fetch existing data`);
	const msgsPerUser = new Map<UserID, Message[]>();

	messageRepository.findUserMessages(socket.data.user.id).forEach((msg) => {
		const { from, to } = msg;
		const otherUser = socket.data.user.id === from.id ? to : from;
		msgsPerUser.has(otherUser.id)
			? msgsPerUser.get(otherUser.id).push(msg)
			: msgsPerUser.set(otherUser.id, [msg]);
	});
	sessionRepository.getAllSessions().forEach((session) => {
		userRepository.addOrUpdateUser({
			...session.user,
			messages: msgsPerUser.get(session.user.id) || [],
		});
	});
	socketController.onConnection(socket, userRepository.getAllUsers());

	socket.on('typing', () => socketController.onUserTyping(socket));

	socket.on('stop typing', () => socketController.onUserStopTyping(socket));

	socket.on('private message', ({ text, to }: Message) => {
		const toUser = to.id
			? userRepository.getUser({ id: to.id })
			: userRepository.getUser({ username: to.username });

		const message: Message = {
			id: uuid(),
			createdAt: Date.now(),
			text,
			from: socket.data.user,
			to: toUser,
		};

		messageRepository.saveMessage(message);
		socketController.onPrivateMessage(socket, message, toUser);
	});

	socket.on('disconnect', async () => {
		const matchingSockets = await io.in(socket.data.user.id).allSockets();
		const isDisconnected = matchingSockets.size === 0;
		if (isDisconnected) {
			log.info(`update session: ${socket.data.sessionID} connection status`);
			sessionRepository.newSession(socket.data.sessionID, {
				user: socket.data.user,
				connected: false,
			});
			socketController.onDisconnection(socket);
		}
	});
});
