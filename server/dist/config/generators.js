"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.avatar = exports.randomString = exports.randomNumberFrom1ToNumber = exports.id = void 0;
const id = () => Math.random().toString(36);
exports.id = id;
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
const avatar = () => `https://robohash.org/${(0, exports.randomString)()}`;
exports.avatar = avatar;
//# sourceMappingURL=generators.js.map