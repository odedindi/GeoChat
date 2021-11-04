import { User } from './User';
import _ from 'lodash';

export class Room {
	private _model: IRoom;

	numUsers: number;
	numMessages: number;

	users: IUser[];
	messages: IMessage[];

	constructor(roomModel: IRoom, users?: IUser[], messages?: IMessage[]) {
		this._model = roomModel;
		this.numUsers = users ? users.length : 0;
		this.users = users ? users : ([] as IUser[]);
		this.messages = messages ? messages : ([] as IMessage[]);
	}

	get roomname(): string {
		return this._model.roomname;
	}

	get numberOfUsers(): number {
		return this.numUsers;
	}

	findUserIndex = (userId: UserID) =>
		_.findIndex(this.users, (user) => user.id === userId);


	newUser(user: User) {
		if (this.findUserIndex(user.id) === -1) {
			this.users.push(user);
			this.numUsers++;
		}
	}

	findUser(userId: UserID) {
		const userIndex = this.findUserIndex(userId);
		if (userIndex !== -1) return this.users[userIndex];
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

	newMessage(message: IMessage) {
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
