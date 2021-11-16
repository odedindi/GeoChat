import { Pool } from 'pg';
import db from 'src/config/db.config';
import log from 'src/config/logger';

export class DBUserRepository implements UserRepository {
	private db: Pool;
	constructor() {
		this.db = db;
	}
	public addUser = async (user: UserDTO) => {
		const query = {
			text: `INSERT INTO user
			(userID, username, avatar, socketid, room, prefereddistance)
			VALUES ($1, $2, $3, $4, $5, $6)`,
			values: [
				user.userID,
				user.username,
				user.avatar,
				user.socketID,
				user.room,
				user.preferedDistance,
			],
		};
		await this.db.query(query);
		log.info(`User: ${user.userID} added`);
		return Promise.resolve(user);
	};

	public updateUser = async (user: UserDTO) => {
		const query = {
			text: `UPDATE user SET username=$2, avatar=$3, socketid=$4, room=$5, prefereddistance=$6, WHERE userid=$1`,
			values: [
				user.userID,
				user.username,
				user.avatar,
				user.socketID,
				user.room,
				user.preferedDistance,
			],
		};
		await this.db.query(query);
		log.info(`User: ${user.userID} updated`);
		return Promise.resolve(user);
	};

	public removeUser = async (userID: string) => {
		const user = await this.getUserByUserID(userID);
		if (!user[0]) {
			log.error(`no user with userID: ${userID}`);
			throw Error;
		}

		const query = {
			text: 'DELETE FROM user WHERE userid = $1',
			values: [userID],
		};
		await this.db.query(query);
		log.info(`User: ${userID} removed`);
		return Promise.resolve(user[0]);
	};

	public getAllUsers = async () => {
		const query = {
			text: 'SELECT * FROM user ORDER BY id ASC',
		};
		const { rows } = await this.db.query(query);
		log.info(`getAllUsers, number of users found: ${rows.length} `);
		return rows as UserDTO[];
	};

	public getUserBySocketID = async (socketID: string) => {
		const query = {
			text: 'SELECT * FROM user WHERE socketid = $1',
			values: [socketID],
		};
		const { rows } = await this.db.query(query);
		log.info(`getUserBySocketID, number of users found: ${rows.length}`);
		return rows as UserDTO[];
	};

	public getUsersByRoom = async (room: string) => {
		const query = {
			text: 'SELECT * FROM user WHERE room = $1',
			values: [room],
		};
		const { rows } = await this.db.query(query);
		log.info(
			`getUsersByRoom, room: ${room}, number of users found: ${rows.length}`,
		);
		return rows as UserDTO[];
	};

	public getUserByUserID = async (userID: string) => {
		const query = {
			text: 'SELECT * FROM user WHERE userid = $1',
			values: [userID],
		};
		const { rows } = await this.db.query(query);
		log.info(
			`results of getUserByUserID, number of users found: ${rows.length}`,
		);
		return rows as UserDTO[];
	};
}
