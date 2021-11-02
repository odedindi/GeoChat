import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';
import express from 'express';
import { chat } from './repositories/seeds';

dotenv.config();

const app = express();
app.use(cors());
app.use(compression());
app.get('/', (_req, res) => res.status(201).json({ message: 'OK' }));

app.get('/getRooms', (_req, res) =>
	res.status(200).json({ data: Object.keys(chat.roomsDict) }),
);

export default app;
