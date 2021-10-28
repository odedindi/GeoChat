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
		default:
			return state;
	}
};
