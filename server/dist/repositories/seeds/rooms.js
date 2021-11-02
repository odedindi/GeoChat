"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomsDict = exports.roomsnames = void 0;
const model_1 = require("../model");
const roomsnames = {
    publicRoom: 'publicRoom',
};
exports.roomsnames = roomsnames;
const publicRoom = new model_1.Room({
    roomname: 'publicRoom'
});
const roomsDict = {
    publicRoom,
};
exports.roomsDict = roomsDict;
//# sourceMappingURL=rooms.js.map