"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomAvatar = exports.randomString = exports.randomNumberFrom1ToNumber = exports.randomId = void 0;
const randomId = () => Math.random().toString(36);
exports.randomId = randomId;
const randomNumberFrom1ToNumber = (num) => Math.floor(Math.random() * num) + 1;
exports.randomNumberFrom1ToNumber = randomNumberFrom1ToNumber;
const randomString = () => {
    let result;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let index = 0; index < (0, exports.randomNumberFrom1ToNumber)(100); index++) {
        result += characters.charAt((0, exports.randomNumberFrom1ToNumber)(characters.length));
    }
    return result;
};
exports.randomString = randomString;
const randomAvatar = () => `https://robohash.org/${(0, exports.randomString)()}`;
exports.randomAvatar = randomAvatar;
//# sourceMappingURL=generators.js.map