import Mapper from './Mapper';

interface UserDTO {
	id?: number;
	avatar: string;
	userID: string;
	socketID: string;
	username: string;
	room: string;
	preferedDistance: number;
}

class UserMap extends Mapper<User, UserDTO> {
	toDTO = ({
		avatar,
		userID,
		socketID,
		username,
		room,
		geo,
	}: User): UserDTO => ({
		avatar,
		userID,
		username,
		socketID,
		room,
		preferedDistance: geo.preferedDistance,
	});

	fromDTO = ({
		avatar,
		userID,
		socketID,
		username,
		room,
		preferedDistance,
	}: UserDTO): User => ({
		avatar,
		userID,
		socketID,
		username,
		room,
		geo: { coord: { lat: 0, lng: 0 }, preferedDistance },
	});
}

const userMap = new UserMap();
export default userMap;
