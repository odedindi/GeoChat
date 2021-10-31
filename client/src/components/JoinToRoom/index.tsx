import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from '@ionic/react';
import * as React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSocket } from 'src/Socket';
import { useKeyboardListener } from 'src/hooks/useKeyboardListener';

import * as S from './styles';

const JoinToRoom: React.FC = () => {
	const history = useHistory();
	const { socket } = useSocket();
	const [canApply, setCanApply] = React.useState(false);
	const [userInput, setInput] = React.useState({
		username: '',
		roomname: '',
	});

	React.useEffect(() => {
		const { username, roomname } = userInput;
		username.length && roomname.length ? setCanApply(true) : setCanApply(false);
	}, [userInput]);

	const sendData = React.useCallback(() => {
		if (canApply) {
			if (socket) {
				const { username, roomname } = userInput;
				socket.emit('joinRoom', { username, roomname });
				history.push(`/chat/${roomname}/${username}`);
			} else {
				alert('username and roomname are must !');
				window.location.reload();
			}
		}
	}, [canApply, history, socket, userInput]);
	useKeyboardListener(sendData, 'Enter');

	const inputChangeHandler = ({ name, value }: HTMLInputElement) =>
		setInput((prev) => ({ ...prev, [name]: value }));

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
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Welcome to geochat</IonTitle>
					</IonToolbar>
				</IonHeader>
				<S.Wrapper>
					<S.Input
						placeholder="Username"
						value={userInput.username}
						name="username"
						onChange={({ target }) => inputChangeHandler(target)}
					/>
					<S.Input
						placeholder="Roomname"
						value={userInput.roomname}
						name="roomname"
						onChange={({ target }) => inputChangeHandler(target)}
					/>
					<S.Button disabled={!canApply} onClick={sendData}>
						Join
					</S.Button>
				</S.Wrapper>
			</IonContent>
		</IonPage>
	);
};

export default JoinToRoom;
