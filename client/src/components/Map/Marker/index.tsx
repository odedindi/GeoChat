import type { SizeProp } from '@fortawesome/fontawesome-svg-core';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faComment, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Leaflet from 'leaflet';
import type { LatLngExpression } from 'leaflet';
import { renderToString } from 'react-dom/server';
import { Marker, Popup } from 'react-leaflet';
import Message from 'src/components/Chat/Message';

const customIcon = (icon: IconDefinition, color: string, size: SizeProp) =>
	renderToString(<FontAwesomeIcon icon={icon} size={size} color={color} />);

const messageMarkerIcon = new Leaflet.DivIcon({
	html: customIcon(faComment, '#4a7c31ec', '3x'),
});

const userMarkerIcon = new Leaflet.DivIcon({
	html: customIcon(faUserTie, '#727c31ed', '4x'),
});

type MessageMarkerProps = { message: Message; position: LatLngExpression };
export const MessageMarker: React.FC<MessageMarkerProps> = ({
	message,
	position,
}) => (
	<Marker position={position} icon={messageMarkerIcon}>
		<Popup>
			<div style={{ padding: '0.5rem', width: '100%' }}>
				<Message message={message} />
			</div>
		</Popup>
	</Marker>
);

export const UserMarker: React.FC<{
	user: UserDTO;
	position: LatLngExpression;
}> = ({ user, position }) => {
	return (
		<Marker position={position} icon={userMarkerIcon}>
			<Popup>
				<div style={{ padding: '0.5rem' }}>{user.username}</div>
			</Popup>
		</Marker>
	);
};
