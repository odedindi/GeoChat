import 'module-alias/register';
import * as http from 'http';
import * as socketio from 'socket.io';
import app from '@src/app';
import { log } from '@src/config';
import socketController from '@src/controllers/socket';

const PORT = process.env.SERVER_PORT;

const server = http.createServer(app);
const io = new socketio.Server(server, {
	cors: { origin: '*', methods: ['GET', 'POST'] },
});

// initializing the socket io connection
// io.use((socket, next) => {
// 	const username = socket.handshake.auth.username;
// 	if (!username) {
// 		log.error(`Socket: ${socket.id} initializing failed, invalid username`);
// 		return next(new Error('invalid username'));
// 	}
// 	socket.data.user.username = username;
// 	next();
// });
io.on('connection', (socket: socketio.Socket) => {
	log.info(`new socket connected! socket id: ${socket.id})`);
	socketController(socket, io);
});

server.listen(PORT, () => {
	log.info(`Server is running at http://localhost:${PORT}`);
});
