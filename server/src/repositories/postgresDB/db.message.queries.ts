import { Pool } from 'pg';
import db from 'src/config/db.config';
import log from 'src/config/logger';

export class DBMessageRepository implements MessageRepository {
	db: Pool;

	constructor() {
		this.db = db;
	}
	addMessage = async ({ messageid, fromuser, content, createdat }: Message) => {
		const query = {
			text: 'INSERT INTO messages(messageid, fromuser, content, createdat) VALUES($1, $2, $3, $4)',
			values: [messageid, fromuser, content, createdat],
		};
		await this.db.query(query);
		log.info(`Message: ${messageid} added to messages table`);
	};
	getAllMessages = async () => {
		const query = {
			text: 'SELECT * FROM messages ORDER BY id ASC',
		};
		const { rows } = await this.db.query(query);
		log.info(`results of getAllMessages: ${JSON.stringify(rows)}`);
		return rows as Message[];
	};
}
