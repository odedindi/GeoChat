import { useLocation } from 'react-router-dom';
import { SocketProvider } from 'src/Socket';
import { StoreProvider } from 'src/Store';

import routes from '../routes/routes';

const Providers: React.FC = ({ children }) => {
	const { pathname } = useLocation();

	return (
		<>
			{pathname === routes.chat ? (
				<StoreProvider>
					<SocketProvider>{children}</SocketProvider>
				</StoreProvider>
			) : (
				<StoreProvider>{children}</StoreProvider>
			)}
		</>
	);
};

export default Providers;
