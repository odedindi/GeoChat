type StrOrNum = string | number;

type GeoCoord = {
	lat: StrOrNum;
	lng: StrOrNum;
};

type UserGeoData = { coord: GeoCoord; preferedDistance: number };

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
	geolocation_lat: string;
	geolocation_lng: string;
};

type Room = {
	messages?: Message[];
	roomname: string;
	users?: User[];
};

type LeafletGeometryElement = { id: number; latlngs: GeoCoord[] };

interface UserDTO {
	id?: number;
	avatar: string;
	userID: string;
	socketID: string;
	username: string;
	room: string;
	preferedDistance: number;
}
interface MessageDTO {
	id?: number;
	messageID: string;
	fromuser: string;
	content: string;
	createdat: string;
}
