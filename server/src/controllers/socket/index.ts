import * as handle from './handlers';
import * as socketio from 'socket.io';

export const socketController = (
	socket: socketio.Socket,
	io: socketio.Server,
) => {
	handle.connectDisconnect(socket);
	handle.userIsTyping(socket);
	handle.publicMessage(socket);
	handle.privateMessage(socket, io);
	handle.changeRoom(socket);
};

export default socketController;
