import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from '@ionic/react';
import './Home.css';
import { Link } from 'react-router-dom';
import * as React from 'react';
import { useSocket } from 'src/Socket';
import * as S from './styles';
const Home: React.FC = () => {
	const { socket } = useSocket();
	const [username, setUsername] = React.useState('');
	const [roomname, setRoomname] = React.useState('');
	const [canApply, setCanApply] = React.useState(false);

	React.useEffect(() => {
		username.length && roomname.length ? setCanApply(true) : setCanApply(false);
	}, [roomname.length, username.length]);
	const sendData = () => {
		if (canApply) {
			if (socket) socket.emit('joinRoom', { username, roomname });
		} else {
			alert('username and roomname are must !');
			window.location.reload();
		}
	};

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Welcome to geochat</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Welcome to geochat</IonTitle>
					</IonToolbar>
				</IonHeader>
				<Link to="/auth/login">Login</Link>
				<br />
				<Link to="/auth/signup">Signup</Link>
				<br />
				<Link to="/auth/restorepassword">Restore password</Link>
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
					<Link to={`/chat/${roomname}/${username}`}>
						<S.Button onClick={sendData}>Join</S.Button>
					</Link>
				</S.Wrapper>
			</IonContent>
		</IonPage>
	);
};

export default Home;
