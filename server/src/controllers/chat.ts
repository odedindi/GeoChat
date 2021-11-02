import { chat } from '../repositories/seeds';
import { log } from '../config';
import _ from 'lodash';
import { Room } from '../repositories/model';

export const get = {
	userIndex: (id: string) => _.findIndex(chat.users, (user) => user.id === id),
	userIndexInRoom: (id: string, roomname: string) => {
		return _.findIndex(
			chat.roomsDict[roomname as keyof typeof chat.roomsDict].users,
			(user) => user.id === id,
		);
	},
};

// users list
const updateUserDetailsInUsersList = (user: IUser, userIndex: number) => {
	log.info(`update user: ${user.id} in users list`);
	chat.users[userIndex] = user;
};

export const addUserToUsersList = (user: IUser) => {
	const userIndex = get.userIndex(user.id);
	if (userIndex === -1) {
		log.info(`new user: ${user.id}, add user to users list`);
		chat.users.push(user);
	} else {
		log.info(`update user: ${user.id} in users list`);
		updateUserDetailsInUsersList(user, userIndex);
	}
};

// rooms
export const addUserToRoom = (user: IUser, roomname: string) => {
	log.info(
		`new addUserToRoom request, by user: : ${user.id} to room: ${roomname}`,
	);
	const updatedUser: IUser = { ...user };
	updatedUser.roomHistory.unshift(roomname);

	if (!_.findKey(chat.roomsDict[roomname as keyof typeof chat.roomsDict])) {
		log.info(`add user: ${updatedUser.id} to new room: ${roomname}`);
		const newRoom = new Room({
			roomname,
			users: [updatedUser],
			messages: [],
		});
		chat.roomsDict[roomname as keyof typeof chat.roomsDict] = newRoom;
	} else {
		const userIndexInRoom = get.userIndexInRoom(updatedUser.id, roomname);
		if (userIndexInRoom !== -1) return;

		log.info(`add user: ${updatedUser.id} to roomname: ${roomname}`);
		chat.roomsDict[roomname as keyof typeof chat.roomsDict].users.push(
			updatedUser,
		);
	}
	return updatedUser;
};

export const removeUserFromUsersList = (id: string) => {
	const userIndex = get.userIndex(id);
	if (userIndex !== -1) {
		log.info(`removing user: ${id} from users list`);
		return chat.users.splice(userIndex, 1)[0];
	}
};

export const removeUserFromRoom = (id: string, roomname: string) => {
	const userIndex = get.userIndexInRoom(id, roomname);
	if (userIndex !== -1) {
		log.info(`removing user: ${id} from roomname: ${roomname}`);
		return chat.roomsDict[roomname as keyof typeof chat.roomsDict].users.splice(
			userIndex,
			1,
		)[0];
	}
};

export const userDisconnected = ({ id, roomHistory }: IUser) => {
	removeUserFromRoom(id, roomHistory[0]);
	removeUserFromUsersList(id);
};
