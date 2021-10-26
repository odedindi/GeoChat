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
const colors_1 = __importDefault(require("colors"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
// import { getCurrentUser, userDisconnect, joinUserToChat } from './users';
const socketio = __importStar(require("socket.io"));
// import SocketIoJwt from 'socketio-jwt';
const api_1 = __importDefault(require("./router/api"));
// import * as C from './config/constants';
const API = __importStar(require("./controllers/api"));
const logger_1 = require("./logger");
dotenv_1.default.config();
const PORT = process.env.SERVER_PORT;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.get('/', (_req, res) => res.json('OK'));
app.use('/api', api_1.default);
const server = http.createServer(app);
const io = new socketio.Server(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] },
});
const chatRooms = [
    {
        roomname: 'publicChat',
        users: [
            {
                id: 'sd1q11223',
                name: 'gerry',
                username: 'gerry',
                currentRoomname: '',
                roomHistory: [],
                avatar: 'https://robohash.org/WoVJ0cd',
                geo: {
                    lat: '',
                    lng: '',
                },
            },
        ],
        messages: [
            {
                from: {
                    id: 'sdq123',
                    name: 'bob',
                    username: 'bob',
                    currentRoomname: '',
                    roomHistory: [],
                    avatar: 'https://robohash.org/d0DGHght2Orol2FZ6GB',
                    geo: {
                        lat: '',
                        lng: '',
                    },
                },
                text: 'hey guys',
                createdAt: Date.now(),
                id: API.generateRandomId(),
            },
            {
                from: {
                    id: 'sd1q11223',
                    name: 'gerry',
                    username: 'gerry',
                    currentRoomname: '',
                    roomHistory: [],
                    avatar: 'https://robohash.org/WoVJ0cd',
                    geo: {
                        lat: '',
                        lng: '',
                    },
                },
                text: 'hey bob',
                createdAt: Date.now(),
                id: API.generateRandomId(),
            },
        ],
    },
];
// initializing the socket io connection
io.on('connection', (socket) => {
    (0, logger_1.logInfo)('new socket connected!');
    socket.on('setUsername', (user) => {
        const newUser = {
            id: socket.id,
            name: user.name,
            username: user.username,
            currentRoomname: 'publicChat',
            roomHistory: user.roomHistory ? user.roomHistory : [],
            avatar: user.avatar ? user.avatar : API.generateRandomAvatar(),
            geo: user.geo
                ? user.geo
                : {
                    lat: '',
                    lng: '',
                },
        };
        chatRooms[0].users.push(newUser);
        socket.data.user = newUser;
        io.emit('userChange', { user: socket.data.user, event: 'enter' });
        socket.join(newUser.currentRoomname);
        (0, logger_1.logInfo)('user connected and joined to the public chat');
    });
    socket.on('sendMessage', (msg) => {
        console.log(socket.data);
        const message = {
            text: msg.text,
            from: socket.data.user,
            createdAt: Date.now(),
            id: API.generateRandomId(),
        };
        (0, logger_1.logInfo)(`message was sent, messageId: ${message.id}`);
        io.emit('message', message);
    });
    socket.on('disconnect', () => {
        (0, logger_1.logInfo)('user disconnected');
        io.emit('userChange', { user: socket.data.user, event: 'exit' });
    });
    // socket.on('joinGeneralChatRoom', ({ username }: User) => {
    // 	const user = joinUserToChat(socket.id, username, 'generalChatRoom');
    // 	console.log('JoinRoom, id: ', socket.id);
    // 	socket.join(user.roomname);
    // 	// display welcome message to the user
    // 	socket.emit('message', {
    // 		userId: user.id,
    // 		username: user.username,
    // 		text: `Welcome ${user.username}`,
    // 	});
    // 	// displays joined room message to all other users except that particular user
    // 	socket.broadcast.to(user.roomname).emit('message', {
    // 		userId: user.id,
    // 		username: user.username,
    // 		text: `${user.username} has joined the chat`,
    // 	});
    // });
    // socket.on('joinRoom', ({ username, roomname }: User) => {
    // 	const user = joinUserToChat(socket.id, username, roomname);
    // 	console.log('JoinRoom, id: ', socket.id);
    // 	socket.join(user.roomname);
    // 	// display welcome message to the user
    // 	socket.emit('message', {
    // 		userId: user.id,
    // 		username: user.username,
    // 		text: `Welcome ${user.username}`,
    // 	});
    // 	// displays joined room message to all other users except that particular user
    // 	socket.broadcast.to(user.roomname).emit('message', {
    // 		userId: user.id,
    // 		username: user.username,
    // 		text: `${user.username} has joined the chat`,
    // 	});
    // });
    // // user sending message
    // socket.on('chat', (text: string) => {
    // 	const user = getCurrentUser(socket.id);
    // 	io.to(user.roomname).emit('message', {
    // 		userId: user.id,
    // 		username: user.username,
    // 		text,
    // 	});
    // });
    // socket.on('disconnect', () => {
    // 	const user: User | undefined = userDisconnect(socket.id);
    // 	if (user) {
    // 		io.to(user.roomname).emit('message', {
    // 			userId: user.id,
    // 			username: user.username,
    // 			text: `${user.username} has left the chat`,
    // 		});
    // 	}
    // });
});
server.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(colors_1.default.green(`server started at http://localhost:${PORT}`));
});
//# sourceMappingURL=index.js.map