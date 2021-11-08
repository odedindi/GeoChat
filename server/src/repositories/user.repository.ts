const users = new Map<string, User>();

export interface UserRepository {
	addUser: (socketID: ID, user: User) => void;
	removeUser: (sockerID: ID) => void;
	getAllUsers: () => User[];
	getUserBySocketID: (socketID: ID) => User;
	getUsersByRoom: (room: string) => User[];
	getUserByUserID: (userID: ID) => User;
}

export class InMemoryUserRepository implements UserRepository {
	addUser = (socketID: ID, user: User) => users.set(socketID, user);
	removeUser = (socketID: ID) => users.delete(socketID);
	getAllUsers = () => {
		const usersList: User[] = [];
		users.forEach((user) => usersList.push(user));
		return usersList;
	};
	getUserBySocketID = (socketID: ID) => users.get(socketID);
	getUsersByRoom = (room: string) => {
		const roomUsers: User[] = [];
		users.forEach((user) => {
			if (user.room === room) roomUsers.push(user);
		});
		return roomUsers;
	};
	getUserByUserID = (userID: ID) => {
		let match: User;
		users.forEach((user) => {
			if (user.id === userID) match = user;
		});
		return match;
	};
}
