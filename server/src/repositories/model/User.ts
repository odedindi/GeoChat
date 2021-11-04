import _ from 'lodash';
export class User {
	private _model: IUser;

	messagesSent: IMessage[];
	messagesIncoming: IMessage[];

	constructor(userModel: IUser) {
		this._model = userModel;
		this.messagesSent = [] as IMessage[];
		this.messagesIncoming = [] as IMessage[];
	}

	get avatar(): string {
		return this._model.avatar;
	}

	get geo(): UserGeoData {
		return this._model.geo;
	}
	get id(): UserID {
		return this._model.id;
	}
	get roomHistory(): string[] {
		return this._model.roomHistory;
	}
	get username(): string {
		return this._model.username;
	}

	set updateAvatar(avatar: string) {
		this._model.avatar = avatar;
	}
	get allData(): IUser {
		return {
			avatar: this._model.avatar,
			geo: this._model.geo,
			id: this._model.id,
			roomHistory: this._model.roomHistory,
			username: this._model.username,
		};
	}
	newGeoLocation = (geoLocation: GeoCoord) => {
		this._model.geo.coord = geoLocation;
	};
	newPreferedDistance = (distance: number) => {
		this._model.geo.preferedDistance = distance;
	};
	newRoom = (newRoomname: string) => {
		if (this._model.roomHistory[0] !== newRoomname)
			this._model.roomHistory.unshift(newRoomname);
	};

	newOutgoingMessage = (message: IMessage) => {
		if (_.findIndex(this.messagesSent, (msg) => msg.id === message.id) !== -1)
			this.messagesSent.push(message);
	};
	newIncomingMessage = (message: IMessage) => {
		if (
			_.findIndex(this.messagesIncoming, (msg) => msg.id === message.id) !== -1
		)
			this.messagesIncoming.push(message);
	};
}

Object.seal(User);
