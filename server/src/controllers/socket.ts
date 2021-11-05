import * as socketio from 'socket.io';
import log from 'src/config/logger';

export const onConnection = (socket: socketio.Socket, allUsers: User[]) => {
	log.info(`emit session: ${socket.data.sessionID} details`);
	socket.emit('session', {
		sessionID: socket.data.sessionID,
		user: socket.data.user,
	});
	socket.join(socket.data.user.id);
	log.info(`emit existing ${allUsers.length} users`);
	socket.emit('users', allUsers);

	log.info('notify existing users');
	socket.broadcast.emit('user connected', {
		user: { ...socket.data.user, connected: true },
	});
};

export const onDisconnection = (socket: socketio.Socket) => {
	socket.broadcast.emit('user disconnected', socket.data.user.id);
};

export const onPrivateMessage = (
	socket: socketio.Socket,
	message: Message,
	toUser: User,
) => {
	socket.to(toUser.id).to(socket.data.user.id).emit('private message', message);
};
