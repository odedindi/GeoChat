import _ from 'lodash';

export class ChatApp {
	private _model: IChatApp;

	numUsers: number;
	numRooms: number;

	constructor(chatAppModel: IChatApp) {
		this._model = chatAppModel;
		this.numUsers = 0;
		this.numRooms = 0;
	}

	get users(): IUser[] {
		return this._model.users;
	}
	get rooms(): IRoom[] {
		return this._model.rooms;
	}

	findRoomIndex = (roomname: string) =>
		_.findIndex(this._model.rooms, roomname);

	newRoom = (room: IRoom) => {
		const roomIndex = this.findRoomIndex(room.roomname);
		if (roomIndex === -1) {
			this._model.rooms.push(room);
			this.numRooms++;
		}
	};

	getRoom = (roomname: string) => {
		const roomIndex = this.findRoomIndex(roomname);
		if (roomIndex !== -1) return this._model.rooms[roomIndex];
	};

	removeRoom = (roomname: string) => {
		const roomIndex = this.findRoomIndex(roomname);
		if (roomIndex !== -1) {
			this._model.rooms.splice(roomIndex, 1);
			this.numRooms--;
		}
	};

	findUserIndex = (userId: UserID) => _.findIndex(this._model.users, userId);

	newUser = (user: IUser) => {
		const userIndex = this.findUserIndex(user.id);
		if (userIndex === -1) {
			this._model.users.push(user);
			this.numUsers++;
		}
	};

	getUser = (userId: UserID) => {
		const userIndex = this.findUserIndex(userId);
		if (userIndex !== -1) return this._model.users[userIndex];
	};

	removeUser = (userId: UserID) => {
		const userIndex = this.findUserIndex(userId);
		if (userIndex !== -1) {
			this._model.users.splice(userIndex, 1);
			this.numUsers--;
		}
	};
}
