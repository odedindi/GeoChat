export class User {
	private _model: IUser;

	constructor(userModel: IUser) {
		this._model = userModel;
	}

	get avatar(): string {
		return this._model.avatar;
	}

	get email(): string {
		return this._model.email;
	}
	get geo(): UserGeoData {
		return this._model.geo;
	}
	get id(): UserID {
		return this._model.id;
	}
	get name(): string {
		return this._model.name;
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
	newGeoLocation(geoLocation: GeoCoord) {
		this._model.geo.coord = geoLocation;
	}
	newPreferedDistance(distance: number) {
		this._model.geo.preferedDistance = distance;
	}
	newRoom(newRoomname: string) {
		if (this._model.roomHistory[0] !== newRoomname)
			this._model.roomHistory.unshift(newRoomname);
	}
}

Object.seal(User);
