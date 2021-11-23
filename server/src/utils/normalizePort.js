"use strict";
exports.__esModule = true;
exports.normalizePort = void 0;
var normalizePort = function (val) {
    var PORT = parseInt(val, 10);
    if (Number.isNaN(PORT))
        return val;
    if (PORT >= 0)
        return PORT;
    return false;
};
exports.normalizePort = normalizePort;
