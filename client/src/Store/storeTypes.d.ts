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
type AddUserAction = {
	(payload: User): AddUserActionArgument;
};

type ReducerActionArgument = AddUserActionArgument;

type StoreReducer = {
	(state: StoreState, action: ReducerActionArgument): StoreState;
};
