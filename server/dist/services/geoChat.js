"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("@src/repositories/model");
const constants_1 = require("@src/config/constants");
const seed_1 = __importDefault(require("@src/repositories/seed"));
const publicRoom = new model_1.Room({
    roomname: constants_1.publicRoomName,
    users: [],
    messages: [],
});
for (const user of seed_1.default.users)
    publicRoom.newUser(user);
const geoChat = new model_1.ChatApp({
    users: [],
    rooms: [],
});
geoChat.newRoom(publicRoom);
exports.default = geoChat;
//# sourceMappingURL=geoChat.js.map