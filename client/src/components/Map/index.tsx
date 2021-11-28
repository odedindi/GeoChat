import * as React from 'react';
import { useLocation } from 'react-router-dom';
import Loading from 'src/components/Spinner/Loading';
import { useDidMount, useSocket } from 'src/hooks';

import LeafletMap from './LeafletMap';

const Map: React.FC<{ user: User | null }> = ({ user }) => {
	const { pathname } = useLocation();
	const { didMount } = useDidMount();
	const { socket } = useSocket();
	const [isLoading, setIsLoading] = React.useState(false);

	React.useEffect(() => {
		!user ? setIsLoading(true) : setIsLoading(false);
	}, [user]);

	const [messages, setMessages] = React.useState<Message[]>([]);

	const messageListener = React.useCallback(
		(message: Message) => {
			if (
				!messages.includes(message) &&
				(message.geolocation_lat || message.geolocation_lng)
			)
				setMessages((prev) => [...prev, message]);
		},
		[messages],
	);

	React.useEffect(() => {
		if (user) {
			socket.on('messagesInProximity', messageListener);
			return () => {
				socket.off('messagesInProximity', messageListener);
			};
		}
	});

	React.useEffect(() => {
		// on first load ask the server for relevant messages
		if (user) {
			socket.emit('messagesInProximity');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [isMapPage, setIsMapPage] = React.useState(false);
	const [zoom, setZoom] = React.useState(() => {
		if (!user || !user.geo) return 8;
		if (user.geo.preferedDistance < 70) return 9;
		if (user.geo.preferedDistance < 120) return 7;
		return 6;
	});
	React.useEffect(() => {
		if (pathname === '/map') setIsMapPage(true);
		else {
			setIsMapPage(false);
			setZoom(5);
		}
	}, [pathname]);

	if (isLoading) return <Loading open={isLoading} />;
	if (!didMount) return <Loading open={!didMount} />;
	return !user ? (
		<Loading open={!user} />
	) : (
		<LeafletMap
			zoomControl={isMapPage}
			zoom={zoom}
			usergeoData={user.geo}
			messages={messages}
		/>
	);
};

export default Map;
