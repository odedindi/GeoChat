import type L from 'leaflet';
import type { LatLngExpression } from 'leaflet';
import { CRS } from 'leaflet';
import * as React from 'react';
import { MapContainer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';
import { useStore } from 'src/Store';

import MapConfig from './config';
import * as S from './styles';

type MapProps = {
	setMapCenter: React.Dispatch<React.SetStateAction<L.Map>>;
	startLocation: LatLngExpression;
	zoom: number;
	user: User;
};

const Map: React.FC<MapProps> = ({
	setMapCenter,
	startLocation,
	zoom,
	user,
}) => {
	const {
		mapMarking: { useMarkings },
	} = useStore();
	React.useEffect(() => {
		console.log(useMarkings);
		console.log(user.geo.preferedDistance);
	}, [useMarkings, user]);

	return (
		<S.MapWrapper>
			<MapContainer
				id="map"
				center={startLocation}
				zoom={zoom}
				whenCreated={setMapCenter}
				scrollWheelZoom={false}
				layers={[]}
				crs={CRS.EPSG3857}
			>
				<MapConfig />

				<Marker position={startLocation}>
					<Popup>You Are Here :D</Popup>
				</Marker>
				<Circle
					center={startLocation}
					radius={user.geo.preferedDistance * 1000}
				/>
			</MapContainer>
		</S.MapWrapper>
	);
};

export default Map;
