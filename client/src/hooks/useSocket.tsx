import * as React from 'react';
import type { Socket } from 'socket.io-client';
import io from 'socket.io-client';

type SocketContextType = {
	socket: Socket;
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const SocketContext = React.createContext<SocketContextType>(undefined!);
const { Provider } = SocketContext;

export const SocketProvider: React.FC = ({ children }) => {
	const serverUrl = process.env.REACT_APP_SERVER_URL as string;
	const [socket] = React.useState(() => io(`${serverUrl}`));

	return <Provider value={{ socket }}>{children}</Provider>;
};
const useSocket = (): SocketContextType => React.useContext(SocketContext);

export default useSocket;
