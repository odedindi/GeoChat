import { Pool } from 'pg';

const createPool = () =>
	new Pool({
		user: 'pg',
		host: 'localhost',
		database: 'geochatapi',
		password: 'password',
		port: 5432,
		max: 20,
		idleTimeoutMillis: 30000,
		connectionTimeoutMillis: 2000,
	});

const db = createPool();
export default db;
