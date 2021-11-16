// type StrOrNum = string | number;

// type GeoCoord = {
// 	lat: StrOrNum;
// 	lng: StrOrNum;
// };
// type LeafletGeometryElement = { id: number; latlngs: GeoCoord[] };

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
	geolocation_lat: string;
	geolocation_lng: string;
}
