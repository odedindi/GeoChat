type UserID = string;

type User = {
	avatar?: string;
	currentRoomname?: string;
	email?: string;
	geo?: {
		lat: string | number;
		lng: string | number;
	};
	id: UserID;
	name?: string;
	roomHistory?: string[];
	username?: string;
};

type Message = {
	createdAt: number;
	from: User;
	id: string;
	text: string;
};

type Room = {
	roomname: string;
	users: UserID[];
	messages: Message[];
};
