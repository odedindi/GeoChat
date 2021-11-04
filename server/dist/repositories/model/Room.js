"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const lodash_1 = __importDefault(require("lodash"));
class Room {
    constructor(roomModel, users, messages) {
        this.findUserIndex = (userId) => lodash_1.default.findIndex(this.users, (user) => user.id === userId);
        this.removeUser = (user) => {
            const userIndex = this.findUserIndex(user.id);
            if (userIndex !== -1) {
                this.users.splice(userIndex, 1);
                this.numUsers--;
            }
        };
        this.findMessageIndex = (id) => {
            return lodash_1.default.findIndex(this.messages, (msg) => msg.id === id);
        };
        this.removeMessage = (message) => {
            const messageIndex = this.findMessageIndex(message.id);
            if (messageIndex !== -1) {
                this.messages.splice(messageIndex, 1);
                this.numMessages--;
            }
        };
        this._model = roomModel;
        this.numUsers = users ? users.length : 0;
        this.users = users ? users : [];
        this.messages = messages ? messages : [];
    }
    get roomname() {
        return this._model.roomname;
    }
    get numberOfUsers() {
        return this.numUsers;
    }
    newUser(user) {
        if (this.findUserIndex(user.id) === -1) {
            this.users.push(user);
            this.numUsers++;
        }
    }
    findUser(userId) {
        const userIndex = this.findUserIndex(userId);
        if (userIndex !== -1)
            return this.users[userIndex];
    }
    newMessage(message) {
        if (this.findMessageIndex(message.id) === -1) {
            this.messages.push(message);
            this.numMessages++;
        }
    }
}
exports.Room = Room;
Object.seal(Room);
//# sourceMappingURL=Room.js.map