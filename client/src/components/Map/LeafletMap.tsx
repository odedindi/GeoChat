import type { LatLngExpression } from 'leaflet';
import { CRS } from 'leaflet';
import * as React from 'react';
import { MapContainer, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';
import { useMapCenter } from 'src/hooks';

// import { MessageMarker } from './Marker';
import MapConfig from './config';
import * as S from './styles';

type MapProps = {
	messages: Message[];
	usergeoData: UserGeoData;
	zoom: number;
	zoomControl: boolean;
};

const Map: React.FC<MapProps> = ({
	usergeoData: {
		coord: { lat, lng },
		preferedDistance,
	},
	zoom,
	zoomControl,
}) => {
	const { setMapCenter } = useMapCenter();
	const [userPosition] = React.useState<LatLngExpression>(() => [lat, lng]);

	return (
		<S.MapWrapper>
			<MapContainer
				id="map"
				center={userPosition}
				zoom={zoom}
				zoomControl={zoomControl}
				whenCreated={setMapCenter}
				scrollWheelZoom={false}
				layers={[]}
				crs={CRS.EPSG3857}
			>
				<MapConfig />

				<Circle center={userPosition} radius={preferedDistance * 1000} />
				{/* {messages.map((msg) => (
					<MessageMarker
						key={msg.messageID}
						position={
							[msg.geolocation_lat, msg.geolocation_lng] as LatLngExpression
						}
						message={msg}
					/>
				))} */}
			</MapContainer>
		</S.MapWrapper>
	);
};

export default Map;
