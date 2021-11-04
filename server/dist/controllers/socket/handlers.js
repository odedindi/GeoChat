"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.privateMessage = exports.publicMessage = exports.userIsTyping = exports.changeRoom = exports.joinUserToRoom = exports.connectDisconnect = void 0;
const config_1 = require("@src/config");
const model_1 = require("@src/repositories/model");
const utils_1 = require("@src/utils");
const geoChat_1 = __importDefault(require("@src/services/geoChat"));
const constants_1 = require("@src/config/constants");
const connectDisconnect = (socket) => {
    config_1.log.info(`connectDisconnect| new socket connection: ${JSON.stringify(socket.data)}`);
    socket.on('setUser', (user) => {
        var _a;
        const newUser = new model_1.User(Object.assign({}, user));
        geoChat_1.default.newUser(newUser);
        config_1.log.info(`update geoChat ${JSON.stringify(geoChat_1.default)}`);
        socket.data.user = newUser;
        config_1.log.info(`add user: ${(_a = socket.data.user) === null || _a === void 0 ? void 0 : _a.id} to public room`);
        (0, exports.joinUserToRoom)(socket, constants_1.publicRoomName);
    });
    socket.on('disconnect', () => {
        var _a, _b;
        config_1.log.info(`User ${(_a = socket.data.user) === null || _a === void 0 ? void 0 : _a.id} disconneted`);
        socket.broadcast.emit('userChange', {
            username: (_b = socket.data.user) === null || _b === void 0 ? void 0 : _b.username,
            event: 'exit',
        });
    });
};
exports.connectDisconnect = connectDisconnect;
const joinUserToRoom = (socket, roomname) => {
    var _a, _b, _c;
    config_1.log.info(`joinUserToRoom| socket.data: ${JSON.stringify(socket.data.user)}`);
    config_1.log.info(`add user: ${(_a = socket.data.user) === null || _a === void 0 ? void 0 : _a.id} to room: ${roomname}`);
    // const room: IRoom = geoChat.getRoom(roomname)
    // room.newUser(socket.data.user);
    // log.info(`update user: ${socket.data.user?.id} information in socket.data`);
    // socket.data.user?.newRoom(roomname);
    // socket.data.user = updatedUser;
    config_1.log.info(`join the user: ${(_b = socket.data.user) === null || _b === void 0 ? void 0 : _b.id} to roomname: ${roomname}`);
    socket.join(roomname);
    socket.to(roomname).emit('userChange', {
        user: (_c = socket.data.user) === null || _c === void 0 ? void 0 : _c.username,
        event: 'enter',
    });
};
exports.joinUserToRoom = joinUserToRoom;
const changeRoom = (socket) => {
    socket.on('changeRoom', (roomname) => (0, exports.joinUserToRoom)(socket, roomname));
};
exports.changeRoom = changeRoom;
const userIsTyping = (socket) => {
    socket.on('typing', () => {
        var _a, _b;
        config_1.log.info(`user: ${(_a = socket.data.user) === null || _a === void 0 ? void 0 : _a.id} is typing`);
        socket.broadcast.emit('typing', { username: (_b = socket.data.user) === null || _b === void 0 ? void 0 : _b.username });
    });
    socket.on('stop typing', () => {
        var _a, _b;
        config_1.log.info(`user: ${(_a = socket.data.user) === null || _a === void 0 ? void 0 : _a.id} stopped typing`);
        socket.broadcast.emit('stop typing', {
            username: (_b = socket.data.user) === null || _b === void 0 ? void 0 : _b.username,
        });
    });
};
exports.userIsTyping = userIsTyping;
const publicMessage = (socket) => {
    socket.on('sendMessageToServer', (msg) => {
        var _a, _b;
        const newMessage = new model_1.Message({
            createdAt: Date.now(),
            from: socket.data.user,
            id: utils_1.generate.id(),
            text: msg.text,
        });
        config_1.log.info(``);
        (_a = socket.data.user) === null || _a === void 0 ? void 0 : _a.newOutgoingMessage(msg);
        (_b = socket.data.user) === null || _b === void 0 ? void 0 : _b.roomHistory[0].newMessage(msg);
        config_1.log.info(`message (id: ${newMessage.id}) was sent`);
        socket.emit('message', newMessage);
    });
};
exports.publicMessage = publicMessage;
const privateMessage = (socket, io) => {
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
exports.privateMessage = privateMessage;
//# sourceMappingURL=handlers.js.map