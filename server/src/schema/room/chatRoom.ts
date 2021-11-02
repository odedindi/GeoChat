import ChatUser from "../user/chatUser";

class ChatRoom {
	roomname;
	users: User[] = [];
	chatUsers: ChatUser[] = [];
	messages: Message[] = [];

	constructor(roomname: string) {
		this.roomname = roomname;
	}

	getRoomname = () => this.roomname;
	getUsers = () => this.users;
	getUser = (socketId: string) =>
		this.users.find((user) => user.id === socketId);
	getNumOfUsers = () => this.users.length;
	getAllessages = () => this.messages;
	getMessage = (messageId: string) =>
		this.messages.find((message) => message.id === messageId);
}

export default ChatRoom;
