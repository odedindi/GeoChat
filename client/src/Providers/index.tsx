import { SocketProvider } from './Socket';
const Providers: React.FC = ({ children }) => (
	<>
		<SocketProvider>{children}</SocketProvider>
	</>
);

export default Providers;
