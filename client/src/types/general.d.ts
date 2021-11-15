type StrOrNum = string | number;

type ID = string;

type GeoCoord = {
	lat: StrOrNum;
	lng: StrOrNum;
};

type UserGeoData = { coord: GeoCoord; preferedDistance: number };

type User = {
	avatar: string;
	userID: ID;
	socketID: ID;
	username: string;
	room: string;
	geo: UserGeoData;
};

type Message = {
	id: number;
	messageID: ID;
	fromuser: string;
	content: string;
	createdat: number;
};

type Room = {
	messages?: Message[];
	roomname: string;
	users?: User[];
};

type LeafletGeometryElement = { id: number; latlngs: GeoCoord[] };
