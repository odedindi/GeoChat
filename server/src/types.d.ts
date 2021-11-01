type UserID = string;

type GeoCoord = {
	lat: string | number;
	lng: string | number;
};

type User = {
	avatar?: string;
	currentRoomname?: string;
	email?: string;
	geo: { coord?: GeoCoord; preferedDistance: number };

	id: UserID;
	name: string;
	roomHistory?: string[];
	username: string;
};

type Message = {
	createdAt: number;
	from: User;
	id: string;
	text: string;
};

type Room = {
	roomname: string;
	users: User[];
	messages: Message[];
};
