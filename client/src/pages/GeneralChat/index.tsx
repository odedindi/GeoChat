import {
	IonContent,
	IonHeader,
	IonPage,
	IonRow,
	IonTitle,
	IonToolbar,
	IonGrid,
	IonToast,
	IonFooter,
	IonButton,
} from '@ionic/react';
import * as I from 'ionicons/icons';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useSocket } from 'src/Socket';
import { useStore } from 'src/Store';
import * as Action from 'src/Store/action';
import ChatMessage from 'src/components/ChatMessage';
import TextArea from 'src/components/ChatTextArea';
import Loading from 'src/components/Spinner/Loading';
import useDidMount from 'src/hooks/useDidMount';
import { useKeyboardListener } from 'src/hooks/useKeyboardListener';
import { getLogger } from 'src/utils/logger';

import * as S from './styles';

const log = getLogger('Chat Page');

const GeneralChat: React.FC = () => {
	const { didMount } = useDidMount();

	const history = useHistory();
	const { socket } = useSocket();
	const {
		storeState: { user },
		storeDispatch,
	} = useStore();

	const [currentUser, setCurrentUser] = React.useState<User | null>(() => user);

	React.useEffect(() => {
		if (!currentUser) {
			const userFromStorage = localStorage.getItem('GeoChatUserDetails');
			if (!userFromStorage) {
				log('no user found, pushing to home page');
				history.push('/home');
			} else {
				setCurrentUser(JSON.parse(userFromStorage) as User);
				storeDispatch(Action.addUser(JSON.parse(userFromStorage) as User));
				log('found user in storage, data dispatched to store');
			}
		}
	}, [currentUser, history, storeDispatch, user]);
	const [userInput, setUserInput] = React.useState('');
	const [roomDetails, setRoomDetails] = React.useState<{
		messages: Msg[];
		users: User[];
	}>({
		messages: [],
		users: [],
	});

	const [toastState, setToastState] = React.useState({
		show: false,
		msg: '',
	});

	React.useEffect(() => {
		if (currentUser) {
			socket.emit('setUsername', currentUser);
			socket.on(
				'userChange',
				({ user, event }: { user: User; event: 'enter' | 'exit' }) => {
					log('userChange');
					if (user) {
						event === 'enter'
							? setToastState({
									show: true,
									msg: `${user.username} Enter`,
							  })
							: setToastState({
									show: true,
									msg: `${user.username} Exit`,
							  });
					}
				},
			);

			socket.on(
				'updateRoomDetails',
				({ users, messages }: { users: User[]; messages: Msg[] }) => {
					log('update room details');
					setRoomDetails({ messages: messages, users: users });
				},
			);

			socket.on('message', (msg: Msg) => {
				log('update messages');
				setRoomDetails((prev) => ({
					...prev,
					messages: [...prev.messages, msg],
				}));
			});
		}
	}, [currentUser, socket]);

	const sendMsgHandler = () => {
		if (userInput.length) {
			log('sendMessage');
			socket.emit('sendMessage', { text: userInput });
			setToastState({
				show: true,
				msg: `msg sent`,
			});
			setUserInput('');
		}
	};
	useKeyboardListener(sendMsgHandler);

	const disconnectHandler = () => {
		log('disconnect');
		localStorage.removeItem('GeoChatUserDetails');
		history.push('/');
	};

	React.useEffect(() => {
		console.log(roomDetails);
	}, [roomDetails]);
	if (!didMount || !currentUser)
		return <Loading open={!didMount || !currentUser} />;
	return (
		<IonPage>
			<IonToast
				isOpen={toastState.show}
				onDidDismiss={() => setToastState({ show: false, msg: '' })}
				message={toastState.msg}
				duration={2500}
			/>
			<IonHeader>
				<IonToolbar>
					<IonRow>
						<IonTitle>Welcome to geochat</IonTitle>
						<IonButton onClick={disconnectHandler}>Disconnect</IonButton>
					</IonRow>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonGrid>
					<S.ChatTitle>
						You joined the chat as {currentUser?.username}
					</S.ChatTitle>
					<IonRow>
						{roomDetails.messages.map((msg) =>
							msg.from.id === currentUser?.id ? (
								<ChatMessage key={msg.id} type="CurrentUser" msg={msg} />
							) : (
								<ChatMessage key={msg.id} type="OtherUsers" msg={msg} />
							),
						)}
					</IonRow>
				</IonGrid>
			</IonContent>
			<IonFooter className="ion-no-border">
				<IonRow>
					<TextArea />
				</IonRow>
				<S.UserInputWrapper>
					<S.ChatInputField
						value={userInput}
						onIonChange={({ detail: { value } }) =>
							setUserInput(value as string)
						}
					/>
					<S.SendButtun
						fill="clear"
						color={userInput.length ? 'primary' : 'medium'}
						disabled={userInput.length ? false : true}
						onClick={sendMsgHandler}
					>
						<S.SendIcon icon={I.send} />
					</S.SendButtun>
				</S.UserInputWrapper>
			</IonFooter>
		</IonPage>
	);
};

export default GeneralChat;
