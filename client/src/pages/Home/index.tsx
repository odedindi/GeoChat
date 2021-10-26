import * as React from 'react';
import { useHistory, Link } from 'react-router-dom';
import * as S from './styles';
import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from '@ionic/react';

import { useSocket } from 'src/Socket';
const Home: React.FC = () => {
	const history = useHistory();
	const { socket } = useSocket();
	const [username, setUsername] = React.useState('');
	const [roomname, setRoomname] = React.useState('');
	const [canApply, setCanApply] = React.useState(false);

	React.useEffect(() => {
		username.length && roomname.length ? setCanApply(true) : setCanApply(false);
	}, [roomname.length, username.length]);

	const sendData = React.useCallback(() => {
		if (canApply) {
			if (socket) {
				socket.emit('joinRoom', { username, roomname });
				history.push(`/chat/${roomname}/${username}`);
			} else {
				alert('username and roomname are must !');
				window.location.reload();
			}
		}
	}, [canApply, history, roomname, socket, username]);

	React.useEffect(() => {
		const keyboardListener = ({ code }: KeyboardEvent) => {
			if (code === 'Enter' || code === 'NumpadEnter') sendData();
		};
		document.addEventListener('keydown', keyboardListener);
		return () => {
			document.removeEventListener('keydown', keyboardListener);
		};
	}, [sendData]);

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
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Welcome to geochat</IonTitle>
					</IonToolbar>
				</IonHeader>
				<S.Wrapper>
					<h1>GeoChatting</h1>
					<S.Input
						placeholder="Input your user name"
						value={username}
						onChange={({ target: { value } }) => setUsername(value)}
					/>
					<S.Input
						placeholder="Input the room name"
						value={roomname}
						onChange={({ target: { value } }) => setRoomname(value)}
					/>
					<S.Button disabled={!canApply} onClick={sendData}>
						Join
					</S.Button>
				</S.Wrapper>
			</IonContent>
		</IonPage>
	);
};

export default Home;
