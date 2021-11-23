"use strict";
exports.__esModule = true;
var uuid_1 = require("uuid");
var formatMessage = function (username, content, coord) {
    if (coord === void 0) { coord = { lat: 0, lng: 0 }; }
    return ({
        messageID: (0, uuid_1.v4)(),
        fromuser: username,
        content: content,
        createdat: Date.now().toString(),
        geolocation_lat: coord.lat,
        geolocation_lng: coord.lng
    });
};
exports["default"] = formatMessage;
