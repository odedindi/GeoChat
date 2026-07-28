
import * as React from 'react';
import type { Socket } from 'socket.io-client';

// Dynamic import for socket.io-client
const loadSocketIO = () => import('socket.io-client');

type SocketContextType = {
	socket: Socket | null;
};

const SocketContext = React.createContext<SocketContextType>({ socket: null });
const { Provider } = SocketContext;

// Lazy SocketProvider for code splitting
export const LazySocketProvider: React.FC = ({ children }) => {
	const serverUrl = process.env.REACT_APP_SERVER_URL as string;
	const [socket, setSocket] = React.useState<Socket | null>(null);

	React.useEffect(() => {
		let isMounted = true;
		loadSocketIO().then(({ default: io }) => {
			if (isMounted) {
				setSocket(io(`${serverUrl}`));
			}
		});
		return () => {
			isMounted = false;
			if (socket) {
				socket.disconnect();
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [serverUrl]);

	return <Provider value={{ socket }}>{children}</Provider>;
};

export const useSocket = (): SocketContextType => React.useContext(SocketContext);

export default useSocket;
