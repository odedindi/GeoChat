import * as socketio from 'socket.io';
import log from 'src/config/logger';
import SocketController from 'src/controllers/socket.controller';
import { messageRepository, userRepository } from 'src/repositories';

const socketController = new SocketController(
	userRepository,
	messageRepository,
);

const chat = (io: socketio.Server) => {
	io.on('connection', (socket) => {
		socketController.initConnection(socket);
		log.info(`socket: ${socket.id} connected`);
	});
};

export default chat;
