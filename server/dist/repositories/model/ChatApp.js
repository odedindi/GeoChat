"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatApp = void 0;
const lodash_1 = __importDefault(require("lodash"));
class ChatApp {
    constructor(chatAppModel) {
        this.findRoomIndex = (roomname) => lodash_1.default.findIndex(this._model.rooms, roomname);
        this.newRoom = (room) => {
            const roomIndex = this.findRoomIndex(room.roomname);
            if (roomIndex === -1) {
                this._model.rooms.push(room);
                this.numRooms++;
            }
        };
        this.getRoom = (roomname) => {
            const roomIndex = this.findRoomIndex(roomname);
            if (roomIndex !== -1)
                return this._model.rooms[roomIndex];
        };
        this.removeRoom = (roomname) => {
            const roomIndex = this.findRoomIndex(roomname);
            if (roomIndex !== -1) {
                this._model.rooms.splice(roomIndex, 1);
                this.numRooms--;
            }
        };
        this.findUserIndex = (userId) => lodash_1.default.findIndex(this._model.users, userId);
        this.newUser = (user) => {
            const userIndex = this.findUserIndex(user.id);
            if (userIndex === -1) {
                this._model.users.push(user);
                this.numUsers++;
            }
        };
        this.getUser = (userId) => {
            const userIndex = this.findUserIndex(userId);
            if (userIndex !== -1)
                return this._model.users[userIndex];
        };
        this.removeUser = (userId) => {
            const userIndex = this.findUserIndex(userId);
            if (userIndex !== -1) {
                this._model.users.splice(userIndex, 1);
                this.numUsers--;
            }
        };
        this._model = chatAppModel;
        this.numUsers = 0;
        this.numRooms = 0;
    }
    get users() {
        return this._model.users;
    }
    get rooms() {
        return this._model.rooms;
    }
}
exports.ChatApp = ChatApp;
//# sourceMappingURL=ChatApp.js.map