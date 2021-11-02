type StrOrNum = string | number;
type SocketID = StrOrNum;
type UserID = string;

type GeoCoord = {
	lat: StrOrNum;
	lng: StrOrNum;
};

type UserGeoData = { coord?: GeoCoord; preferedDistance: number };

// type User = {
// 	avatar?: string;
// 	currentRoomname?: string;
// 	email?: string;
// 	geo: UserGeoData;

// 	id: UserID;
// 	name: string;
// 	roomHistory?: string[];
// 	username: string;
// };

// type Message = {
// 	createdAt: number;
// 	from: User;
// 	id: string;
// 	text: string;
// };

// type Room = {
// 	roomname: string;
// 	users: User[];
// 	messages: Message[];
// };
