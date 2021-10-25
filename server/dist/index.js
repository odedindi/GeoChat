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
const http_1 = require("http");
const dummyuser_1 = require("./dummyuser");
const socket_io_1 = require("socket.io");
const API = __importStar(require("./controllers/api"));
dotenv_1.default.config();
const server = (0, express_1.default)();
server.use((0, cors_1.default)());
const httpServer = (0, http_1.createServer)(server);
const PORT = process.env.SERVER_PORT;
const socketOptions = {
    cors: { origin: "*", methods: ["GET", "POST"] },
};
const io = new socket_io_1.Server(httpServer, socketOptions);
server.post("/api/generate-token", (req, res) => {
    const body = JSON.parse(req.body);
    console.log("/api/generate-token req.body: ", body);
    if (!body.name) {
        return res.send({ status: false });
    }
    else {
        const user = {
            id: API.generateRandomId(),
            name: body.name,
            username: body.username ? body.username : body.name,
            roomname: "",
            avatar: API.generateRandomAvatar(),
        };
        return res.send({ status: true, jwt: API.createToken(user) });
    }
});
// initializing the socket io connection
io.on("connection", (socket) => {
    socket.on("joinRoom", ({ username, roomname }) => {
        const user = (0, dummyuser_1.joinUserToChat)(socket.id, username, roomname);
        console.log("JoinRoom, id: ", socket.id);
        socket.join(user.roomname);
        // display welcome message to the user
        socket.emit("message", {
            userId: user.id,
            username: user.username,
            text: `Welcome ${user.username}`,
        });
        // displays joined room message to all other users except that particular user
        socket.broadcast.to(user.roomname).emit("message", {
            userId: user.id,
            username: user.username,
            text: `${user.username} has joined the chat`,
        });
    });
    // user sending message
    socket.on("chat", (text) => {
        const user = (0, dummyuser_1.getCurrentUser)(socket.id);
        io.to(user.roomname).emit("message", {
            userId: user.id,
            username: user.username,
            text,
        });
    });
    socket.on("disconnect", () => {
        const user = (0, dummyuser_1.userDisconnect)(socket.id);
        if (user) {
            io.to(user.roomname).emit("message", {
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