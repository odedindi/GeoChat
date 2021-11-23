"use strict";
exports.__esModule = true;
exports.botName = exports.database = exports.HOST = exports.PORT = void 0;
var normalizePort_1 = require("../utils/normalizePort");
exports.PORT = (0, normalizePort_1.normalizePort)(process.env.SERVER_PORT) || 4000;
exports.HOST = process.env.SERVER_HOST || 'localhost';
exports.database = {
    host: process.env.DATABASE_HOST,
    port: (0, normalizePort_1.normalizePort)(process.env.DATABASE_PORT) || 5432
};
exports.botName = 'ChatBot';
