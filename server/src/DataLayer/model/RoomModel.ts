class RoomModel {
	private _chatRoomModel: IRoomModel;

	constructor(chatRoomModel: IRoomModel) {
		this._chatRoomModel = chatRoomModel;
	}

	get roomname(): string {
		return this._chatRoomModel.roomname;
	}
	get users(): IUserModel[] {
		return this._chatRoomModel.users;
	}
	get numberOfUsers(): number {
		return this._chatRoomModel.users.length;
	}
	get messages(): IMessageModel[] {
		return this._chatRoomModel.messages;
	}
}

Object.seal(RoomModel);
