"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var common_1 = require("@nestjs/common");
var logger_1 = require("../config/logger");
var constants_1 = require("../config/constants");
var formatMessage_1 = require("../utils/formatMessage");
var ChatController = /** @class */ (function () {
    function ChatController(messageRepository, userRepository) {
        var _this = this;
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
        this.initConnection = function (socket) {
            socket.on('join', function (_a) {
                var user = _a.user, room = _a.room;
                return _this.joinRoom(socket, user, room);
            });
            // Listen for chatMessage
            socket.on('chatMessage', function (_a) {
                var content = _a.content, coord = _a.coord;
                return _this.handleChatMessage(socket, content, coord);
            });
            socket.on('disconnect', function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, this.handleDisconnection(socket)];
            }); }); });
            // ====> older stuff
            socket.on('getMessages', function () { return _this.getMessages(socket); });
            socket.on('connect_error', function (error) {
                return logger_1["default"].error("connect_error: ".concat(error.message));
            });
        };
        this.userJoin = function (socketID, user, room) { return __awaiter(_this, void 0, void 0, function () {
            var updatedUser, userID, match;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        updatedUser = __assign(__assign({}, user), { socketID: socketID, room: room });
                        userID = updatedUser.userID;
                        logger_1["default"].info('check if user is already in users table if not create it');
                        return [4 /*yield*/, this.userRepository.getUser({ userID: userID })];
                    case 1:
                        match = _a.sent();
                        if (!match)
                            this.userRepository.addUser(updatedUser);
                        return [2 /*return*/, updatedUser];
                }
            });
        }); };
        this.getCurrentUser = function (socketID) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.userRepository.getUser({ socketID: socketID })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); };
        // TODO: modify join room ============>
        // migrate from rooms to only geolocations
        this.getRoomUsers = function (room) {
            return _this.userRepository.getAllUsers({ where: { room: room } });
        };
        this.joinRoom = function (socket, user, room) { return __awaiter(_this, void 0, void 0, function () {
            var joinedUser, users, messages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userJoin(socket.id, user, room)];
                    case 1:
                        joinedUser = _a.sent();
                        socket.join(joinedUser.room);
                        this.userRepository.updateUser({
                            data: joinedUser,
                            where: { userID: joinedUser.userID }
                        });
                        logger_1["default"].info("updated user: ".concat(joinedUser.userID, " room: ").concat(room, " details in pgDB"));
                        logger_1["default"].info("Welcome ".concat(joinedUser.socketID));
                        socket.emit('message', (0, formatMessage_1["default"])(constants_1.botName, 'Welcome Back!'));
                        logger_1["default"].info("Broadcast to ".concat(joinedUser.room, " that ").concat(joinedUser.socketID, " connected"));
                        socket.broadcast
                            .to(joinedUser.room)
                            .emit('message', (0, formatMessage_1["default"])(constants_1.botName, "".concat(joinedUser.username, " has joined the chat")));
                        return [4 /*yield*/, this.getRoomUsers(joinedUser.room)];
                    case 2:
                        users = _a.sent();
                        logger_1["default"].info("Send room users (total of ".concat(users.length, ") and to room: ").concat(room, " "));
                        socket.broadcast.to(joinedUser.room).emit('roomUsers', {
                            room: joinedUser.room,
                            users: users
                        });
                        logger_1["default"].info("Send old messages");
                        return [4 /*yield*/, this.messageRepository.getMessagesWithinRange(user.geolocation_lat, user.geolocation_lng, user.preferedDistance)];
                    case 3:
                        messages = _a.sent();
                        messages.forEach(function (message) { return socket.emit('message', message); });
                        return [2 /*return*/];
                }
            });
        }); };
        // TODO: modify join room <===================
        this.handleChatMessage = function (socket, content, coord) { return __awaiter(_this, void 0, void 0, function () {
            var user, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCurrentUser(socket.id)];
                    case 1:
                        user = _a.sent();
                        message = (0, formatMessage_1["default"])(user[0].username, content, coord);
                        this.messageRepository.addMessage(message);
                        socket.emit('message', message);
                        return [2 /*return*/];
                }
            });
        }); };
        this.handleDisconnection = function (socket) { return __awaiter(_this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCurrentUser(socket.id)];
                    case 1:
                        user = _a.sent();
                        if (user[0]) {
                            logger_1["default"].info("Broadcast to ".concat(user[0].room, " that ").concat(user[0].socketID, " disconnected"));
                            socket.broadcast
                                .to(user[0].room)
                                .emit('message', (0, formatMessage_1["default"])(constants_1.botName, "".concat(user[0].username, " has left the chat")));
                            socket.broadcast.to(user[0].room).emit('roomUsers', {
                                room: user[0].room,
                                users: this.getRoomUsers(user[0].room)
                            });
                            logger_1["default"].info("".concat(user[0].socketID, " left the chat"));
                            // this.userRepository.updateUser({ ...user[0], room: '', socketID: '' });
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        this.getMessages = function (socket) { return __awaiter(_this, void 0, void 0, function () {
            var user, _a, lat, lng, radius, messages;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getCurrentUser(socket.id)];
                    case 1:
                        user = _b.sent();
                        if (!user[0]) return [3 /*break*/, 3];
                        logger_1["default"].info("user: ".concat(user[0].userID, " found"));
                        _a = user[0], lat = _a.geolocation_lat, lng = _a.geolocation_lng, radius = _a.preferedDistance;
                        return [4 /*yield*/, this.messageRepository.getMessagesWithinRange(lat, lng, radius)];
                    case 2:
                        messages = _b.sent();
                        messages.forEach(function (message) { return socket.emit('message', message); });
                        return [3 /*break*/, 4];
                    case 3:
                        logger_1["default"].error("User with socketID: ".concat(socket.id, " was not found "));
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    }
    ChatController = __decorate([
        (0, common_1.Controller)()
    ], ChatController);
    return ChatController;
}());
exports["default"] = ChatController;
