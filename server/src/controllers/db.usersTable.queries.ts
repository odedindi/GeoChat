import express from 'express';
import dbClient from 'src/config/db.config';
import log from 'src/config/logger';

const dbQueryErr = (fnName: string, err: Error) => {
	log.error(`db queries ${fnName} error: ${err}`);
	throw err;
};

export const addUser = async (req: express.Request, res: express.Response) => {
	const { avatar, socketID, username, room } = req.body;
	await dbClient.connect();
	dbClient.query(
		'INSERT INTO users (username, avatar, socketid, room) VALUES ($1, $2, $3, $4)',
		[username, avatar, socketID, room],
		(error, results: any) => {
			if (error) dbQueryErr('addUser', error);
			res.status(201).send(`User added with ID: ${results.insertId}`);
			dbClient.end();
		},
	);
};

export const updateUser = async (
	req: express.Request,
	res: express.Response,
) => {
	const id = parseInt(req.params.id, 10);
	const { avatar, socketID, username, room } = req.body;
	await dbClient.connect();
	dbClient.query(
		'UPDATE users SET username = $2, avatar = $3, socketid = $4, room=$5, WHERE id = $1',
		[id, username, avatar, socketID, room],
		(error, _results) => {
			if (error) dbQueryErr('updateUser', error);
			res.status(200).send(`User modified with ID: ${id}`);
			dbClient.end();
		},
	);
};

export const removeUser = async (
	req: express.Request,
	res: express.Response,
) => {
	const id = parseInt(req.params.id, 10);
	await dbClient.connect();
	dbClient.query('DELETE FROM users WHERE id = $1', [id], (error, _results) => {
		if (error) dbQueryErr('removeUser', error);
		res.status(200).send(`User deleted with ID: ${id}`);
		dbClient.end();
	});
};

export const getAllUsers = async (
	_req: express.Request,
	res: express.Response,
) => {
	await dbClient.connect();
	dbClient.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
		if (error) dbQueryErr('getAllUsers', error);
		res.status(200).json(results.rows);
		dbClient.end();
	});
};

export const getUserBySocketId = async (
	req: express.Request,
	res: express.Response,
) => {
	const { socketID } = req.body;
	await dbClient.connect();
	dbClient.query(
		'SELECT * FROM users WHERE socketid = $1',
		[socketID],
		(error, results) => {
			if (error) dbQueryErr('getUserBySocketID', error);
			res.status(200).json(results.rows);
			dbClient.end();
		},
	);
};

export const getUserByRoom = async (
	req: express.Request,
	res: express.Response,
) => {
	const { room } = req.body;
	await dbClient.connect();
	dbClient.query(
		'SELECT * FROM users WHERE room = $1',
		[room],
		(error, results) => {
			if (error) dbQueryErr('getUserByRoom', error);
			res.status(200).json(results.rows);
			dbClient.end();
		},
	);
};

export const getUserById = async (
	req: express.Request,
	res: express.Response,
) => {
	const id = parseInt(req.params.id, 10);
	await dbClient.connect();
	dbClient.query(
		'SELECT * FROM users WHERE id = $1',
		[id],
		(error, results) => {
			if (error) dbQueryErr('getUserById', error);
			res.status(200).json(results.rows);
			dbClient.end();
		},
	);
};
