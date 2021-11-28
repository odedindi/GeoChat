import { ActionTypes as T } from './actionTypes';

export const addUser: AddUserAction = (payload) => ({
	type: T.ADDUSER,
	payload: payload,
});

export const logUserOut: LogUserOutAction = () => ({
	type: T.LOGUSEROUT,
	payload: null,
});
