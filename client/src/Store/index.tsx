import * as React from 'react';

import { initState, reducer } from './reducer';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const StoreContext = React.createContext<StoreContext>(undefined!);
const { Provider }: { Provider: React.Provider<StoreContext> } = StoreContext;

const StoreProvider: React.FC = ({ children }) => {
	const [storeState, storeDispatch] = React.useReducer(reducer, initState);

	const [useMarkings, setUserMarkings] = React.useState<
		LeafletGeometryElement[]
	>([]);

	const mapMarking = { useMarkings, setUserMarkings };
	return (
		<Provider value={{ storeState, storeDispatch, mapMarking }}>
			{children}
		</Provider>
	);
};

const useStore = (): StoreContext => React.useContext(StoreContext);

export { StoreProvider, useStore };
