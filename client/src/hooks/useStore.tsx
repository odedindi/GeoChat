import * as React from 'react';

import reducer from '../Store/reducer';
import initState from '../Store/store';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const StoreContext = React.createContext<StoreContext>(undefined!);
const { Provider }: { Provider: React.Provider<StoreContext> } = StoreContext;

export const StoreProvider: React.FC = ({ children }) => {
	const [storeState, storeDispatch] = React.useReducer(reducer, initState);

	return <Provider value={{ storeState, storeDispatch }}>{children}</Provider>;
};

const useStore = (): StoreContext => React.useContext(StoreContext);

export default useStore;
