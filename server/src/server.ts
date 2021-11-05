import * as http from 'http';
import app from './app';
import * as socketio from 'socket.io';
import log from './config/logger';

const PORT = process.env.SERVER_PORT;

const httpServer = http.createServer(app);
export const io = new socketio.Server(httpServer, {
	cors: { origin: '*', methods: ['GET', 'POST'] },
});

httpServer.listen(PORT, () => {
	log.info(`Server is running at http://localhost:${PORT}`);
});
