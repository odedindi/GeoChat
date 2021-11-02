import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';
import express from 'express';
import * as chat from './chat';

dotenv.config();

const app = express();
app.use(cors());
app.use(compression())
app.get('/', (_req, res) => res.status(201).json({ message: 'OK' }));

app.get('/getRooms', (_req, res) => res.status(200).json({ data: chat.rooms }));

export default app;
