import { useLocation } from 'react-router-dom';
import { DarkModeProvider } from 'src/hooks/useDarkMode';
import { MapCenterProvider } from 'src/hooks/useMapCenter';
import { PositionProvider } from 'src/hooks/usePosition';
import * as React from 'react';
const LazySocketProvider = React.lazy(() => import('src/hooks/useSocket').then(m => ({ default: m.LazySocketProvider })));
import { StoreProvider } from 'src/hooks/useStore';

import routes from '../routes/routes';

const WithSocket: React.FC = ({ children }) => {
  const { pathname } = useLocation();
  if (pathname === routes.chat || pathname === routes.map) {
    return (
      <React.Suspense fallback={null}>
        <LazySocketProvider>{children}</LazySocketProvider>
      </React.Suspense>
    );
  }
  return <>{children}</>;
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
