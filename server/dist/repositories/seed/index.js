"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../model");
const utils_1 = require("@src/utils");
const bret = new model_1.User({
    id: 'fe51k85',
    username: 'Bret',
    avatar: utils_1.generate.avatar(),
    roomHistory: [],
    geo: {
        coord: {
            lat: '-37.3159',
            lng: '81.1496',
        },
        preferedDistance: 40,
    },
});
const antonette = new model_1.User({
    id: 'fe5dk15',
    username: 'Antonette',
    avatar: utils_1.generate.avatar(),
    roomHistory: [],
    geo: {
        coord: {
            lat: '-43.9509',
            lng: '-34.4618',
        },
        preferedDistance: 40,
    },
});
const samantha = new model_1.User({
    id: 'fe51k2q',
    username: 'Samantha',
    avatar: utils_1.generate.avatar(),
    roomHistory: [],
    geo: {
        coord: {
            lat: '-68.6102',
            lng: '-47.0653',
        },
        preferedDistance: 40,
    },
});
const users = [bret, antonette, samantha];
const seed = { users };
exports.default = seed;
//# sourceMappingURL=index.js.map