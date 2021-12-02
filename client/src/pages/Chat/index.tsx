import { IonContent, IonFooter, IonHeader, IonPage } from '@ionic/react';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import * as Action from 'src/Store/action';
import { MessageList, InputFieldWithMention } from 'src/components/Chat';
import Loading from 'src/components/Spinner/Loading';
import * as Hook from 'src/hooks';
// useToast,
import userMap from 'src/utils/Mapper/UserMap';
import { mentioningTrigger } from 'src/utils/constants';
import generate from 'src/utils/generators';
import { getLogger } from 'src/utils/logger';

import Toolbar from './Toolbar';
// import * as S from './styles';

const log = getLogger('Chat Page');

const Chat: React.FC = () => {
	const history = useHistory();
	const [isLoading, setIsLoading] = React.useState(false);
	const { Toast, raiseToast } = Hook.useToast();
	const { socket } = Hook.useSocket();
	const { geoPos } = Hook.usePosition();
	const { storage } = Hook.useStorage();
	const {
		storeState: { user },
		storeDispatch,
	} = Hook.useStore();
	// get user if is not in store
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

	// old messages from the server
	const [messages, setMessages] = React.useState<Message[]>([]);
	const messageListener = React.useCallback((message: Message) => {
		setMessages((prev) => [...prev, message]);

		// automatic scrool to bottom when get new messages
		const list = document.querySelector('ion-content');
		list?.scrollToBottom(2000);
	}, []);

	// socket controll
	const { isSocketConnected, setIsConnected } = Hook.useIsSocketConnected();
	React.useEffect(() => {
		socket.connected ? setIsConnected(true) : setIsConnected(false);
	}, [setIsConnected, socket.connected]);
	React.useEffect(() => {
		if (user) {
			socket.on('connect', () => {
				socket.emit('join', { user: userMap.toDTO(user) });
			});
			socket.on('raiseToast', raiseToast);
			socket.on('message', messageListener);
			socket.on('youGotMentioned', (username, content) =>
				raiseToast(
					`${username}: ${
						content.length > 20
							? content.substr(0, 20) + '&hellip;'
							: content + '&hellip;'
					}`,
				),
			);
			socket.on('usersInAuthorProximity', (users: UserDTO[]) => {
				setMentionableUsers(generate.mentionableUsersFromUsersDTO(users));
			});
			socket.on('disconnect', () => setIsConnected(false));
		}
		return () => {
			socket.off('connect');
			socket.on('raiseToast', raiseToast);
			socket.off('message', messageListener);
			socket.off('youGotMentioned');
			socket.off('usersInAuthorProximity');
			socket.off('disconnect');
		};
	});

	// user input including mentions
	const [userInput, setUserInput] = React.useState('');
	const [mentionableUsers, setMentionableUsers] = React.useState<
		MentionableUser[]
	>([]);

	const handleInputChange = (newValue: string) => {
		/*
			get all users in current user area if mentioning trigger sign ('@'):
				* is the first value used.
				or
				* there is a space before it and mentionableUsers is empty
		*/
		const triggerMentions = newValue.search(mentioningTrigger);
		if (
			(!userInput.length && newValue === mentioningTrigger) ||
			(!mentionableUsers.length && newValue[triggerMentions - 1] === ' ')
		) {
			socket.emit('getUsersAroundMe');
		}
		setUserInput(newValue);
	};

	const submitMessage = () => {
		const msgContent = userInput.trim();
		if (!msgContent) return;
		const messageFromUser = generate.messageToSendToServer(userInput, geoPos);
		socket.emit('messageFromUser', messageFromUser);
		setUserInput('');
	};
	Hook.useKeyboardListener(submitMessage, 'Enter', true);

	return (
		<IonPage>
			<Loading open={isLoading || !isSocketConnected} />
			<IonHeader>
				<Toast />
				<Toolbar user={user} />
			</IonHeader>
			<IonContent fullscreen>
				<MessageList messages={messages} />
			</IonContent>
			<IonFooter>
				<InputFieldWithMention
					value={userInput}
					handleChange={handleInputChange}
					onSubmit={submitMessage}
					mentionables={mentionableUsers}
					trigger={mentioningTrigger}
				/>
			</IonFooter>
		</IonPage>
	);
};

export default Chat;
