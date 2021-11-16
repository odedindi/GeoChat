interface MessageRepository {
	addMessage: (message: MessageDTO) => void;
	getAllMessages: () => Promise<MessageDTO[]>;
}

interface UserRepository {
	addUser: (user: UserDTO) => Promise<UserDTO>;
	updateUser: (user: UserDTO) => Promise<UserDTO>;
	removeUser: (userID: string) => Promise<UserDTO>;
	getAllUsers: () => Promise<UserDTO[]>;
	getUserBySocketID: (socketID: string) => Promise<UserDTO[]>;
	getUsersByRoom: (room: string) => Promise<UserDTO[]>;
	getUserByUserID: (userID: string) => Promise<UserDTO[]>;
}
