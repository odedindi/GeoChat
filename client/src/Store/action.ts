import { ActionTypes as T } from './actionTypes';

export const process: ProcessAction = (encrypt, text, cypher) => {
	return {
		type: T.PROCESS,
		payload: {
			encrypt,
			text,
			cypher,
		},
	};
};
