import * as React from 'react';
import type { Socket } from 'socket.io-client';
import socketClient from 'socket.io-client';

type SocketContextType = {
	socket: Socket;
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const SocketContext = React.createContext<SocketContextType>(undefined!);
const { Provider }: { Provider: React.Provider<SocketContextType> } =
	SocketContext;

const SocketProvider: React.FC = ({ children }) => {
	const serverUrl = process.env.REACT_APP_SERVER_URL as string;
	const [socket] = React.useState(() => socketClient(serverUrl));
	if (process.env.NODE_ENV !== 'production') {
		console.log('sockerProvider: ', socket);
	}
	return <Provider value={{ socket }}>{children}</Provider>;
};
const useSocket = (): SocketContextType => React.useContext(SocketContext);

export { SocketProvider, useSocket };
