import { ActionTypes as T } from './actionTypes';

export const initState: StoreState = {
	user: {
		id: 0,
		name: '',
		avatar: '',
		coordinates: [0, 0],
	},
	process: {
		encrypt: '',
		text: '',
		cypher: '',
	},
};

export const reducer = (
	state = initState,
	action: any,
): StoreState => {
	const { payload, type } = action;
	switch (type) {
		case 'ADDUSER':
			return {
				...state,
				user: payload,
			};
		case T.PROCESS:
			return { ...state, process: { ...payload } };
		default:
			return state;
	}
};
