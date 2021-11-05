import _ from 'lodash';
import log from 'src/config/logger';

export const users: User[] = [];

export interface UserRepository {
	findIndexById: (id: UserID) => number;
	findIndexByUsername: (username: string) => number;
	addOrUpdateUser: (user: User) => void;
	newGeoLocation: (id: UserID, geoLocation: GeoCoord) => void;
	newPreferedDistance: (id: UserID, distance: number) => void;
	newMessage: (message: Message) => void;
	getAllUsers: () => User[];
}

export class InMemoryUserRepository implements UserRepository {
	findIndexById = (id: UserID) => _.findIndex(users, (user) => id === user.id);
	findIndexByUsername = (username: string) =>
		_.findIndex(users, (user) => username === user.username);
	addOrUpdateUser = (user: User) => {
		const match = this.findIndexById(user.id);
		if (match === -1) {
			log.info(`new user: ${user.id}`);
			users.push(user);
		} else {
			log.info('update user in users list');
			users[match] = user;
		}
	};

	newGeoLocation = (id: UserID, geoLocation: GeoCoord) => {
		const match = this.findIndexById(id);
		if (match === -1) {
			log.error(`newGeoLocation, user: ${id} not found`);
		} else {
			log.info(`update user: ${id} geoLocation`);
			users[match].geo.coord = geoLocation;
		}
	};

	newPreferedDistance = (id: UserID, distance: number) => {
		const match = this.findIndexById(id);
		if (match === -1) {
			log.error(`newPreferedDistance, user: ${id} not found`);
		} else {
			log.info(`update user: ${id} preferedDistance`);
			users[match].geo.preferedDistance = distance;
		}
	};

	newMessage = (message: Message) => {
		const userID = message.from.id;
		const match = this.findIndexById(userID);
		if (match === -1) {
			log.error(`newMessage, user: ${userID} not found`);
		} else {
			if (users[match].messages.includes(message)) {
				log.error(`message: ${message.id} already exist`);
			} else {
				log.info(`newMessage, message: ${message.id}, from: ${userID}`);
				users[match].messages.push(message);
			}
		}
	};

	getAllUsers = () => users;
	getUser = ({ id, username }: { id?: UserID; username?: string }) => {
		const match = id
			? this.findIndexById(id)
			: this.findIndexByUsername(username);
		return users[match];
	};
}
