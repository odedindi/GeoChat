const users = new Map<string, User>();

export class InMemoryUserRepository implements UserRepository {
	addUser = (user: User) => users.set(user.socketID, user);
	updateUser = (user: User) => users.set(user.socketID, user);
	removeUser = (socketID: ID) => users.delete(socketID);
	getAllUsers = () => {
		const usersList: User[] = [];
		users.forEach((user) => usersList.push(user));
		return Promise.resolve(usersList);
	};
	getUserBySocketID = (socketID: ID) => {
		const user = users.get(socketID);
		return Promise.resolve([user]);
	};
	getUsersByRoom = (room: string) => {
		const roomUsers: User[] = [];
		users.forEach((user) => {
			if (user.room === room) roomUsers.push(user);
		});
		return Promise.resolve(roomUsers);
	};
	getUserByUserID = (userID: ID) => {
		let match: User;
		users.forEach((user) => {
			if (user.userID === userID) match = user;
		});
		return Promise.resolve([match]);
	};
}
