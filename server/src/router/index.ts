/**
 * API Routes
 * @url /api/v1/[resource]
 */

// Users
// RequestType   Path                           Action
// ===================================================================
// GET           /users                         getAll
// POST          /users                         create
// GET           /users:id		                getById
// PUT/PATCH     /users:id		                update
// DELETE        /users:id		                destroy
// GET           /users/socketid:id		        getBySocketId
// GET           /users/room:room		        getByRoom

// Messages
// RequestType   Path                           Action
// ===================================================================
// GET           /messages                      getAll
// POST          /messages                      create

import { Router } from 'express';
import log from 'src/config/logger';

import { messageRepository, userRepository } from 'src/repositories';

const router = Router();

router.use(function timeLog(req, _res, next) {
	log.info(`Router: ${req.method}, ${req.originalUrl}`);
	next();
});

router.get('/', (_req, res) => res.status(201).json({ message: 'OK' }));

// users routes
router
	.route('/users')
	.get(async (_req, res) => {
		const users = await userRepository.getAllUsers();
		res.status(200).json(users);
	})
	.post(async (req, res) => {
		await userRepository.addUser(req.body);
		res.status(201).send(`User: ${req.body.userID} added`);
	});
router
	.route('/users:userid')
	.get(async (req, res) => {
		const userID = req.params.userid.substring(1);
		const user = await userRepository.getUserByUserID(userID);
		res.status(200).json(user);
	})
	.put(async (req, res) => {
		userRepository.updateUser(req.body);
		res.status(201).send(`User: ${req.body.userID} updated`);
	})
	.patch(async (req, res) => {
		userRepository.updateUser(req.body);
		res.status(201).send(`User: ${req.body.userID} updated`);
	})
	.delete(async (req, res) => {
		const userID = req.params.userid.substring(1);
		await userRepository.removeUser(userID);
		res.status(200);
	});
router.get('/users/socketid:id', async (req, res) => {
	const socketID = req.params.id.substring(1);
	const user = await userRepository.getUserBySocketID(socketID);
	res.status(200).json(user);
});
router.get('/users/room:room', async (req, res) => {
	const room = req.params.room.substring(1);
	const users = await userRepository.getUsersByRoom(room);
	res.status(200).json(users);
});

// messages routes
router
	.route('/messages')
	.get(async (_req, res) => {
		const messages = await messageRepository.getAllMessages();
		res.status(201).json(messages);
	})
	.post(async (req, res) => {
		await messageRepository.addMessage(req.body);
		res.status(201).send(`Message added with messageID: ${req.body.messageid}`);
	});

export default router;
