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
	const [userInput, setUserInput] = React.useState<
		CustomTypes['ParagraphElement'][]
	>([
		{
			type: 'paragraph',
			children: [
				{
					text: 'This example mentions rendering as inline elements inside the document.',
				},
			],
		},
	]);
	const [roomDetails, setRoomDetails] = React.useState<{
		messages: Msg[];
		rendredMessages: Set<string>;
		users: User[];
	}>(() => ({
		messages: [],
		rendredMessages: new Set<string>(),
		users: [],
	}));

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
					setRoomDetails((prev) => ({
						...prev,
						messages: messages,
						users: users,
					}));
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
		log('sendMessage');
		socket.emit('sendMessage', { text: JSON.stringify(userInput) });
		setToastState({
			show: true,
			msg: `msg sent`,
		});
		setUserInput([]);
	};
	useKeyboardListener(sendMsgHandler, 'Enter', 'ctrlKey');

	const disconnectHandler = () => {
		log('disconnect');
		localStorage.removeItem('GeoChatUserDetails');
		history.push('/');
	};

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
						{roomDetails.messages.map((msg) => {
							// if (roomDetails.rendredMessages.has(msg.id)) {
							// 	console.log(roomDetails.rendredMessages.has(msg.id));
							// 	return null;
							// }

							// roomDetails.rendredMessages.add(msg.id);
							return msg.from.id === currentUser?.id ? (
								<ChatMessage key={msg.id} type="CurrentUser" msg={msg} />
							) : (
								<ChatMessage key={msg.id} type="OtherUsers" msg={msg} />
							);
						})}
					</IonRow>
				</IonGrid>
			</IonContent>
			<IonFooter className="ion-no-border">
				<S.UserInputWrapper>
					<TextArea
						mentionables={roomDetails.users}
						value={userInput}
						setValue={setUserInput}
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
