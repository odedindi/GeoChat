import { generate } from '../../config';
import { roomsnames } from '../../services';
class ChatUser {
	avatar: string;
	currentRoomname: string;
	email?: string;
	geo: UserGeoData;
	id: UserID;
	name: string;
	roomsHistory: string[] = [];
	username: string;
	socketId: SocketID;

	constructor(
		name: string,
		socketId: SocketID,
		username: string,
		avatar?: string,
		currentRoomname?: string,
		email?: string,
		geo?: UserGeoData,
	) {
		this.avatar = avatar ? avatar : generate.avatar();
		this.currentRoomname = currentRoomname
			? currentRoomname
			: roomsnames.publicRoom;
		this.email = email ? email : '';
		this.geo = geo ? geo : { preferedDistance: 40 };
		this.id = generate.id();
		this.name = name;
		this.socketId = socketId;
		this.username = username;
	}

	// getters
	getAvatar = () => this.avatar;

	getCurrentRoomname = () => this.currentRoomname;

	getEmail = () => this.email;

	getGeo = () => this.geo;

	getId = () => this.id;

	getName = () => this.name;

	getRoomsHistory = () => this.roomsHistory;

	getUsername = () => this.username;

	getSocketId = () => this.socketId;

	// setters
	setAvatar = (path: string) => (this.avatar = path);

	setCurrentRoomname = (newRoomname: string) => {
		this.setRoomsHistory(this.currentRoomname);
		this.currentRoomname = newRoomname;
	};

	setEmail = (newEmail: string) => (this.email = newEmail);

	setGeoLocation = (geoLocaion: GeoCoord) =>
		(this.geo = { ...this.geo, coord: geoLocaion });
	setPreferedDistance = (newPreferedDistance: number) =>
		(this.geo = { ...this.geo, preferedDistance: newPreferedDistance });

	setName = (newName: string) => (this.name = newName);

	setRoomsHistory = (roomname: string) =>
		!this.roomsHistory.length
			? (this.roomsHistory = [roomname])
			: this.roomsHistory.push(roomname);

	setUsername = (newUsername: string) => (this.username = newUsername);

	setSocketId = (newSocketId: SocketID) => (this.socketId = newSocketId);
}

export default ChatUser;
