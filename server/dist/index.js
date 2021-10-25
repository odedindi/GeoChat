"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const users_1 = require("./users");
const socket_io_1 = require("socket.io");
const api_1 = __importDefault(require("./router/api"));
dotenv_1.default.config();
const server = (0, express_1.default)();
server.use((0, cors_1.default)());
const httpServer = (0, http_1.createServer)(server);
const PORT = process.env.SERVER_PORT;
const socketOptions = {
    cors: { origin: '*', methods: ['GET', 'POST'] },
};
const io = new socket_io_1.Server(httpServer, socketOptions);
const userRouter = express_1.default.Router();
userRouter.get('/', (_req, res) => res.json('OK'));
server.use('/api', api_1.default);
// initializing the socket io connection
io.on('connection', (socket) => {
    socket.on('joinRoom', ({ username, roomname }) => {
        const user = (0, users_1.joinUserToChat)(socket.id, username, roomname);
        console.log('JoinRoom, id: ', socket.id);
        socket.join(user.roomname);
        // display welcome message to the user
        socket.emit('message', {
            userId: user.id,
            username: user.username,
            text: `Welcome ${user.username}`,
        });
        // displays joined room message to all other users except that particular user
        socket.broadcast.to(user.roomname).emit('message', {
            userId: user.id,
            username: user.username,
            text: `${user.username} has joined the chat`,
        });
    });
    // user sending message
    socket.on('chat', (text) => {
        const user = (0, users_1.getCurrentUser)(socket.id);
        io.to(user.roomname).emit('message', {
            userId: user.id,
            username: user.username,
            text,
        });
    });
    socket.on('disconnect', () => {
        const user = (0, users_1.userDisconnect)(socket.id);
        if (user) {
            io.to(user.roomname).emit('message', {
                userId: user.id,
                username: user.username,
                text: `${user.username} has left the chat`,
            });
        }
    });
});
server.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(colors_1.default.green(`server started at http://localhost:${PORT}`));
});
//# sourceMappingURL=index.js.map