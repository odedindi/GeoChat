import { createServer } from 'http';
import { AddressInfo } from 'net';
import * as socketio from 'socket.io';
import Client, { Socket } from 'socket.io-client';

describe('GetCat app tests', () => {
	let io: socketio.Server;
	let serverSocket: socketio.Socket;
	let clientSocket: Socket;

	beforeAll((done) => {
		const httpServer = createServer();
		io = new socketio.Server(httpServer);
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
		clientSocket.close();
	});

	test('once connected, socket should be defined', (done) => {
		serverSocket.on('connection', (socket) => {
			expect(socket).toBeDefined();
		});
		done();
	});

	test('emit Hello World should work', (done) => {
		clientSocket.on('hello', (arg) => {
			expect(arg).toBe('world');
			done();
		});
		serverSocket.emit('hello', 'world');
	});
});
