type Coord = {
	lat: number;
	lng: number;
};

type UserGeoData = { coord: Coord; preferedDistance: number };

type User = {
	avatar: string;
	userID: string;
	socketID: string;
	username: string;
	room: string;
	geo: UserGeoData;
};

type Message = {
	id: number;
	messageID: string;
	fromuser: string;
	content: string;
	createdat: string;
	geolocation_lat: number;
	geolocation_lng: number;
};

interface UserDTO {
	id?: number;
	avatar: string;
	userID: string;
	socketID: string;
	username: string;
	room: string;
	preferedDistance: number;
	geolocation_lat: number;
	geolocation_lng: number;
}

interface MentionableUser {
	id: string; // userID
	display: string; // username
}

interface MentionedUser {
	userID: string;
	username: string;
}
interface MessageFromUser {
	mentions: MentionedUser[];
	content: string;
	coord: Coord;
}
interface MessageDTO {
	id?: number;
	messageID: string;
	fromuser: string;
	content: string;
	createdat: string;
	geolocation_lat: number;
	geolocation_lng: number;
}
