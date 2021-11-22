import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from '@ionic/react';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import * as Action from 'src/Store/action';
import Map from 'src/components/Map';
import Loading from 'src/components/Spinner/Loading';
import {
	useDidMount,
	useIsSocketConnected,
	useSocket,
	useStorage,
	useStore,
} from 'src/hooks';
import userMap from 'src/utils/Mapper/UserMap';
import { getLogger } from 'src/utils/logger';

const log = getLogger('Map page');

const MapPage: React.FC = () => {
	const history = useHistory();
	const { didMount } = useDidMount();
	const { storage } = useStorage();
	const { socket } = useSocket();

	const { IsConnected, setIsConnected } = useIsSocketConnected();
	const [isLoading, setIsLoading] = React.useState(false);

	const {
		storeState: { user },
		storeDispatch,
	} = useStore();

	React.useEffect(() => {
		const getUserFromStorage = async () => {
			const { value } = (await storage.getItem('GeoChatUserDetails')) as {
				value: string;
			};
			if (value) {
				storeDispatch(Action.addUser(JSON.parse(value) as User));
				log('found user in storage and dispatched to store');
			} else {
				log('no user found, pushing to home page');
				history.push('/home');
			}
		};
		setIsLoading(true);
		getUserFromStorage();
		setIsLoading(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	React.useEffect(() => {
		if (user) {
			socket.on('connect', () => {
				socket.emit('join', {
					user: userMap.toDTO(user),
					room: 'public',
				});
			});
			socket.on('disconnect', () => setIsConnected(false));

			return () => {
				socket.off('connect');
				socket.off('disconnect');
			};
		}
	});

	React.useEffect(() => {
		socket.connected ? setIsConnected(true) : setIsConnected(false);
	}, [setIsConnected, socket.connected]);

	if (!didMount) return <Loading open={!didMount} />;
	if (isLoading) return <Loading open={isLoading} />;
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Map Page</IonTitle>
					<IsConnected />
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<Map user={user} />
			</IonContent>
		</IonPage>
	);
};

export default MapPage;
