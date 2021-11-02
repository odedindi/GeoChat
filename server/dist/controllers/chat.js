"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDisconnected = exports.removeUserFromRoom = exports.removeUserFromUsersList = exports.addUserToRoom = exports.addUserToUsersList = exports.get = void 0;
const seeds_1 = require("../repositories/seeds");
const config_1 = require("../config");
const lodash_1 = __importDefault(require("lodash"));
const model_1 = require("../repositories/model");
exports.get = {
    userIndex: (id) => lodash_1.default.findIndex(seeds_1.chat.users, (user) => user.id === id),
    userIndexInRoom: (id, roomname) => {
        return lodash_1.default.findIndex(seeds_1.chat.roomsDict[roomname].users, (user) => user.id === id);
    },
};
// users list
const updateUserDetailsInUsersList = (user, userIndex) => {
    config_1.log.info(`update user: ${user.id} in users list`);
    seeds_1.chat.users[userIndex] = user;
};
const addUserToUsersList = (user) => {
    const userIndex = exports.get.userIndex(user.id);
    if (userIndex === -1) {
        config_1.log.info(`new user: ${user.id}, add user to users list`);
        seeds_1.chat.users.push(user);
    }
    else {
        config_1.log.info(`update user: ${user.id} in users list`);
        updateUserDetailsInUsersList(user, userIndex);
    }
};
exports.addUserToUsersList = addUserToUsersList;
// rooms
const addUserToRoom = (user, roomname) => {
    config_1.log.info(`new addUserToRoom request, by user: : ${user.id} to room: ${roomname}`);
    const updatedUser = Object.assign({}, user);
    updatedUser.roomHistory.unshift(roomname);
    if (!lodash_1.default.findKey(seeds_1.chat.roomsDict[roomname])) {
        config_1.log.info(`add user: ${updatedUser.id} to new room: ${roomname}`);
        const newRoom = new model_1.Room({
            roomname,
            users: [updatedUser],
            messages: [],
        });
        seeds_1.chat.roomsDict[roomname] = newRoom;
    }
    else {
        const userIndexInRoom = exports.get.userIndexInRoom(updatedUser.id, roomname);
        if (userIndexInRoom !== -1)
            return;
        config_1.log.info(`add user: ${updatedUser.id} to roomname: ${roomname}`);
        seeds_1.chat.roomsDict[roomname].users.push(updatedUser);
    }
    return updatedUser;
};
exports.addUserToRoom = addUserToRoom;
const removeUserFromUsersList = (id) => {
    const userIndex = exports.get.userIndex(id);
    if (userIndex !== -1) {
        config_1.log.info(`removing user: ${id} from users list`);
        return seeds_1.chat.users.splice(userIndex, 1)[0];
    }
};
exports.removeUserFromUsersList = removeUserFromUsersList;
const removeUserFromRoom = (id, roomname) => {
    const userIndex = exports.get.userIndexInRoom(id, roomname);
    if (userIndex !== -1) {
        config_1.log.info(`removing user: ${id} from roomname: ${roomname}`);
        return seeds_1.chat.roomsDict[roomname].users.splice(userIndex, 1)[0];
    }
};
exports.removeUserFromRoom = removeUserFromRoom;
const userDisconnected = ({ id, roomHistory }) => {
    (0, exports.removeUserFromRoom)(id, roomHistory[0]);
    (0, exports.removeUserFromUsersList)(id);
};
exports.userDisconnected = userDisconnected;
//# sourceMappingURL=chat.js.map