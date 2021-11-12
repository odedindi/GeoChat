import { Pool } from 'pg';
import db from 'src/config/db.config';
import log from 'src/config/logger';

export class DBMessageRepository implements MessageRepository {
	db: Pool;

	constructor() {
		this.db = db;
	}
	addMessage = async ({ messageID, fromuser, content, createdat }: Message) => {
		const query = {
			text: 'INSERT INTO message(messageID, fromuser, content, createdat) VALUES($1, $2, $3, $4)',
			values: [messageID, fromuser, content, createdat],
		};
		await this.db.query(query);
		log.info(`Message: ${messageID} added to message table`);
	};
	getAllMessages = async () => {
		const query = {
			text: 'SELECT * FROM message ORDER BY id ASC',
		};
		const { rows } = await this.db.query(query);
		log.info(`results of getAllMessages: ${JSON.stringify(rows)}`);
		return rows as Message[];
	};
}
