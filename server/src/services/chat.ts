import * as socketio from 'socket.io';
import log from 'src/config/logger';
import ChatController from 'src/controllers/chat.controller';

const chat = (io: socketio.Server) => {
	io.on('connection', (socket) => {
		/* tslint:disable-next-line */
		new ChatController(socket);
		log.info(`socket: ${socket.id} connected`);
	});
};

export default chat;
