import type { LatLngExpression } from 'leaflet';
import { CRS } from 'leaflet';
import * as React from 'react';
import { MapContainer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';
import { useMapCenter } from 'src/hooks';

import Message from '../SimplifiedChat/Message';

import MapConfig from './config';
import * as S from './styles';

type MapProps = {
	messages: Message[];
	usergeoData: UserGeoData;
	zoom: number;
};

// const UserMarker: React.FC<{ position: LatLngExpression }> = ({ position }) => (
// 	<Marker position={position}>
// 		<Popup>&#9880; You Are Here &#9880;</Popup>
// 	</Marker>
// );
type MessageMarkerProps = { message: Message; position: LatLngExpression };
const MessageMarker: React.FC<MessageMarkerProps> = ({ message, position }) => (
	<Marker position={position}>
		<Popup>
			<div style={{ padding: '0.5rem', width: '100%' }}>
				<Message message={message} />
			</div>
		</Popup>
	</Marker>
);

const Map: React.FC<MapProps> = ({
	messages,
	usergeoData: {
		coord: { lat, lng },
		preferedDistance,
	},
	zoom,
}) => {
	const { setMapCenter } = useMapCenter();
	const [userPosition] = React.useState<LatLngExpression>(() => [lat, lng]);

	return (
		<S.MapWrapper>
			<MapContainer
				id="map"
				center={userPosition}
				zoom={zoom}
				whenCreated={setMapCenter}
				scrollWheelZoom={false}
				layers={[]}
				crs={CRS.EPSG3857}
			>
				<MapConfig />

				<Circle center={userPosition} radius={preferedDistance * 1000} />

				{messages.map((msg) => (
					<MessageMarker
						key={msg.messageID}
						position={
							[msg.geolocation_lat, msg.geolocation_lng] as LatLngExpression
						}
						message={msg}
					/>
				))}
			</MapContainer>
		</S.MapWrapper>
	);
};

export default Map;
