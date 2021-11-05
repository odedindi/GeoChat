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
import type { CustomTypes } from 'slate';
import { useSocket } from 'src/Socket';
import { useStore } from 'src/Store';
import * as Action from 'src/Store/action';
import ChatMessage from 'src/components/ChatMessage';
import TextArea from 'src/components/ChatTextArea';
import Loading from 'src/components/Spinner/Loading';
import {
	useDidMount,
	useKeyboardListener,
	useToast,
	useStorage,
} from 'src/hooks';
import { getLogger } from 'src/utils/logger';

import * as S from './styles';

const log = getLogger('Chat Page');

const GeneralChat: React.FC = () => {
	const { didMount } = useDidMount();
	const { Toast, toastHandler } = useToast();
	const history = useHistory();
	const { socket } = useSocket();
	const { storage } = useStorage();

	const {
		storeState: { user },
		storeDispatch,
	} = useStore();
	const [currentUser, setCurrentUser] = React.useState<User | null>(() => user);

	React.useEffect(() => {
		const getUserFromStorage = async () => {
			const { value } = (await storage.getItem('GeoChatUserDetails')) as {
				value: string;
			};
			if (!value) {
				log('no user found, pushing to home page');
				history.push('/home');
			} else {
				setCurrentUser(JSON.parse(value) as User);
				storeDispatch(Action.addUser(JSON.parse(value) as User));
				log('found user in storage, data dispatched to store');
			}
		};

		getUserFromStorage();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const [userInput, setUserInput] = React.useState<
		CustomTypes['ParagraphElement'][]
	>([
		{
			type: 'paragraph',
			children: [
				{
					text: '',
				},
			],
		},
	]);
	type RoomDetails = {
		messages: Message[];
		users: User[];
	};
	const [roomDetails, setRoomDetails] = React.useState<RoomDetails>(() => ({
		messages: [],
		users: [],
	}));

	React.useEffect(() => {
		if (currentUser) {
			socket.emit('setUser', currentUser);
			socket.on(
				'userChange',
				({ user, event }: { user: User; event: 'enter' | 'exit' }) => {
					log('userChange');
					if (user) {
						event === 'enter'
							? toastHandler(`${user.username} Enter`)
							: toastHandler(`${user.username} Exit`);
					}
				},
			);

			socket.on(
				'updateRoomDetails',
				({ users, messages }: { users: User[]; messages: Message[] }) => {
					log('update room details');
					setRoomDetails((prev) => ({
						...prev,
						messages: messages,
						users: users,
					}));
				},
			);

			socket.on('message', (msg: Message) => {
				log('update messages');
				setRoomDetails((prev) => ({
					...prev,
					messages: [...prev.messages, msg],
				}));
			});
		}
	}, [currentUser, socket, toastHandler]);

	const sendMsgHandler = () => {
		if (userInput.length === 1) {
			// for the case the textArea is empty or contains only
			// whitespaces (i.e. spaces, tabs or line breaks) stop this function
			const inputChildren = userInput[0].children;
			if (inputChildren.length === 1) {
				const child = inputChildren[0] as CustomTypes['Text'];
				if (!child.text.trim()) return;
			}
		}

		// in case there is input
		log('sendMessageToServer');
		socket.emit('sendMessageToServer', { text: JSON.stringify(userInput) });
		toastHandler(`msg sent`);
		setUserInput([]);
	};
	useKeyboardListener(sendMsgHandler, 'Enter', 'ctrlKey');

	const disconnectHandler = () => {
		log('disconnect');
		storage.removeItem('GeoChatUserDetails');
		history.push('/');
	};

	if (!didMount || !currentUser)
		return <Loading open={!didMount || !currentUser} />;
	return (
		<IonPage>
			<Toast />
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
				<S.UserInputWrapper>
					<TextArea
						mentionables={roomDetails.users}
						value={userInput}
						setValue={setUserInput}
						placeholder="What is on your mind?"
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
