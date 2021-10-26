type ChatUser = {
	avatar?: string;
	currentRoomname?: string;
	email?: string;
	geo?: {
		lat: string | number;
		lng: string | number;
	};
	id: string;
	name?: string;
	roomHistory?: string[];
	username?: string;
};
type Msg = {
	createdAt: number;
	from: ChatUser;
	id: string;
	text: string;
};
