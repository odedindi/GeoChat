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

	log.info(`notify other users that user: ${socket.data.user.id} connect`);
	socket.broadcast.emit('user connected', {
		user: { ...socket.data.user, connected: true },
	});
};

export const onUserTyping = (socket: socketio.Socket) => {
	log.info(`Broadcast that ${socket.data.user.id} is typing`);
	socket.broadcast.emit('typing', { user: socket.data.user });
};
export const onUserStopTyping = (socket: socketio.Socket) => {
	log.info(`Broadcast that ${socket.data.user.id} stopped typing`);
	socket.broadcast.emit('stop typing', { user: socket.data.user });
};

export const onPrivateMessage = (
	socket: socketio.Socket,
	message: Message,
	toUser: User,
) => {
	log.info(`forward private message: ${message.id} to recipient: ${toUser.id}`);
	socket.to(toUser.id).to(socket.data.user.id).emit('private message', message);
};

export const onDisconnection = (socket: socketio.Socket) => {
	log.info(`notify other users that user: ${socket.data.user.id} disconnect`);
	socket.broadcast.emit('user disconnected', socket.data.user.id);
};
