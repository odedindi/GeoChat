import { SocketProvider } from '../Socket';
import { StoreProvider } from '../Store';

const Providers: React.FC = ({ children }) => (
	<>
		<StoreProvider>
			<SocketProvider>{children}</SocketProvider>
		</StoreProvider>
	</>
);

export default Providers;
