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
const config_1 = require("../config");
const chatControl = __importStar(require("../controllers/chat"));
const seeds_1 = require("../repositories/seeds");
const utils_1 = require("../utils");
const socketController = (socket) => {
    socket.on('setUser', (user) => {
        config_1.log.info(`add user: ${user.id} to users list`);
        chatControl.addUserToUsersList(user);
        config_1.log.info(`add user: ${user.id} to public room and activeUsers list`);
        const updatedUser = chatControl.addUserToRoom(user, seeds_1.chat.roomsnames.publicRoom);
        config_1.log.info(`join the user: ${user.id} to room: ${updatedUser.roomHistory[0]} on the socket`);
        socket.join(updatedUser.roomHistory[0]);
        config_1.log.info(`update user: ${user.id} data on the socket: ${socket.id}`);
        socket.data.user = updatedUser;
        socket.to(updatedUser.roomHistory[0]).emit('userChange', {
            user: updatedUser,
            event: 'enter',
        });
        socket.emit('updateRoomDetails', {
            messages: seeds_1.chat.roomsDict[updatedUser.roomHistory[0]].messages,
            users: seeds_1.chat.roomsDict[updatedUser.roomHistory[0]].users,
        });
        config_1.log.info(`user: ${updatedUser.id}) connected and joined to the public chat`);
        config_1.log.info(`display welcome message to user: ${user.id}`);
        socket.emit('welcomeMessage', {
            createdAt: Date.now(),
            from: 'server',
            id: utils_1.generate.id(),
            text: `Welcome ${updatedUser.username}`,
        });
        config_1.log.info('displays joined room message to all other users');
        socket.broadcast.to(updatedUser.roomHistory[0]).emit('welcomeMessage', {
            createdAt: Date.now(),
            from: 'server',
            id: utils_1.generate.id(),
            text: `${updatedUser.username} has joined the chat`,
        });
    });
    socket.on('sendMessageToServer', (msg) => {
        const message = {
            createdAt: Date.now(),
            from: socket.data.user,
            id: utils_1.generate.id(),
            text: msg.text,
        };
        seeds_1.chat.roomsDict[socket.data.user.roomHistory[0]].messages.push(message);
        config_1.log.info(`message (id: ${message.id}) was sent`);
        socket.emit('message', message);
    });
    socket.on('private message', (anotherSocketId, msg) => {
        socket.to(anotherSocketId).emit('private message', socket.id, msg);
    });
    socket.on('disconnect', () => {
        config_1.log.info('user disconnected, remove user from data base');
        const { user } = socket.data;
        if (user) {
            chatControl.userDisconnected(user);
            config_1.log.info(`delete from socket: ${socket.id} all saved data `);
            socket.data = null;
        }
        socket.emit('userChange', { user, event: 'exit' });
    });
};
exports.socketController = socketController;
exports.default = exports.socketController;
//# sourceMappingURL=socket.js.map