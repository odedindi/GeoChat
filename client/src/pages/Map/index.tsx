import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from '@ionic/react';
import type { LatLngExpression } from 'leaflet';
import * as React from 'react';
import Map from 'src/components/Map';
import Loading from 'src/components/Spinner/Loading';
import useDidMount from 'src/hooks/useDidMount';
import { useMapCenter } from 'src/hooks/useMapCenter';
import useStorage from 'src/hooks/useStorage';
import { getLogger } from 'src/utils/logger';

const log = getLogger('Map page');

const MapPage: React.FC = () => {
	const { didMount } = useDidMount();
	const { storage } = useStorage();

	const [zoom] = React.useState(8);
	const [startGeoLocation, setStartGeoLocation] =
		React.useState<LatLngExpression | null>(null);
	const [currentUser, setCurrentUser] = React.useState<User | null>(null);

	React.useEffect(() => {
		const get = async () => {
			const { value } = (await storage.getItem('GeoChatUserDetails')) as {
				value: string;
			};
			if (value) {
				const user = JSON.parse(value) as User;
				setCurrentUser(user);
				setStartGeoLocation([
					Number(user.geo.coord.lat),
					Number(user.geo.coord.lng),
				]);
			}
		};
		get();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const { setMapCenter } = useMapCenter();
	if (!didMount) return <Loading open={!didMount} />;

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Map Page</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				{!startGeoLocation || !currentUser ? (
					<Loading open={!startGeoLocation || !currentUser} />
				) : (
					<Map
						setMapCenter={setMapCenter}
						startLocation={startGeoLocation}
						zoom={zoom}
						user={currentUser}
					/>
				)}
			</IonContent>
		</IonPage>
	);
};

export default MapPage;
