import 'module-alias/register';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();

app.use(cors());
app.use(compression());

app.get('/', (_req, res) => res.status(201).json({ message: 'OK' }));

export default app;
