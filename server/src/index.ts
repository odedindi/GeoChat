import colors from 'colors';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import { getCurrentUser, userDisconnect, joinUserToChat } from './users';
import { Server, Socket } from 'socket.io';
// import SocketIoJwt from 'socketio-jwt';

import _ from 'lodash';

import router from './router/api';
import * as C from './config/constants';

dotenv.config();

const server = express();
server.use(cors());
const httpServer = createServer(server);

const PORT = process.env.SERVER_PORT;

const socketOptions = {
	cors: { origin: '*', methods: ['GET', 'POST'] },
};
const io = new Server(httpServer, socketOptions);

const userRouter = express.Router();
userRouter.get('/', (_req, res) => res.json('OK'));
server.use('/api', router);

// initializing the socket io connection
io.on('connection', (socket: Socket) => {
	socket.on('joinRoom', ({ username, roomname }: User) => {
		const user = joinUserToChat(socket.id, username, roomname);
		console.log('JoinRoom, id: ', socket.id);
		socket.join(user.roomname);

		// display welcome message to the user
		socket.emit('message', {
			userId: user.id,
			username: user.username,
			text: `Welcome ${user.username}`,
		});

		// displays joined room message to all other users except that particular user
		socket.broadcast.to(user.roomname).emit('message', {
			userId: user.id,
			username: user.username,
			text: `${user.username} has joined the chat`,
		});
	});

	
	// user sending message
	socket.on('chat', (text: string) => {
		const user = getCurrentUser(socket.id);
		io.to(user.roomname).emit('message', {
			userId: user.id,
			username: user.username,
			text,
		});
	});

	socket.on('disconnect', () => {
		const user: User | undefined = userDisconnect(socket.id);
		if (user) {
			io.to(user.roomname).emit('message', {
				userId: user.id,
				username: user.username,
				text: `${user.username} has left the chat`,
			});
		}
	});
});

server.listen(PORT, () => {
	// tslint:disable-next-line:no-console
	console.log(colors.green(`server started at http://localhost:${PORT}`));
});
