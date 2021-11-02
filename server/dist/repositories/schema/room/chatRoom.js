"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ChatRoom {
    constructor(roomname) {
        this.users = [];
        this.chatUsers = [];
        this.messages = [];
        this.getRoomname = () => this.roomname;
        this.getUsers = () => this.users;
        this.getUser = (socketId) => this.users.find((user) => user.id === socketId);
        this.getNumOfUsers = () => this.users.length;
        this.getAllessages = () => this.messages;
        this.getMessage = (messageId) => this.messages.find((message) => message.id === messageId);
        this.roomname = roomname;
    }
}
exports.default = ChatRoom;
//# sourceMappingURL=chatRoom.js.map