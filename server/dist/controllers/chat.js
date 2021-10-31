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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDisconnected = exports.removeUserFromRoom = exports.removeUserFromActiveUsersList = exports.removeUserFromUsersList = exports.addUserToRoomAndActiveUsersList = exports.addUserToRoom = exports.addUserToActiveUsersList = exports.addUserToUsersList = exports.get = void 0;
const chat = __importStar(require("../chat"));
const log = __importStar(require("../logger"));
const lodash_1 = __importDefault(require("lodash"));
exports.get = {
    roomIndex: (roomname) => lodash_1.default.findIndex(chat.rooms, (room) => room.roomname === roomname),
    userIndex: (id) => lodash_1.default.findIndex(chat.users, (user) => user.id === id),
    activeUserIndex: (id) => lodash_1.default.findIndex(chat.activeUsers, (user) => user.id === id),
    userIndexInRoom: (id, roomname) => {
        const roomIndex = exports.get.roomIndex(roomname);
        return lodash_1.default.findIndex(chat.rooms[roomIndex].users, (user) => user.id === id);
    },
};
// users list
const updateUserDetailsInUsersList = (user, userIndex) => {
    log.info('update user in users list');
    chat.users[userIndex] = user;
};
const addUserToUsersList = (user) => {
    const userIndex = exports.get.userIndex(user.id);
    if (userIndex === -1) {
        log.info(`new user: ${user.id}, add user to users list`);
        chat.users.push(user);
    }
    else {
        log.info('update user in users list');
        updateUserDetailsInUsersList(user, userIndex);
    }
};
exports.addUserToUsersList = addUserToUsersList;
// activeUsers list
const updateUserDetailsInActiveUsersList = (user, userIndex) => {
    log.info('update user in activeUsers list');
    chat.activeUsers[userIndex] = user;
};
const addUserToActiveUsersList = (user) => {
    const userIndex = exports.get.userIndex(user.id);
    if (userIndex === -1) {
        log.info(`new user: ${user.id}, add user to activeUsers list`);
        chat.activeUsers.push(user);
    }
    else {
        log.info('update user in activeUsers list');
        updateUserDetailsInActiveUsersList(user, userIndex);
    }
};
exports.addUserToActiveUsersList = addUserToActiveUsersList;
// rooms list
const addUserToRoom = (user, roomname) => {
    const roomIndex = exports.get.roomIndex(roomname);
    if (roomIndex === -1) {
        log.info(`add user: ${user.id} to new room: ${roomname}`);
        chat.rooms.push({ roomname, users: [user], messages: [] });
    }
    else {
        const userIndexInRoom = exports.get.userIndexInRoom(user.id, roomname);
        if (userIndexInRoom === -1) {
            log.info(`user: ${user.id} is already in roomname: ${roomname}`);
        }
        else {
            log.info(`add user: ${user.id} to roomname: ${roomname}`);
            chat.rooms[roomIndex].users.push(user);
        }
    }
};
exports.addUserToRoom = addUserToRoom;
const addUserToRoomAndActiveUsersList = (user, roomname) => {
    log.info(`new addUserToRoom request`);
    const updatedUser = Object.assign(Object.assign({}, user), { currentRoomname: roomname });
    (0, exports.addUserToRoom)(updatedUser, roomname);
    (0, exports.addUserToActiveUsersList)(updatedUser);
    return updatedUser;
};
exports.addUserToRoomAndActiveUsersList = addUserToRoomAndActiveUsersList;
const removeUserFromUsersList = (id) => {
    const userIndex = exports.get.userIndex(id);
    if (userIndex !== -1) {
        log.info(`removing user: ${id} from users list`);
        return chat.users.splice(userIndex, 1)[0];
    }
};
exports.removeUserFromUsersList = removeUserFromUsersList;
const removeUserFromActiveUsersList = (id) => {
    const userIndex = exports.get.userIndex(id);
    if (userIndex !== -1) {
        log.info(`removing user: ${id} from users list`);
        return chat.activeUsers.splice(userIndex, 1)[0];
    }
};
exports.removeUserFromActiveUsersList = removeUserFromActiveUsersList;
const removeUserFromRoom = (id, roomname) => {
    const userIndex = exports.get.userIndexInRoom(id, roomname);
    if (userIndex !== -1) {
        const roomIndex = exports.get.roomIndex(roomname);
        log.info(`removing user: ${id} from roomname: ${roomname}`);
        return chat.rooms[roomIndex].users.splice(userIndex, 1)[0];
    }
};
exports.removeUserFromRoom = removeUserFromRoom;
const userDisconnected = ({ id, currentRoomname }) => {
    (0, exports.removeUserFromRoom)(id, currentRoomname);
    (0, exports.removeUserFromUsersList)(id);
};
exports.userDisconnected = userDisconnected;
//# sourceMappingURL=chat.js.map