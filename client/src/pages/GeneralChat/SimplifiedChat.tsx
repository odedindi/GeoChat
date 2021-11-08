import { IonContent, IonHeader, IonPage } from '@ionic/react';
import * as React from 'react';
import { useSocket } from 'src/Socket';
import { useStore } from 'src/Store';
import * as Action from 'src/Store/action';
import { MessageInput } from 'src/components/SimplifiedChat/MessageInput';
import { Messages } from 'src/components/SimplifiedChat/Messages';
import Loading from 'src/components/Spinner/Loading';
import {
	useDidMount,
	useKeyboardListener,
	useToast,
	useStorage,
} from 'src/hooks';
import { getLogger } from 'src/utils/logger';
import styled from 'styled-components';

import Toolbar from './Toolbar';
import * as S from './styles';

const log = getLogger('Chat Page');

const Chat: React.FC = () => {
	const { socket } = useSocket() as any;
	const { storage } = useStorage();
	const {
		storeState: { user },
		storeDispatch,
	} = useStore();
	const [currentUser, setCurrentUser] = React.useState<User | null>(() => user);
	const [roomUsers, setRoomUsers] = React.useState<any>({});

	React.useEffect(() => {
		const getUserFromStorage = async () => {
			const { value } = (await storage.getItem('GeoChatUserDetails')) as {
				value: string;
			};
			if (!value) {
				log('no user found, pushing to home page');
				// history.push('/home');
			} else {
				setCurrentUser(JSON.parse(value) as User);
				storeDispatch(Action.addUser(JSON.parse(value) as User));
				log('found user in storage, data dispatched to store');
			}
		};

		getUserFromStorage();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	React.useEffect(() => {
		console.log(roomUsers);
	});
	const [isConnected, setIsConnected] = React.useState(() => socket.connected);
	const [typing, setTyping] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);

	React.useEffect(() => {
		if (currentUser) {
			socket.on('connect', () => {
				socket.emit('joinRoom', {
					username: currentUser.username,
					user: currentUser,
					room: 'public',
				});
				setIsConnected(true);
			});
			// Get room and users
			socket.on(
				'roomUsers',
				({ room, users }: { room: string; users: User[] }) => {
					setIsLoading(true);
					users.forEach((user) => {
						setRoomUsers((prev: any) => ({
							...prev,
							[user.socketID]: user.username,
						}));
					});
					setIsLoading(false);
				},
			);

			socket.on('disconnect', () => {
				setIsConnected(false);
			});
		}
		return () => {
			socket.off('connect');
			socket.off('disconnect');
			socket.off('message');
		};
	});

	return (
		<IonPage>
			<IonHeader>
				<Header>
					<Toolbar user={currentUser} />
					<p>Socket Connected: {'' + isConnected}</p>
				</Header>
			</IonHeader>
			<IonContent fullscreen>
				<Loading open={isLoading} />
				<div>
					{socket ? (
						<div className="chat-container">
							<Messages socket={socket} />
							<MessageInput socket={socket} />
						</div>
					) : (
						<div>Not Connected</div>
					)}
				</div>
				<S.ChatWindow></S.ChatWindow>
				<S.SideBar></S.SideBar>
			</IonContent>
		</IonPage>
	);
};

const Header = styled.div`
	padding: 1rem;
	background-color: #282c34;
	color: white;
`;

export default Chat;
