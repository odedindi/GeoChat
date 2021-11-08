import * as http from 'http';
import app from './app';
import * as socketio from 'socket.io';
import log from './config/logger';
import chat from './services/chat';
import { normalizePort } from './utils/nirmalizePort';

const PORT = normalizePort(process.env.SERVER_PORT || 4000);

const httpServer = http.createServer(app);
const io = new socketio.Server(httpServer, {
	cors: { origin: '*', methods: ['GET', 'POST'] },
});

chat(io);
httpServer.listen(PORT, () => {
	log.info(`Server is running at http://localhost:${PORT}`);
});
