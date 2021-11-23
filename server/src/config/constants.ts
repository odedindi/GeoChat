import { normalizePort } from '../utils/normalizePort';

export const PORT = normalizePort(process.env.SERVER_PORT) || 4000;
export const HOST = process.env.SERVER_HOST || 'localhost';
export const database = {
  host: process.env.DATABASE_HOST,
  port: normalizePort(process.env.DATABASE_PORT) || 5432,
};

export const botName = 'ChatBot';
