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
} from '@ionic/react';
import * as I from 'ionicons/icons';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { useSocket } from 'src/Socket';
import { useStore } from 'src/Store';
import { useKeyboardListener } from 'src/hooks/useKeyboardListener';

import CurrentUserMsg from './CurrentUserMsg';
import OtherUsersMsg from './OtherUsersMsg';
import * as S from './styles';

const GeneralChat: React.FC = () => {
	const { socket } = useSocket();
	const {
		storeState: { user },
	} = useStore();
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
		console.log(socket);
		socket.emit('setUsername', user);
		socket.on(
			'userChange',
			({ user, event }: { user: ChatUser; event: 'enter' | 'exit' }) => {
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
					<IonTitle>Welcome to geochat</IonTitle>
					<Link to="/auth/login">Login</Link>
					<br />
					<Link to="/auth/signup">Signup</Link>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonGrid>
					<S.ChatTitle>You joined the chat as {user.username}</S.ChatTitle>
					<IonRow>
						{messages.map((msg) =>
							msg.from.username === user.username ? (
								<CurrentUserMsg key={msg.id} msg={msg} />
							) : (
								<OtherUsersMsg key={msg.id} msg={msg} />
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
