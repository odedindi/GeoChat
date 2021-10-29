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
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const socketio = __importStar(require("socket.io"));
const log = __importStar(require("./logger"));
const socket_1 = __importDefault(require("./controllers/socket"));
dotenv_1.default.config();
const PORT = process.env.SERVER_PORT;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.get('/', (_req, res) => res.json('OK'));
const server = http.createServer(app);
const io = new socketio.Server(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] },
});
// initializing the socket io connection
io.on('connection', (socket) => {
    log.info(`new socket connected! socket id: ${socket.id})`);
    (0, socket_1.default)(socket);
});
server.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    log.info(`server started at http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map