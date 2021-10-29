"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketController = void 0;
const log = __importStar(require("../logger"));
const chat = __importStar(require("../chat"));
const chatControl = __importStar(require("../controllers/chat"));
const Generate = __importStar(require("../config/generators"));
const socketController = (socket) => {
    socket.on('setUsername', (user) => {
        log.info(`add user: ${user.id} to users list`);
        chatControl.addUserToUsersList(user);
        log.info(`add user: ${user.id} to public room and activeUsers list`);
        const updatedUser = chatControl.addUserToRoomAndActiveUsersList(user, chat.roomsnames.publicRoom);
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
        log.info(`user: ${updatedUser.id}) connected and joined to the public chat`);
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
        const { data: { user }, } = socket;
        const message = {
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
        const { user } = socket.data;
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
exports.socketController = socketController;
exports.default = exports.socketController;
//# sourceMappingURL=socket.js.map