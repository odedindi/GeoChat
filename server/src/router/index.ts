import express from 'express';
import moment from 'moment';
import log from 'src/config/logger';
import * as db from '../controllers/db.usersTable.queries';
import { routes } from './routes';
const router = express.Router();

// Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
	log.info(`Router: ${req.method}, ${req.originalUrl}`);
	next();
});

router.get(routes.home, (_req, res) => res.status(201).json({ message: 'OK' }));
// router.get(routes.users, db.getAllUsers);
router.route(routes.users).get(db.getAllUsers).post(db.addUser);
router
	.route(routes.usersID)
	.get(db.getUserById)
	.put(db.updateUser)
	.delete(db.removeUser);
router.route(routes.usersSocketID).get(db.getUserBySocketId);
router.route(routes.usersRoom).get(db.getUserByRoom);

export default router;
