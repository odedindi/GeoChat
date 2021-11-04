interface IMessage {
	createdAt: number;
	from: IUser;
	id: string;
	text: string;
}

interface IUser {
	avatar: string;
	geo: UserGeoData;
	id: UserID;
	roomHistory: string[];
	username: string;
}

interface IRoom {
	roomname: string;
	users?: IUser[];
	messages?: IMessage[];

}

interface IChatApp {
	users: IUser[];
	rooms: IRoom[];
}
