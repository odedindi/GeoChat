import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from '@ionic/react';
import type { LatLngExpression } from 'leaflet';
import * as React from 'react';
import { useSocket } from 'src/Socket';
import { useStore } from 'src/Store';
import Map from 'src/components/Map';
import Loading from 'src/components/Spinner/Loading';
import useDidMount from 'src/hooks/useDidMount';
import { useMapCenter } from 'src/hooks/useMapCenter';
import { getLogger } from 'src/utils/logger';

const log = getLogger('Map page');

const MapPage: React.FC = () => {
	const { didMount } = useDidMount();
	const { socket } = useSocket();
	const { storeState } = useStore();

	const [currentUser, setCurrentUser] = React.useState<User | null>(null);
	React.useEffect(() => {
		const user = localStorage.getItem('GeoChatUserDetails');
		if (user) setCurrentUser(JSON.parse(user) as User);
	}, []);

	const [zoom] = React.useState(12);
	const [startGeoLocation] = React.useState<LatLngExpression>(() => [
		47.0227, 8.303,
	]);
	const { setMapCenter } = useMapCenter();
	if (!didMount) return <Loading open={!didMount} />;

	console.log(currentUser?.geo);
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Map Page</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<Map
					setMapCenter={setMapCenter}
					startLocation={startGeoLocation}
					zoom={zoom}
				/>
			</IonContent>
		</IonPage>
	);
};

export default MapPage;
