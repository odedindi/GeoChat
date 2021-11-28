import { ActionTypes as T } from './actionTypes';

const reducer = (
	state: StoreState,
	action: ReducerActionArgument,
): StoreState => {
	const { payload, type } = action;
	switch (type) {
		case T.ADDUSER:
			return {
				...state,
				user: payload,
			};

		case T.LOGUSEROUT:
			return {
				...state,
				user: payload,
			};
		default:
			return state;
	}
};

export default reducer;
