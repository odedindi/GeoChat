import { id } from './id';

export const newUser: GenerateNewUser = () => ({
	userID: id(),
	avatar: '',
	socketID: '',
	username: '',
	room: '',
	geo: {
		coord: { lat: 0, lng: 0 },
		preferedDistance: 40,
	},
	beSeenBeyondRange: false,
});
