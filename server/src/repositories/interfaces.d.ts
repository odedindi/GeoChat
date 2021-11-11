interface MessageRepository {
	addMessage: (message: Message) => void;
	getAllMessages: () => Promise<Message[]>;
}

interface UserRepository {
	addUser: (user: User) => void;
	updateUser: (user: User) => void;
	removeUser: (userID: ID) => void;
	getAllUsers: () => Promise<User[]>;
	getUserBySocketID: (socketID: ID) => Promise<User[]>;
	getUsersByRoom: (room: string) => Promise<User[]>;
	getUserByUserID: (userID: ID) => Promise<User[]>;
}
