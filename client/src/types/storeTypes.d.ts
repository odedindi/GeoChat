type ProcessPayload = {
	encrypt: any;
	text: any;
	cypher: any;
};
type ProcessType = 'PROCESS';

type ProcessAction = {
	(encrypt: any, text: any, cypher: any): {
		type: ProcessType;
		payload: ProcessPayload;
	};
};

type AddUserType = 'ADDUSER';
type AddUserPayload = {
	id: number;
	name: string;
	avatar: string;
	coordinates: [number, number];
};
type AddUserAction = {
	(payload: AddUserPayload): {
		type: AddUserType;
		payload: AddUserPayload;
	};
};

type StoreContext = {
	storeState: StoreState;
	storeDispatch: React.Dispatch<ReducerActionArgument>;
};

type StoreState = {
	user: {
		id: number;
		name: string;
		avatar: string;
		coordinates: [number, number];
	};
	process: {
		encrypt: any;
		text: any;
		cypher: any;
	};
};

type ReducerActionArgument =
	| {
			type: AddUserType;
			payload: AddUserPayload;
	  }
	| {
			type: ProcessType;
			payload: ProcessPayload;
	  };

type StoreReducer = {
	(state: StoreState, action: ReducerActionArgument): StoreState;
};
