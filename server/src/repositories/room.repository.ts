import _ from 'lodash';
import log from 'src/config/logger';

export const rooms: Room[] = [];

export interface RoomRepository {
	findIndexById: (roomname: string) => number;
	findUserIndexInRoomByUserId: (id: ID, roomUsers: User[]) => number;
	findMessageIndexInRoomByMessageId: (
		id: ID,
		roomMessages: Message[],
	) => number;
	createRoom: (roomname: string) => void;
	joinUserToRoom: (user: User, roomname: string) => void;
	removeUserFromRoom: (id: ID, roomname: string) => void;
	getRoomUsers: (roomname: string) => User[];
	addMessageToRoom: (message: Message, roomname: string) => void;
	getRoomMessages: (roomname: string) => Message[];
}

export class InMemoryRoomRepository implements RoomRepository {
	findIndexById = (roomname: string) =>
		_.findIndex(rooms, (room) => room.roomname === roomname);

	findUserIndexInRoomByUserId = (id: ID, roomUsers: User[]) =>
		_.findIndex(roomUsers, (user) => user.id === id);

	findMessageIndexInRoomByMessageId = (id: ID, roomMessages: Message[]) =>
		_.findIndex(roomMessages, (msg) => msg.id === id);

	createRoom = (roomname: string) => {
		const match = this.findIndexById(roomname);
		if (match === -1) {
			log.info(`new room: ${roomname}`);
			rooms.push({ roomname, users: [], messages: [] });
		} else {
			log.error(`createRoom, room: ${roomname} already exist`);
		}
	};

	joinUserToRoom = (user: User, roomname: string) => {
		const match = this.findIndexById(roomname);
		if (match === -1) {
			log.error(
				`joinUserToRoom, room: ${roomname} that was
                requested by user: ${user.id} not found`,
			);
		} else {
			const userIndex = this.findUserIndexInRoomByUserId(
				user.id,
				rooms[match].users,
			);
			if (userIndex === -1) {
				log.info(`join user: ${user.id} to room: ${roomname}`);
				rooms[match].users.push(user);
			} else
				log.error(
					`joinUserToRoom, user: ${user.id} is already in room: ${roomname}`,
				);
		}
	};
	removeUserFromRoom = (id: ID, roomname: string) => {
		const match = this.findIndexById(roomname);
		if (match === -1) {
			log.error(
				`joinUserToRoom, room: ${roomname} that was
                requested by user: ${id} not found`,
			);
		} else {
			const userIndex = this.findUserIndexInRoomByUserId(
				id,
				rooms[match].users,
			);
			if (userIndex === -1) {
				log.error(`joinUserToRoom, user: ${id} not found in room: ${roomname}`);
			} else {
				log.info(`remove user: ${id} from room: ${roomname}`);
				rooms[match].users.splice(userIndex, 1);
			}
		}
	};
	getRoomUsers = (roomname: string) => {
		const match = this.findIndexById(roomname);
		if (match === -1) {
			log.error(`joinUserToRoom, room: ${roomname} that was not found`);
		} else return rooms[match].users;
	};

	addMessageToRoom = (message: Message, roomname: string) => {
		const match = this.findIndexById(roomname);
		if (match === -1) {
			log.error(
				`joinUserToRoom, room: ${roomname} that was
                requested by user: ${
									typeof message.from === 'string'
										? message.from
										: message.from.id
								} not found`,
			);
		} else {
			const messageIndex = this.findMessageIndexInRoomByMessageId(
				message.id,
				rooms[match].messages,
			);
			if (messageIndex === -1) {
				log.info(`add message: ${message.id} to room: ${roomname}`);
				rooms[match].messages.push(message);
			} else
				log.error(
					`addMessageToRoom, message: ${message.id} is already in room: ${roomname}`,
				);
		}
	};

	getRoomMessages = (roomname: string) => {
		const match = this.findIndexById(roomname);
		if (match === -1) {
			log.error(`joinUserToRoom, room: ${roomname} that was not found`);
		} else return rooms[match].messages;
	};
}
