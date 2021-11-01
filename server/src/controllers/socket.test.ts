import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import Client from 'socket.io-client';
import { AddressInfo } from 'net';

import * as chatControl from './chat';
import * as chat from '../chat';
import socketController from './socket';

const testUser: User = {
	id: 'fx52kk5',
	name: 'Glenna Reichert',
	username: 'Delphine',
	email: 'Chaim_McDermott@dana.io',
	avatar: '',
	currentRoomname: '',
	geo: {
		coord: {
			lat: '24.6463',
			lng: '-168.8889',
		},
		preferedDistance: 40,
	},
};
const testRoomName = 'testRoom';
const testRooms: Room[] = [
	{
		roomname: testRoomName,
		users: [],
		messages: [],
	},
];
const testMessage = 'This is a test message';

describe('Test Socket Controller ', () => {
	let io: Server, serverSocket: Socket, clientSocket: Socket;

	beforeAll((done) => {
		const httpServer = createServer();
		io = new Server(httpServer);

		httpServer.listen(() => {
			const { port } = httpServer.address() as AddressInfo;
			clientSocket = new (Client as any)(`http://localhost:${port}`);

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

		serverSocket.on('setUserName', (user: User) => {
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
			if (testRooms[0].messages.includes(message)) return;
			else testRooms[0].messages.push(message);

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
