import { User } from './User';
import _ from 'lodash';

export class Room {
	private _model: IRoom;

	numUsers: number;
	numMessages: number;

	users: IUser[];
	messages: IMessage[];

	constructor(roomModel: IRoom) {
		this._model = roomModel;
		this.numUsers = 0;
	}

	get roomname(): string {
		return this._model.roomname;
	}
	// get users(): User[] {
	// 	return this._model.users;
	// }
	get numberOfUsers(): number {
		return this.numUsers;
	}
	// get messages(): Message[] {
	// 	return this._model.messages;
	// }

	findUserIndex = (id: string | number) => {
		return _.findIndex(this.users, (user) => user.id === id);
	};

	set newUser(user: User) {
		if (this.findUserIndex(user.id) === -1) {
			this.users.push(user);
			this.numUsers++;
		}
	}

	removeUser = (user: User) => {
		const userIndex = this.findUserIndex(user.id);
		if (userIndex !== -1) {
			this.users.splice(userIndex, 1);
			this.numUsers--;
		}
	};

	findMessageIndex = (id: string | number) => {
		return _.findIndex(this.messages, (msg) => msg.id === id);
	};

	set newMessage(message: IMessage) {
		if (this.findMessageIndex(message.id) === -1) {
			this.messages.push(message);
			this.numMessages++;
		}
	}

	removeMessage = (message: IMessage) => {
		const messageIndex = this.findMessageIndex(message.id);
		if (messageIndex !== -1) {
			this.messages.splice(messageIndex, 1);
			this.numMessages--;
		}
	};
}

Object.seal(Room);
