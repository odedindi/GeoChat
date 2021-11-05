type StrOrNum = string | number;

type ID = string;

type SocketID = ID;
type UserID = ID;
type MessageID = ID;

type GeoCoord = {
	lat: StrOrNum;
	lng: StrOrNum;
};

type UserGeoData = { coord?: GeoCoord; preferedDistance: number };

type User = {
	id: UserID;
	username: string;
	avatar: string;
	geo: UserGeoData;
	connected: boolean;
	messages: Message[];
};

type Message = {
	id: MessageID;
	from: User;
	to?: User;
	text: string;
	createdAt: number;
};

type Room = {
	messages: Message[];
	roomname: string;
	users: User[];
};

type LeafletGeometryElement = { id: number; latlngs: GeoCoord[] };
