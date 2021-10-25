"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDisconnect = exports.getCurrentUser = exports.joinUserToChat = void 0;
const colors_1 = __importDefault(require("colors"));
const users = [];
const joinUserToChat = (id, username, roomname) => {
    const user = { id, username, roomname };
    users.push(user);
    return user;
};
exports.joinUserToChat = joinUserToChat;
// tslint:disable-next-line:no-console
console.log(colors_1.default.magenta("user out"), users);
const getCurrentUser = (id) => users.find((user) => user.id === id);
exports.getCurrentUser = getCurrentUser;
// called when the user leaves the chat and its user object deleted from array
const userDisconnect = (id) => {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex !== -1)
        return users.splice(userIndex, 1)[0];
};
exports.userDisconnect = userDisconnect;
//# sourceMappingURL=dummyuser.js.map