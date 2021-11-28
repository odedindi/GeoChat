type StoreContext = {
	storeState: StoreState;
	storeDispatch: React.Dispatch<ReducerActionArgument>;
};

type StoreState = {
	user: User | null;
};

interface AddUserActionArgument {
	type: 'ADDUSER';
	payload: User;
}

type AddUserAction = (payload: User) => AddUserActionArgument;

interface LogUserOutActionArgument {
	type: 'LOGUSEROUT';
	payload: null;
}

type LogUserOutAction = () => LogUserOutActionArgument;

type ReducerActionArgument = AddUserActionArgument | LogUserOutActionArgument;

type StoreReducer = {
	(state: StoreState, action: ReducerActionArgument): StoreState;
};
