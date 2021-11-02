export class UserModel {
	private _chatUserModel: IUserModel;

	constructor(chatUserModel: IUserModel) {
		this._chatUserModel = chatUserModel;
	}

	get avatar(): string {
		return this._chatUserModel.avatar;
	}
	get currentRoomname(): string {
		return this._chatUserModel.currentRoomname;
	}
	get email(): string {
		return this._chatUserModel.email;
	}
	get geo(): UserGeoData {
		return this._chatUserModel.geo;
	}
	get id(): UserID {
		return this._chatUserModel.id;
	}
	get socketId(): SocketID {
		return this._chatUserModel.socketId;
	}
	get name(): string {
		return this._chatUserModel.name;
	}
	get roomHistroy(): string[] {
		return this._chatUserModel.roomHistory;
	}
	get username(): string {
		return this._chatUserModel.username;
	}
}

Object.seal(UserModel);
