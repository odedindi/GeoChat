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
exports.generateRandomAvatar = exports.generateRandomString = exports.generateRandomNumberFrom1ToNumber = exports.generateRandomId = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const C = __importStar(require("../config/constants"));
const createToken = (user) => jsonwebtoken_1.default.sign(user, C.secret);
exports.createToken = createToken;
const generateRandomId = () => Math.random().toString(24).substring(7);
exports.generateRandomId = generateRandomId;
const generateRandomNumberFrom1ToNumber = (num) => Math.floor(Math.random() * num) + 1;
exports.generateRandomNumberFrom1ToNumber = generateRandomNumberFrom1ToNumber;
const generateRandomString = () => {
    let result;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let index = 0; index < (0, exports.generateRandomNumberFrom1ToNumber)(100); index++) {
        result += characters.charAt((0, exports.generateRandomNumberFrom1ToNumber)(characters.length));
    }
    return result;
};
exports.generateRandomString = generateRandomString;
const generateRandomAvatar = () => `https://robohash.org/${(0, exports.generateRandomString)()}`;
exports.generateRandomAvatar = generateRandomAvatar;
//# sourceMappingURL=api.js.map