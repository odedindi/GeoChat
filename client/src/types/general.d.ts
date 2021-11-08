type StrOrNum = string | number;

type ID = string;

type GeoCoord = {
	lat: StrOrNum;
	lng: StrOrNum;
};

type UserGeoData = { coord: GeoCoord; preferedDistance: number };

type User = {
	avatar: string;
	id: ID;
	socketID: ID;
	username: string;
	room: string;
	geo: UserGeoData;
};

type Message = {
	id: ID;
	from: User | string;
	to?: User;
	text: string;
	createdAt: number;
};

type Room = {
	messages?: Message[];
	roomname: string;
	users?: User[];
};

type LeafletGeometryElement = { id: number; latlngs: GeoCoord[] };
