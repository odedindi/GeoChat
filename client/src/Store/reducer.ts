import { ActionTypes as T } from './actionTypes';

export const initState: StoreState = {
	user: {
		id: 'sdq123',
		name: 'bob',
		username: 'bob',
		currentRoomname: '',
		roomHistory: [] as string[],
		avatar: 'https://robohash.org/d0DGHght2Orol2FZ6GB',
		geo: {
			lat: '',
			lng: '',
		},
	},
};

export const reducer = (
	state: StoreState,
	action: ReducerActionArgument,
): StoreState => {
	const { payload, type } = action;
	switch (type) {
		case T.ADDUSER:
			// eslint-disable-next-line no-case-declarations
			const user = payload as User;
			return {
				...state,
				user: user,
			};
		default:
			return state;
	}
};
