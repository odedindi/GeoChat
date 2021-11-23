"use strict";
exports.__esModule = true;
exports.messageRepository = exports.userRepository = void 0;
var user_repository_1 = require("./user.repository");
var message_repository_1 = require("./message.repository");
var userRepository = new user_repository_1.PrismaUserRepository();
exports.userRepository = userRepository;
var messageRepository = new message_repository_1.PrismaMessageRepository();
exports.messageRepository = messageRepository;
