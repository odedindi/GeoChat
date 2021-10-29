"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomsnames = exports.rooms = exports.users = exports.activeUsers = void 0;
const users_1 = require("./users");
Object.defineProperty(exports, "activeUsers", { enumerable: true, get: function () { return users_1.activeUsers; } });
Object.defineProperty(exports, "users", { enumerable: true, get: function () { return users_1.users; } });
const rooms_1 = require("./rooms");
Object.defineProperty(exports, "rooms", { enumerable: true, get: function () { return rooms_1.rooms; } });
Object.defineProperty(exports, "roomsnames", { enumerable: true, get: function () { return rooms_1.roomsnames; } });
//# sourceMappingURL=index.js.map