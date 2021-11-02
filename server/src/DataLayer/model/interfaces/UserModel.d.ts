interface IUserModel {
	avatar: string;
	currentRoomname: string;
	email: string;
	geo: UserGeoData;
	id: UserID;
	socketId: SocketID;
	name: string;
	roomHistory: string[];
	username: string;
}
