import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import * as http from 'http';
import * as socketio from 'socket.io';
import * as log from './logger';
import socketController from './controllers/socket';

dotenv.config();
const PORT = process.env.SERVER_PORT;

const app = express();
app.use(cors());

app.get('/', (_req, res) => res.json('OK'));

const server = http.createServer(app);
const io = new socketio.Server(server, {
	cors: { origin: '*', methods: ['GET', 'POST'] },
});

// initializing the socket io connection
io.on('connection', (socket: socketio.Socket) => {
	log.info(`new socket connected! socket id: ${socket.id})`);
	socketController(socket);
});

server.listen(PORT, () => {
	// tslint:disable-next-line:no-console
	log.info(`server started at http://localhost:${PORT}`);
});
