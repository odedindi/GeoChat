import * as socketio from 'socket.io';
import * as log from '../logger';
import * as chat from '../chat';
import * as chatControl from '../controllers/chat';
import * as Generate from '../config/generators';

export const socketController = (socket: socketio.Socket) => {
	socket.on('setUsername', (user: User) => {
		log.info(`add user: ${user.id} to users list`);
		chatControl.addUserToUsersList(user);

		log.info(`add user: ${user.id} to public room and activeUsers list`);
		const updatedUser = chatControl.addUserToRoomAndActiveUsersList(
			user,
			chat.roomsnames.publicRoom,
		);
		log.info('join the user to the room on the socket');
		socket.join(updatedUser.currentRoomname);

		log.info('update user data on the socket');
		socket.data.user = updatedUser;

		socket.to(updatedUser.currentRoomname).emit('userChange', {
			user: updatedUser,
			event: 'enter',
		});
		const roomIndex = chatControl.get.roomIndex(updatedUser.currentRoomname);
		socket.emit('updateRoomDetails', {
			messages: chat.rooms[roomIndex].messages,
			users: chat.rooms[roomIndex].users,
		});
		log.info(
			`user: ${updatedUser.id}) connected and joined to the public chat`,
		);
		log.info('display welcome message to user');
		socket.emit('welcomeMessage', {
			createdAt: Date.now(),
			from: 'server',
			id: Generate.randomId(),
			text: `Welcome ${updatedUser.username}`,
		});

		log.info('displays joined room message to all other users');
		socket.broadcast.to(updatedUser.currentRoomname).emit('welcomeMessage', {
			createdAt: Date.now(),
			from: 'server',
			id: Generate.randomId(),
			text: `${updatedUser.username} has joined the chat`,
		});
	});

	socket.on('sendMessage', (msg) => {
		const {
			data: { user },
		}: { data: { user: User } } = socket;
		const message: Message = {
			createdAt: Date.now(),
			from: user,
			id: Generate.randomId(),
			text: msg.text,
		};

		const currentRoomIndex = chatControl.get.roomIndex(user.currentRoomname);
		chat.rooms[currentRoomIndex].messages.push(message);

		log.info(`message (id: ${message.id}) was sent`);
		socket.emit('message', message);
	});
	socket.on('disconnect', () => {
		log.info('user disconnected, remove user from data base');
		const { user }: { user: User } = socket.data;
		if (user) {
			chatControl.userDisconnected(user);
			log.info(`delete from socket: ${socket.id} all saved data `);
			socket.data = null;
		}
		socket.emit('userChange', { user, event: 'exit' });
	});

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
};

export default socketController;
