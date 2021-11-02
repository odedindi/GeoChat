import * as http from 'http';
import * as socketio from 'socket.io';
import app from './app';
import { log } from './config';
import socketController from './controllers/socket';

const PORT = process.env.SERVER_PORT;

const server = http.createServer(app);
const io = new socketio.Server(server, {
	cors: { origin: '*', methods: ['GET', 'POST'] },
});

// initializing the socket io connection
io.on('connection', (socket: socketio.Socket) => {
	log.info(`new socket connected! socket id: ${socket.id})`);
	socketController(socket);
});

server.listen(PORT, () => {
	log.info(`Server is running at http://localhost:${PORT}`);
});
