import { Client } from 'pg';

const dbConfig = {
	user: 'pg',
	host: 'localhost',
	database: 'geochatapi',
	password: 'password',
	port: 5432,
};

const dbClient = new Client(dbConfig);

export default dbClient;
