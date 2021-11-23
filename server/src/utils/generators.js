"use strict";
exports.__esModule = true;
exports.generate = void 0;
var uuid_1 = require("uuid");
var id = function () { return (0, uuid_1.v4)(); };
var randomNumberFrom1ToNumber = function (num) {
    return Math.floor(Math.random() * num) + 1;
};
var randomString = function () {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var index = 0; index < randomNumberFrom1ToNumber(100); index++) {
        result += characters.charAt(randomNumberFrom1ToNumber(characters.length));
    }
    return result;
};
var avatar = function () { return "https://robohash.org/".concat(randomString()); };
exports.generate = { id: id, randomNumberFrom1ToNumber: randomNumberFrom1ToNumber, randomString: randomString, avatar: avatar };
