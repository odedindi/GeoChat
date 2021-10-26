import { SocketProvider } from 'src/Socket';
import { StoreProvider } from 'src/Store';

const Providers: React.FC = ({ children }) => (
	<>
		<StoreProvider>
			<SocketProvider>{children}</SocketProvider>
		</StoreProvider>
	</>
);

export default Providers;
