"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const seeds_1 = require("./repositories/seeds");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, compression_1.default)());
app.get('/', (_req, res) => res.status(201).json({ message: 'OK' }));
app.get('/getRooms', (_req, res) => res.status(200).json({ data: Object.keys(seeds_1.chat.roomsDict) }));
exports.default = app;
//# sourceMappingURL=app.js.map