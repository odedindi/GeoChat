// type StrOrNum = string | number;

// type LeafletGeometryElement = { id: number; latlngs: Coord[] };

type Coord = {
	lat: number;
	lng: number;
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
interface MessageDTO {
	id?: number;
	messageID: string;
	fromuser: string;
	content: string;
	createdat: string;
	geolocation_lat: number;
	geolocation_lng: number;
}
