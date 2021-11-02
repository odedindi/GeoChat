"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const lodash_1 = __importDefault(require("lodash"));
class Room {
    constructor(roomModel) {
        // get messages(): Message[] {
        // 	return this._model.messages;
        // }
        this.findUserIndex = (id) => {
            return lodash_1.default.findIndex(this.users, (user) => user.id === id);
        };
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
        this.numUsers = 0;
    }
    get roomname() {
        return this._model.roomname;
    }
    // get users(): User[] {
    // 	return this._model.users;
    // }
    get numberOfUsers() {
        return this.numUsers;
    }
    set newUser(user) {
        if (this.findUserIndex(user.id) === -1) {
            this.users.push(user);
            this.numUsers++;
        }
    }
    set newMessage(message) {
        if (this.findMessageIndex(message.id) === -1) {
            this.messages.push(message);
            this.numMessages++;
        }
    }
}
exports.Room = Room;
Object.seal(Room);
//# sourceMappingURL=Room.js.map