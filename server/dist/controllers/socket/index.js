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
exports.handlePrivateMessage = exports.handlePublicMessage = exports.handleUserIsTyping = exports.handleConnectAndDisconnect = exports.handleJoinUserToRoom = void 0;
const config_1 = require("../../config");
const chatControl = __importStar(require("../../controllers/chat"));
const seeds_1 = require("../../repositories/seeds");
const utils_1 = require("../../utils");
const model_1 = require("src/repositories/model");
const handleJoinUserToRoom = (socket, roomname) => {
    config_1.log.info(`add user: ${socket.data.user.id} to public room and activeUsers list`);
    const updatedUser = chatControl.addUserToRoom(socket.data.user, roomname);
    config_1.log.info(`update user: ${socket.data.user.id} information in socket.data`);
    socket.data.user = updatedUser;
    config_1.log.info(`join the user: ${socket.data.user.id} to roomname: ${roomname}`);
    socket.join(socket.data.user.currentRoomname);
    socket.to(socket.data.user.currentRoomname).emit('userChange', {
        user: socket.data.user.username,
        event: 'enter',
    });
};
exports.handleJoinUserToRoom = handleJoinUserToRoom;
const handleConnectAndDisconnect = (socket) => {
    let addedUser = false;
    socket.on('setUser', (user) => {
        if (addedUser)
            return;
        const newUser = new model_1.User(user);
        socket.data.user = newUser;
        config_1.log.info(`add user: ${newUser.id} to public room`);
        seeds_1.chat.roomsDict.publicRoom.users.push(newUser);
        (0, exports.handleJoinUserToRoom)(socket, seeds_1.chat.roomsnames.publicRoom);
        addedUser = true;
    });
    socket.on('disconnect', () => {
        if (addedUser)
            config_1.log.info(`User ${socket.data.user.id} disconneted`);
        socket.broadcast.emit('userChange', {
            username: socket.data.userusername,
            event: 'exit',
        });
        addedUser = false;
    });
};
exports.handleConnectAndDisconnect = handleConnectAndDisconnect;
const handleUserIsTyping = (socket) => {
    socket.on('typing', () => {
        config_1.log.info(`user: ${socket.data.user.id} is typing`);
        socket.broadcast.emit('typing', { username: socket.data.user.username });
    });
    socket.on('stop typing', () => {
        config_1.log.info(`user: ${socket.data.user.id} stopped typing`);
        socket.broadcast.emit('stop typing', {
            username: socket.data.user.username,
        });
    });
};
exports.handleUserIsTyping = handleUserIsTyping;
const handlePublicMessage = (socket) => {
    socket.on('sendMessageToServer', (msg) => {
        const newMessage = new model_1.Message({
            createdAt: Date.now(),
            from: socket.data.user,
            id: utils_1.generate.id(),
            text: msg.text,
        });
        config_1.log.info(``);
        seeds_1.chat.roomsDict[socket.data.user.currentRoomname].messages.push(newMessage);
        config_1.log.info(`message (id: ${newMessage.id}) was sent`);
        socket.emit('message', newMessage);
    });
};
exports.handlePublicMessage = handlePublicMessage;
const handlePrivateMessage = (io, socket) => {
    socket.on('sendPrivateMessage', (msg) => {
        const newPrivateMessage = new model_1.Message({
            createdAt: Date.now(),
            from: socket.data.user,
            id: utils_1.generate.id(),
            text: msg.text,
        });
        io.to(socket.id).emit('incomingPrivateMessage', newPrivateMessage);
    });
};
exports.handlePrivateMessage = handlePrivateMessage;
//# sourceMappingURL=index.js.map