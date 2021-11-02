"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const socket_io_client_1 = __importDefault(require("socket.io-client"));
const model_1 = require("src/repositories/model");
const testUser = new model_1.User({
    id: 'fx52kk5',
    name: 'Glenna Reichert',
    username: 'Delphine',
    email: 'Chaim_McDermott@dana.io',
    roomHistory: [],
    avatar: '',
    geo: {
        coord: {
            lat: '24.6463',
            lng: '-168.8889',
        },
        preferedDistance: 40,
    },
});
const testRoomName = 'testRoom';
const testRoom = new model_1.Room({
    roomname: testRoomName,
    users: [],
    messages: [],
});
const testRooms = [testRoom];
const testMessage = 'This is a test message';
describe('Test Socket Controller ', () => {
    let io;
    let serverSocket;
    let clientSocket;
    beforeAll((done) => {
        const httpServer = (0, http_1.createServer)();
        io = new socket_io_1.Server(httpServer);
        httpServer.listen(() => {
            const { port } = httpServer.address();
            clientSocket = new socket_io_client_1.default(`http://localhost:${port}`);
            io.on('connection', (socket) => {
                serverSocket = socket;
            });
            clientSocket.on('connect', done);
        });
    });
    afterAll(() => {
        io.close();
        clientSocket.disconnect();
    });
    test('Socket is up and running ', (done) => {
        clientSocket.on('shalom', (arg) => {
            expect(arg).toBe('olam');
            done();
        });
        serverSocket.emit('shalom', 'olam');
    });
    test('Server should recive user details when `setUser` is emitted', (done) => {
        clientSocket.emit('setUserName', testUser);
        serverSocket.on('setUserName', (user) => {
            expect(user).toEqual(testUser);
            done();
        });
    });
    test('Join a user to room', (done) => {
        clientSocket.emit('joinRoom', testRoomName);
        serverSocket.on('joinRoom', (roomname) => {
            expect(roomname).toEqual(testRoomName);
            serverSocket.join(roomname);
            expect(serverSocket.rooms.has(testRoomName)).toBe(true);
            done();
        });
    });
    test('When sendMessageToServer is emited from a client the server should emit `message` and message content in that room', (done) => {
        serverSocket.on('sendMessageToServer', (message) => {
            if (testRooms[0].messages.includes(message))
                return;
            else
                testRooms[0].messages.push(message);
            serverSocket.emit('message', message);
        });
        clientSocket.emit('sendMessageToServer', testMessage);
        clientSocket.on('message', (message) => {
            expect(message).toEqual(testMessage);
            expect(testRooms[0].messages).toHaveLength(1);
            expect(testRooms[0].messages).toContain(message);
            done();
        });
    });
});
//# sourceMappingURL=socket.test.js.map