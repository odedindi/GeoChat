interface IMessage {
	createdAt: number;
	from: IUser;
	id: string;
	text: string;
}

interface IUser {
	avatar: string;
	email: string;
	geo: UserGeoData;
	id: UserID;
	name: string;
	roomHistory: string[];
	username: string;
}

interface IRoom {
	roomname: string;
	users?: IUser[];
	messages?: IMessage[];
}
