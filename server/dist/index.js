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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const http = __importStar(require("http"));
const socketio = __importStar(require("socket.io"));
const app_1 = __importDefault(require("@src/app"));
const config_1 = require("@src/config");
const socket_1 = __importDefault(require("@src/controllers/socket"));
const PORT = process.env.SERVER_PORT;
const server = http.createServer(app_1.default);
const io = new socketio.Server(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] },
});
// initializing the socket io connection
// io.use((socket, next) => {
// 	const username = socket.handshake.auth.username;
// 	if (!username) {
// 		log.error(`Socket: ${socket.id} initializing failed, invalid username`);
// 		return next(new Error('invalid username'));
// 	}
// 	socket.data.user.username = username;
// 	next();
// });
io.on('connection', (socket) => {
    config_1.log.info(`new socket connected! socket id: ${socket.id})`);
    (0, socket_1.default)(socket, io);
});
server.listen(PORT, () => {
    config_1.log.info(`Server is running at http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map