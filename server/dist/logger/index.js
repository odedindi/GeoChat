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
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.info = exports.logger = void 0;
const W = __importStar(require("winston"));
const { colorize, combine, errors, json, prettyPrint, simple, splat, timestamp, } = W.format;
const errorsLog = new W.transports.File({
    filename: 'logs/errors.log',
    level: 'error',
});
const combinedLog = new W.transports.File({ filename: 'logs/combined.log' });
const consoleLog = new W.transports.Console({
    format: combine(colorize(), simple()),
});
exports.logger = W.createLogger({
    level: 'info',
    format: combine(timestamp({
        format: 'DD-MM-YYYY HH:mm:ss',
    }), errors({ stack: true }), splat(), json(), prettyPrint()),
    defaultMeta: { service: 'GeoChating server logger' },
    transports: [errorsLog, combinedLog, consoleLog],
});
if (process.env.NODE_ENV !== 'production')
    exports.logger.add(consoleLog);
const info = (msg) => exports.logger.log({
    level: 'info',
    message: msg,
});
exports.info = info;
const error = (msg) => exports.logger.log({
    level: 'error',
    message: msg,
});
exports.error = error;
exports.default = exports.logger;
//# sourceMappingURL=index.js.map