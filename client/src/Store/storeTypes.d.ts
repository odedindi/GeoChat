type User = {
	avatar?: string;
	currentRoomname?: string;
	email?: string;
	geo?: {
		lat: string | number;
		lng: string | number;
	};
	id: string;
	name?: string;
	roomHistory?: string[];
	username?: string;
};

type StoreContext = {
	storeState: StoreState;
	storeDispatch: React.Dispatch<ReducerActionArgument>;
};

type StoreState = {
	user: User;
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
