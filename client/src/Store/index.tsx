import * as React from 'react';

import { initState, reducer } from './reducer';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const StoreContext = React.createContext<StoreContext>(undefined!);
const { Provider }: { Provider: React.Provider<StoreContext> } = StoreContext;

const StoreProvider: React.FC = ({ children }) => {
	const [storeState, storeDispatch] = React.useReducer(
		reducer,
		initState,
	);
	return <Provider value={{ storeState, storeDispatch }}>{children}</Provider>;
};

const useStore = (): any => React.useContext(StoreContext);

export { StoreProvider, useStore };
