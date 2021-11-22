import * as React from 'react';
import Loading from 'src/components/Spinner/Loading';
import { useDidMount, useSocket } from 'src/hooks';

import LeafletMap from './LeafletMap';

const Map: React.FC<{ user: User | null }> = ({ user }) => {
	const { didMount } = useDidMount();
	const { socket } = useSocket();
	const [zoom] = React.useState(8);

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
				setMessages((prevMessages) => [...prevMessages, message]);
		},
		[messages],
	);

	React.useEffect(() => {
		if (user) {
			socket.on('message', messageListener);
			return () => {
				socket.off('message', messageListener);
			};
		}
	});

	React.useEffect(() => {
		// on first load ask the server for messages
		if (user) socket.emit('getMessages');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	React.useEffect(() => {
		console.log(messages);
	}, [messages]);

	if (!didMount) return <Loading open={!didMount} />;
	if (isLoading) return <Loading open={isLoading} />;
	return !user ? (
		<Loading open={!user} />
	) : (
		<LeafletMap zoom={zoom} usergeoData={user.geo} messages={messages} />
	);
};

export default Map;
