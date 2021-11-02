"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomResolver = void 0;
const services_1 = require("src/services");
exports.roomResolver = {
    Query: {
        rooms: () => services_1.rooms,
    },
};
//# sourceMappingURL=room.resolver.js.map