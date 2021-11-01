type GeoCoord = {
	lat: string | number;
	lng: string | number;
};

type User = {
	avatar?: string;
	currentRoomname?: string;
	email?: string;
	geo: { coord?: GeoCoord; preferedDistance: number };
	id: string;
	name: string;
	roomHistory?: string[];
	username: string;
};

type Msg = {
	createdAt: number;
	from: User;
	id: string;
	text: string;
};

type LeafletGeometryElement = { id: number; latlngs: GeoCoord[] };
