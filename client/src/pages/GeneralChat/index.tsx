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
import ChatMessage from 'src/components/ChatMessage';
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
	} = useStore();

	React.useEffect(() => {
		if (!user) {
			log('no user found, pushing to home page');
			history.push('/home');
		}
	}, [history, user]);

	const [userInput, setUserInput] = React.useState('');
	const [messages, setMessages] = React.useState<Msg[]>([
		{
			from: {
				id: 'sdq123',
				name: 'bob',
				username: 'bob',
				currentRoomname: '',
				roomHistory: [] as string[],
				avatar: 'https://robohash.org/d0DGHght2Orol2FZ6GB',
				geo: {
					lat: '',
					lng: '',
				},
			},
			text: 'hey guys',
			createdAt: Date.now(),
			id: Math.random().toString(),
		},
	]);

	const [toastState, setToastState] = React.useState({
		show: false,
		msg: '',
	});

	React.useEffect(() => {
		console.log(user);
	}, [user]);
	React.useEffect(() => {
		console.log(socket);
		socket.emit('setUsername', user);
		socket.on(
			'userChange',
			({ user, event }: { user: User; event: 'enter' | 'exit' }) => {
				event === 'enter'
					? setToastState({
							show: true,
							msg: `${user.username} Enter`,
					  })
					: setToastState({
							show: true,
							msg: `${user.username} Exit`,
					  });
			},
		);

		socket.on('message', (msg: Msg) => {
			setMessages((prev) => [...prev, msg]);
		});
	}, [socket, user]);

	const sendMsgHandler = () => {
		if (userInput.length) {
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
		localStorage.removeItem('GeoChatUserDetails');
		history.push('/');
	};

	if (!didMount) return <Loading open={!didMount} />;
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
					<S.ChatTitle>You joined the chat as {user?.username}</S.ChatTitle>
					<IonRow>
						{messages.map((msg) =>
							msg.from.username === user?.username ? (
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
