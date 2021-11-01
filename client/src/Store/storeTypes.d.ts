type StoreContext = {
	storeState: StoreState;
	storeDispatch: React.Dispatch<ReducerActionArgument>;
	mapMarking: {
		useMarkings: LeafletGeometryElement[];
		setUserMarkings: React.Dispatch<
			React.SetStateAction<LeafletGeometryElement[]>
		>;
	};
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

interface SetPreferedDistanceActionArgument {
	type: 'SETPREFEREDDISTANCE';
	payload: number;
}
type SetPreferedDistanceAction = {
	(payload: number): SetPreferedDistanceActionArgument;
};

type ReducerActionArgument =
	| AddUserActionArgument
	| SetPreferedDistanceActionArgument;

type StoreReducer = {
	(state: StoreState, action: ReducerActionArgument): StoreState;
};
