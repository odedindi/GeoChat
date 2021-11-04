import * as chat from '../seed';
import * as log from '../config/logger';
import _ from 'lodash';
import { UserRepository, userRepository } from 'src/repositories/user.repository';

export class ChatService {
	constructor(private readonly userRepository: UserRepository) {
		
	}
}

export const get = {
	roomIndex: (roomname: string) =>
		_.findIndex(chat.rooms, (room) => room.roomname === roomname),

	userIndex: (id: string) => _.findIndex(chat.users, (user) => user.id === id),
	activeUserIndex: (id: string) =>
		_.findIndex(chat.activeUsers, (user) => user.id === id),
	userIndexInRoom: (id: string, roomname: string) => {
		const roomIndex = get.roomIndex(roomname);
		return _.findIndex(chat.rooms[roomIndex].users, (user) => user.id === id);
	},
};

// users list
const updateUserDetailsInUsersList = (user: User, userIndex: number) => {
	log.info('update user in users list');
	chat.users[userIndex] = user;
};

export const addUserToUsersList = (user: User) => {
	userRepository.addUser(user)
	const userIndex = get.userIndex(user.id);
	if (userIndex === -1) {
		log.info(`new user: ${user.id}, add user to users list`);
		chat.users.push(user);
	} else {
		log.info('update user in users list');
		updateUserDetailsInUsersList(user, userIndex);
	}
};

// activeUsers list
const updateUserDetailsInActiveUsersList = (user: User, userIndex: number) => {
	log.info('update user in activeUsers list');
	chat.activeUsers[userIndex] = user;
};

export const addUserToActiveUsersList = (user: User) => {
	const userIndex = get.userIndex(user.id);
	if (userIndex === -1) {
		log.info(`new user: ${user.id}, add user to activeUsers list`);
		chat.activeUsers.push(user);
	} else {
		log.info('update user in activeUsers list');
		updateUserDetailsInActiveUsersList(user, userIndex);
	}
};

// rooms list
export const addUserToRoom = (user: User, roomname: string) => {
	const roomIndex = get.roomIndex(roomname);
	if (roomIndex === -1) {
		log.info(`add user: ${user.id} to new room: ${roomname}`);
		chat.rooms.push({ roomname, users: [user], messages: [] });
	} else {
		const userIndexInRoom = get.userIndexInRoom(user.id, roomname);
		if (userIndexInRoom === -1) {
			log.info(`user: ${user.id} is already in roomname: ${roomname}`);
		} else {
			log.info(`add user: ${user.id} to roomname: ${roomname}`);
			chat.rooms[roomIndex].users.push(user);
		}
	}
};
export const addUserToRoomAndActiveUsersList = (
	user: User,
	roomname: string,
) => {
	log.info(`new addUserToRoom request`);
	const updatedUser: User = { ...user, currentRoomname: roomname };
	addUserToRoom(updatedUser, roomname);
	addUserToActiveUsersList(updatedUser);
	return updatedUser;
};

export const removeUserFromUsersList = (id: string) => {
	const userIndex = get.userIndex(id);
	if (userIndex !== -1) {
		log.info(`removing user: ${id} from users list`);
		return chat.users.splice(userIndex, 1)[0];
	}
};
export const removeUserFromActiveUsersList = (id: string) => {
	const userIndex = get.userIndex(id);
	if (userIndex !== -1) {
		log.info(`removing user: ${id} from users list`);
		return chat.activeUsers.splice(userIndex, 1)[0];
	}
};
export const removeUserFromRoom = (id: string, roomname: string) => {
	const userIndex = get.userIndexInRoom(id, roomname);
	if (userIndex !== -1) {
		const roomIndex = get.roomIndex(roomname);
		log.info(`removing user: ${id} from roomname: ${roomname}`);
		return chat.rooms[roomIndex].users.splice(userIndex, 1)[0];
	}
};

export const userDisconnected = ({ id, currentRoomname }: User) => {
	removeUserFromRoom(id, currentRoomname);
	removeUserFromUsersList(id);
};
