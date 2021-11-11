import { Pool } from 'pg';
import db from 'src/config/db.config';
import log from 'src/config/logger';

export class DBUserRepository implements UserRepository {
	db: Pool;
	constructor() {
		this.db = db;
	}
	addUser = async ({
		userID,
		avatar,
		socketID,
		username,
		room,
		geo: { coord, preferedDistance },
	}: User) => {
		const geoLocation = `(${coord.lat}, ${coord.lng})`;
		const query = {
			text: `INSERT INTO users
			(userID, username, avatar, socketid, room, geolocation, prefereddistance)
			VALUES ($1, $2, $3, $4, $5, $6, $7)`,
			values: [
				userID,
				username,
				avatar,
				socketID,
				room,
				geoLocation,
				preferedDistance,
			],
		};
		await this.db.query(query);
		log.info(`User: ${userID} added`);
	};

	updateUser = async ({
		userID,
		avatar,
		socketID,
		username,
		room,
		geo: { coord, preferedDistance },
	}: User) => {
		const geoLocation = `(${coord.lat}, ${coord.lng})`;
		const query = {
			text: 'UPDATE users SET username = $2, avatar = $3, socketid = $4, room=$5, geolocation=$6, prefereddistance=$7 WHERE userid = $1',
			values: [
				userID,
				username,
				avatar,
				socketID,
				room,
				geoLocation,
				preferedDistance,
			],
		};
		await this.db.query(query);
		log.info(`User: ${userID} updated`);
	};

	removeUser = async (userID: ID) => {
		const query = {
			text: 'DELETE FROM users WHERE userid = $1',
			values: [userID],
		};
		await this.db.query(query);
		log.info(`User: ${userID} removed`);
	};

	getAllUsers = async () => {
		const query = {
			text: 'SELECT * FROM users ORDER BY id ASC',
		};
		const { rows } = await this.db.query(query);
		log.info(`getAllUsers, number of users found: ${rows.length} `);
		return rows as User[];
	};

	getUserBySocketID = async (socketID: ID) => {
		const query = {
			text: 'SELECT * FROM users WHERE socketid = $1',
			values: [socketID],
		};
		const { rows } = await this.db.query(query);
		log.info(`getUserBySocketID, number of users found: ${rows.length}`);
		return rows as User[];
	};

	getUsersByRoom = async (room: string) => {
		const query = {
			text: 'SELECT * FROM users WHERE room = $1',
			values: [room],
		};
		const { rows } = await this.db.query(query);
		log.info(
			`getUsersByRoom, room: ${room}, number of users found: ${rows.length}`,
		);
		return rows as User[];
	};

	getUserByUserID = async (userID: ID) => {
		const query = {
			text: 'SELECT * FROM users WHERE userid = $1',
			values: [userID],
		};
		const { rows } = await this.db.query(query);
		log.info(
			`results of getUserByUserID, number of users found: ${rows.length}`,
		);
		return rows as User[];
	};
}

// export const updateUser = async (req: Request, res: Response) => {
// 	const id = parseInt(req.params.id, 10);

// 	pool.query(
// 		'UPDATE users SET username = $2, avatar = $3, socketid = $4, room=$5, geolocation=$6, prefereddistance=$7 WHERE id = $1',
// 		[id, username, avatar, socketID, room, geoLocation, preferedDistance],
// 		(error, _results) => {
// 			if (error) dbQueryErr('updateUser', error);
// 			res.status(200).send(`User modified with ID: ${id}`);
// 		},
// 	);
// };
