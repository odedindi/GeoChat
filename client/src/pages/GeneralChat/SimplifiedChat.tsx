import { IonContent, IonFooter, IonHeader, IonPage } from '@ionic/react';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import * as Action from 'src/Store/action';
import { MessageInput } from 'src/components/SimplifiedChat/MessageInput';
import MessageList from 'src/components/SimplifiedChat/Messages';
import Loading from 'src/components/Spinner/Loading';
import {
	useDidMount,
	useIsSocketConnected,
	useKeyboardListener,
	useToast,
	useSocket,
	useStorage,
	useStore,
	usePosition,
} from 'src/hooks';
import userMap from 'src/utils/Mapper/UserMap';
import { getLogger } from 'src/utils/logger';

import Toolbar from './Toolbar';
import * as S from './styles';

const log = getLogger('Chat Page');

const Chat: React.FC = () => {
	const history = useHistory();
	const [isLoading, setIsLoading] = React.useState(false);
	const { IsConnected, setIsConnected } = useIsSocketConnected();

	const { socket } = useSocket();
	const { storage } = useStorage();
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

	const [messages, setMessages] = React.useState<Message[]>([]);
	const { geoPos } = usePosition();
	const messageListener = React.useCallback(
		(message: Message) =>
			setMessages((prevMessages) => [...prevMessages, message]),
		[],
	);
	const [userInput, setUserInput] = React.useState('');
	const submitMessage = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const msgContent = userInput.trim();
		if (!msgContent) return;
		const chatMessage: {
			content: string;
			coord: Coord;
		} = {
			content: userInput,
			coord: {
				lat: geoPos?.latitude ? geoPos.latitude : 0,
				lng: geoPos?.longitude ? geoPos.longitude : 0,
			},
		};
		socket.emit('chatMessage', chatMessage);
		setUserInput('');
	};

	React.useEffect(() => {
		socket.connected ? setIsConnected(true) : setIsConnected(false);
	}, [setIsConnected, socket.connected]);

	React.useEffect(() => {
		if (user) {
			socket.on('connect', () => {
				socket.emit('join', {
					user: userMap.toDTO(user),
					room: 'public',
				});
			});
			socket.on('message', messageListener);

			socket.on('disconnect', () => setIsConnected(false));
		}
		return () => {
			socket.off('connect');
			socket.off('roomUsers');
			socket.off('message', messageListener);
			socket.off('disconnect');
		};
	});

	return (
		<IonPage>
			<IonHeader>
				<IsConnected />
				<Toolbar user={user} />
			</IonHeader>
			<IonContent fullscreen>
				<Loading open={isLoading} />
				<div>
					{socket ? (
						<div className="chat-container">
							<MessageList messages={messages} />
						</div>
					) : (
						<div>Not Connected</div>
					)}
				</div>
			</IonContent>
			<IonFooter>
				<MessageInput
					value={userInput}
					setValue={setUserInput}
					onSubmit={submitMessage}
				/>
			</IonFooter>
		</IonPage>
	);
};

export default Chat;
