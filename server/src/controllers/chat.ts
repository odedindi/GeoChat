import * as chat from '../chat';
import * as log from '../logger';
import _ from 'lodash';

export const get = {
	roomIndex: (roomname: string) =>
		_.findIndex(chat.rooms, (room) => room.roomname === roomname),

	userIndex: (id: string) => _.findIndex(chat.users, (user) => user.id === id),
	activeUserIndex: (id: string) =>
		_.findIndex(chat.activeUsers, (user) => user.id === id),
	userIndexInRoom: (id: string, roomname: string) => {
		const roomIndex = get.roomIndex(roomname);
		return _.findIndex(chat.rooms[roomIndex].users, (userID) => userID === id);
	},
};

// users list
const updateUserDetailsInUsersList = (user: User, userIndex: number) => {
	log.info('update user in users list');
	chat.users[userIndex] = user;
};

export const addUserToUsersList = (user: User): void => {
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

export const addUserToActiveUsersList = (user: User): void => {
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
export const addUserToRoom = (userID: UserID, roomname: string): void => {
	const roomIndex = get.roomIndex(roomname);
	if (roomIndex === -1) {
		log.info(`add user: ${userID} to new room: ${roomname}`);
		chat.rooms.push({ roomname, users: [userID], messages: [] });
	} else {
		const userIndexInRoom = get.userIndexInRoom(userID, roomname);
		if (userIndexInRoom === -1) {
			log.info(`user: ${userID} is already in roomname: ${roomname}`);
		} else {
			log.info(`add user: ${userID} to roomname: ${roomname}`);
			chat.rooms[roomIndex].users.push(userID);
		}
	}
};
export const addUserToRoomAndActiveUsersList = (
	user: User,
	roomname: string,
): User => {
	log.info(`new addUserToRoom request`);
	const updatedUser: User = { ...user, currentRoomname: roomname };
	addUserToRoom(updatedUser.id, roomname);
	addUserToActiveUsersList(updatedUser);
	return updatedUser;
};

export const removeUserFromUsersList = (id: string): User => {
	const userIndex = get.userIndex(id);
	if (userIndex !== -1) {
		log.info(`removing user: ${id} from users list`);
		return chat.users.splice(userIndex, 1)[0];
	}
};
export const removeUserFromActiveUsersList = (id: string): User => {
	const userIndex = get.userIndex(id);
	if (userIndex !== -1) {
		log.info(`removing user: ${id} from users list`);
		return chat.activeUsers.splice(userIndex, 1)[0];
	}
};
export const removeUserFromRoom = (id: string, roomname: string): UserID => {
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
