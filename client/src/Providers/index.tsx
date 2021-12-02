import { useLocation } from 'react-router-dom';
import { DarkModeProvider } from 'src/hooks/useDarkMode';
import { MapCenterProvider } from 'src/hooks/useMapCenter';
import { PositionProvider } from 'src/hooks/usePosition';
import { SocketProvider } from 'src/hooks/useSocket';
import { StoreProvider } from 'src/hooks/useStore';

import routes from '../routes/routes';

const WithSocket: React.FC = ({ children }) => {
	const { pathname } = useLocation();
	return (
		<>
			{pathname === routes.chat || pathname === routes.map ? (
				<SocketProvider>{children}</SocketProvider>
			) : (
				<>{children}</>
			)}
		</>
	);
};

const Providers: React.FC = ({ children }) => (
	<>
		<DarkModeProvider>
			<StoreProvider>
				<PositionProvider>
					<MapCenterProvider>
						<WithSocket>{children}</WithSocket>
					</MapCenterProvider>
				</PositionProvider>
			</StoreProvider>
		</DarkModeProvider>
	</>
);

export default Providers;
