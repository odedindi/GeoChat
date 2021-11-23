"use strict";
exports.__esModule = true;
exports.logger = void 0;
var W = require("winston");
var _a = W.format, colorize = _a.colorize, combine = _a.combine, errors = _a.errors, json = _a.json, prettyPrint = _a.prettyPrint, simple = _a.simple, splat = _a.splat, timestamp = _a.timestamp;
var errorsLog = new W.transports.File({
    filename: 'logs/errors.log',
    level: 'error'
});
var combinedLog = new W.transports.File({ filename: 'logs/combined.log' });
var consoleLog = new W.transports.Console({
    format: combine(colorize(), simple())
});
exports.logger = W.createLogger({
    level: 'info',
    format: combine(timestamp({
        format: 'DD-MM-YYYY HH:mm:ss'
    }), errors({ stack: true }), splat(), json(), prettyPrint()),
    defaultMeta: { service: 'GeoChating server logger' },
    transports: [errorsLog, combinedLog]
});
if (process.env.NODE_ENV !== 'production')
    exports.logger.add(consoleLog);
var info = function (msg) {
    return exports.logger.log({
        level: 'info',
        message: msg
    });
};
var error = function (msg) {
    return exports.logger.log({
        level: 'error',
        message: msg
    });
};
var log = { info: info, error: error };
exports["default"] = log;
