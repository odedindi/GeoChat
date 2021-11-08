import express from 'express';
import dbClient from 'src/config/db.config';
import log from 'src/config/logger';

const dbQueryErr = (fnName: string, err: Error) => {
	log.error(`db queries ${fnName} error: ${err}`);
	throw err;
};

// getAllMessages

export const addMessage = async (
	req: express.Request,
	res: express.Response,
) => {
	const { from, text, createdAt } = req.body;
	await dbClient.connect();
	dbClient.query(
		'INSERT INTO messages (from, text, createdAt) VALUES ($1, $2, $3)',
		[from, text, createdAt],
		(error, results: any) => {
			if (error) dbQueryErr('addMessage', error);
			res.status(201).send(`Message added with ID: ${results.insertId}`);
			dbClient.end();
		},
	);
};

export const getAllMessages = async (
	_req: express.Request,
	res: express.Response,
) => {
	await dbClient.connect();
	dbClient.query('SELECT * FROM messages ORDER BY id ASC', (error, results) => {
		if (error) dbQueryErr('getAllMessages', error);
		res.status(200).json(results.rows);
		dbClient.end();
	});
};
