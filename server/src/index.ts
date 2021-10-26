import colors from 'colors';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import * as http from 'http';
// import { getCurrentUser, userDisconnect, joinUserToChat } from './users';
import * as socketio from 'socket.io';
// import SocketIoJwt from 'socketio-jwt';
import router from './router/api';
// import * as C from './config/constants';
import * as API from './controllers/api';
import logger, { logInfo } from './logger';
import * as W from 'winston';

dotenv.config();
const PORT = process.env.SERVER_PORT;

const app = express();
app.use(cors());

app.get('/', (_req, res) => res.json('OK'));
app.use('/api', router);

const server = http.createServer(app);
const io = new socketio.Server(server, {
	cors: { origin: '*', methods: ['GET', 'POST'] },
});

const chatRooms = [
	{
		roomname: 'publicChat',
		users: [
			{
				id: 'sd1q11223',
				name: 'gerry',
				username: 'gerry',
				currentRoomname: '',
				roomHistory: [] as string[],
				avatar: 'https://robohash.org/WoVJ0cd',
				geo: {
					lat: '',
					lng: '',
				},
			},
		] as User[],
		messages: [
			{
				from: {
					id: 'sdq123',
					name: 'bob',
					username: 'bob',
					currentRoomname: '',
					roomHistory: [] as string[],
					avatar: 'https://robohash.org/d0DGHght2Orol2FZ6GB',
					geo: {
						lat: '',
						lng: '',
					},
				},
				text: 'hey guys',
				createdAt: Date.now(),
				id: API.generateRandomId(),
			},
			{
				from: {
					id: 'sd1q11223',
					name: 'gerry',
					username: 'gerry',
					currentRoomname: '',
					roomHistory: [] as string[],
					avatar: 'https://robohash.org/WoVJ0cd',
					geo: {
						lat: '',
						lng: '',
					},
				},
				text: 'hey bob',
				createdAt: Date.now(),
				id: API.generateRandomId(),
			},
		] as Message[],
	},
];

// initializing the socket io connection
io.on('connection', (socket: socketio.Socket) => {
	logInfo('new socket connected!');

	socket.on('setUsername', (user: User) => {
		const newUser: User = {
			id: socket.id,
			name: user.name,
			username: user.username,
			currentRoomname: 'publicChat',
			roomHistory: user.roomHistory ? user.roomHistory : [],
			avatar: user.avatar ? user.avatar : API.generateRandomAvatar(),
			geo: user.geo
				? user.geo
				: {
						lat: '',
						lng: '',
				  },
		};
		chatRooms[0].users.push(newUser);
		socket.data.user = newUser;
		io.emit('userChange', { user: socket.data.user, event: 'enter' });
		socket.join(newUser.currentRoomname);
		logInfo('user connected and joined to the public chat');
	});

	socket.on('sendMessage', (msg) => {
		console.log(socket.data);
		const message: Message = {
			text: msg.text,
			from: socket.data.user,
			createdAt: Date.now(),
			id: API.generateRandomId(),
		};
		logInfo(`message was sent, messageId: ${message.id}`);
		io.emit('message', message);
	});
	socket.on('disconnect', () => {
		logInfo('user disconnected');
		io.emit('userChange', { user: socket.data.user, event: 'exit' });
	});

	// socket.on('joinGeneralChatRoom', ({ username }: User) => {
	// 	const user = joinUserToChat(socket.id, username, 'generalChatRoom');
	// 	console.log('JoinRoom, id: ', socket.id);
	// 	socket.join(user.roomname);

	// 	// display welcome message to the user
	// 	socket.emit('message', {
	// 		userId: user.id,
	// 		username: user.username,
	// 		text: `Welcome ${user.username}`,
	// 	});

	// 	// displays joined room message to all other users except that particular user
	// 	socket.broadcast.to(user.roomname).emit('message', {
	// 		userId: user.id,
	// 		username: user.username,
	// 		text: `${user.username} has joined the chat`,
	// 	});
	// });

	// socket.on('joinRoom', ({ username, roomname }: User) => {
	// 	const user = joinUserToChat(socket.id, username, roomname);
	// 	console.log('JoinRoom, id: ', socket.id);
	// 	socket.join(user.roomname);

	// 	// display welcome message to the user
	// 	socket.emit('message', {
	// 		userId: user.id,
	// 		username: user.username,
	// 		text: `Welcome ${user.username}`,
	// 	});

	// 	// displays joined room message to all other users except that particular user
	// 	socket.broadcast.to(user.roomname).emit('message', {
	// 		userId: user.id,
	// 		username: user.username,
	// 		text: `${user.username} has joined the chat`,
	// 	});
	// });

	// // user sending message
	// socket.on('chat', (text: string) => {
	// 	const user = getCurrentUser(socket.id);
	// 	io.to(user.roomname).emit('message', {
	// 		userId: user.id,
	// 		username: user.username,
	// 		text,
	// 	});
	// });

	// socket.on('disconnect', () => {
	// 	const user: User | undefined = userDisconnect(socket.id);
	// 	if (user) {
	// 		io.to(user.roomname).emit('message', {
	// 			userId: user.id,
	// 			username: user.username,
	// 			text: `${user.username} has left the chat`,
	// 		});
	// 	}
	// });
});

server.listen(PORT, () => {
	// tslint:disable-next-line:no-console
	console.log(colors.green(`server started at http://localhost:${PORT}`));
});
