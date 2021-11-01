import { ActionTypes as T } from './actionTypes';

export const initState: StoreState = {
	user: null,
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
		// case T.SETPREFEREDDISTANCE:
		// 	// eslint-disable-next-line no-case-declarations
		// 	const preferedDistance = payload as number;
		// 	return {
		// 		...state,
		// 		user: {
		// 			...state.user,
		// 			geo: {
		// 				...state.user?.geo,
		// 				preferedDistance: preferedDistance
		// 			}
		// 		}
		// 	}
		default:
			return state;
	}
};
