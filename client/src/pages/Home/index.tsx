import {
	IonCol,
	IonContent,
	IonHeader,
	IonIcon,
	IonInput,
	IonItem,
	IonLabel,
	IonPage,
	IonRow,
	IonTitle,
	IonToolbar,
} from '@ionic/react';
import * as I from 'ionicons/icons';
import * as React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSocket } from 'src/Socket';
import { useKeyboardListener } from 'src/hooks/useKeyboardListener';

import * as S from './styles';

// /home/odedindi/Desktop/coding/my_portfolio/GeoChat/GeoChat/client/node_modules/@ionic/core/dist/types/interface.d.ts
const Home: React.FC = () => {
	const history = useHistory();
	const { socket } = useSocket();
	const [canApply, setCanApply] = React.useState(false);
	const [userInput, setInput] = React.useState({
		username: '',
		email: '',
	});

	React.useEffect(() => {
		const { username } = userInput;
		username.length ? setCanApply(true) : setCanApply(false);
	}, [userInput]);

	const sendData = React.useCallback(() => {
		if (canApply && socket) {
			socket.emit('joinGeneralChatRoom', userInput.username);
			history.push('/chat');
		}
	}, [canApply, history, socket, userInput]);
	useKeyboardListener(sendData);

	const inputChangeHandler = ({ id, value }: any) =>
		setInput((prev) => ({ ...prev, [id]: value }));

	React.useEffect(() => {
		console.log(userInput);
	}, [userInput]);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Welcome to geochat</IonTitle>
					<Link to="/auth/login">Login</Link>
					<br />
					<Link to="/auth/signup">Signup</Link>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader>
					<IonToolbar>
						<IonTitle size="large">Create New User</IonTitle>
					</IonToolbar>
				</IonHeader>
				<S.Wrapper>
					<IonRow>
						<IonCol>
							<IonIcon style={{ fontSize: '70px' }} icon={I.personCircle} />
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonItem>
								<IonLabel position="floating"> Email</IonLabel>
								<IonInput
									type="email"
									value={userInput.email}
									id="email"
									onIonChange={({ target }) => inputChangeHandler(target)}
								/>
							</IonItem>
						</IonCol>
					</IonRow>

					{/* <S.Input
						placeholder="Username"
						value={userInput.username}
						name="username"
						onChange={({ target }) => inputChangeHandler(target)}
					/> */}
					<S.Button disabled={!canApply} onClick={sendData}>
						Join
					</S.Button>
				</S.Wrapper>
			</IonContent>
		</IonPage>
	);
};

export default Home;
