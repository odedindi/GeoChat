import Mapper from './Mapper';

class UserMap extends Mapper<User, UserDTO> {
	toDTO = ({
		avatar,
		userID,
		socketID,
		username,
		room,
		geo: {
			coord: { lat, lng },
			preferedDistance,
		},
		beSeenBeyondRange,
	}: User): UserDTO => ({
		avatar,
		userID,
		username,
		socketID,
		room,
		preferedDistance,
		geolocation_lat: lat,
		geolocation_lng: lng,
		beSeenBeyondRange,
	});

	fromDTO = ({
		avatar,
		userID,
		socketID,
		username,
		room,
		preferedDistance,
		geolocation_lat,
		geolocation_lng,
		beSeenBeyondRange,
	}: UserDTO): User => ({
		avatar,
		userID,
		socketID,
		username,
		room,
		geo: {
			coord: { lat: geolocation_lat, lng: geolocation_lng },
			preferedDistance,
		},
		beSeenBeyondRange,
	});
}

const userMap = new UserMap();
export default userMap;
