const users = new Map<string, UserDTO>();

export class InMemoryUserRepository {
	public addUser = async (user: UserDTO) => users.set(user.socketID, user);
	public updateUser = (user: UserDTO) => users.set(user.socketID, user);
	public removeUser = (socketID: string) => users.delete(socketID);
	public getAllUsers = () => {
		const usersList: UserDTO[] = [];
		users.forEach((user) => usersList.push(user));
		return Promise.resolve(usersList);
	};
	public getUserBySocketID = (socketID: string) => {
		const user = users.get(socketID);
		return Promise.resolve([user]);
	};
	public getUsersByRoom = (room: string) => {
		const roomUsers: UserDTO[] = [];
		users.forEach((user) => {
			if (user.room === room) roomUsers.push(user);
		});
		return Promise.resolve(roomUsers);
	};
	public getUserByUserID = (userID: string) => {
		const match: UserDTO[] = [];
		users.forEach((user) => {
			if (user.userID === userID) match.push(user);
		});
		return Promise.resolve(match);
	};
}
