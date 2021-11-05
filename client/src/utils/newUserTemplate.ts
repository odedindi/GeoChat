export const newUserTemplate: User = {
	avatar: '',

	geo: {
		coord: { lat: '', lng: '' },
		preferedDistance: 40,
	},
	id: '',
	messages: [],
	connected: false,
	username: '',
};

export const newConnectedUserTemplate: User = {
	avatar: '',

	geo: {
		coord: { lat: '', lng: '' },
		preferedDistance: 40,
	},
	id: '',
	messages: [],
	connected: true,
	username: '',
};
