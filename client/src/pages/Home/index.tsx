import {
	IonButton,
	IonCardSubtitle,
	IonCol,
	IonContent,
	IonHeader,
	IonIcon,
	IonPage,
	IonRow,
	IonTitle,
	IonToolbar,
} from '@ionic/react';
import * as I from 'ionicons/icons';
import * as React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSocket } from 'src/Socket';
import { useStore } from 'src/Store';
import * as Action from 'src/Store/action';
import InputField from 'src/components/InputField';
import { useKeyboardListener } from 'src/hooks/useKeyboardListener';
import useUploadNewAvatar from 'src/hooks/useUploadNewAvatar';
import { MainButton } from 'src/theme';
import { generateRandomAvatar } from 'src/utils/generateRandomAvatar';
import { generateRandomId } from 'src/utils/generateRandomId';

import * as S from './styles';

const Home: React.FC = () => {
	const history = useHistory();

	const { socket } = useSocket();

	const { storeDispatch } = useStore();

	React.useEffect(() => {
		const user = localStorage.getItem('GeoChatUserDetails');
		if (user) {
			storeDispatch(Action.addUser(JSON.parse(user) as User));
		} else {
			history.push('/settings');
		}
	}, [history, storeDispatch]);

	const [currentUser, setCurrentUser] = React.useState<User | null>(null);

	const { newAvatar, uploadNewAvatar } = useUploadNewAvatar();

	const updateAvatar = (path: string) =>
		setCurrentUser((prev) => {
			if (!prev) return { id: generateRandomId(), avatar: path };
			else return { ...prev, avatar: path };
		});

	React.useEffect(() => {
		if (newAvatar) {
			updateAvatar(newAvatar.webviewPath as string);
		}
	}, [newAvatar]);

	const inputChangeHandler = ({ id, value }: HTMLIonInputElement) =>
		setCurrentUser((prev) => {
			if (!prev) return { id: generateRandomId(), [id]: value };
			else return { ...prev, [id]: value };
		});

	const [disableSubmitButton, setDisableSubmitButton] = React.useState(true);

	React.useEffect(() => {
		if (currentUser?.username) setDisableSubmitButton(false);
		else setDisableSubmitButton(true);
	}, [currentUser]);

	const submitHandler = React.useCallback(() => {
		if (!disableSubmitButton && socket) {
			socket.emit('setUsername', currentUser);
			localStorage.setItem('GeoChatUserDetails', JSON.stringify(currentUser));
			history.push('/chat');
		}
	}, [currentUser, disableSubmitButton, history, socket]);

	useKeyboardListener(submitHandler);

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
						<IonTitle size="large">Welcome please enter username</IonTitle>
					</IonToolbar>
				</IonHeader>
				<S.Banner>
					<IonRow>
						<IonCol size="12">
							<S.Avatar>
								<IonIcon
									icon={I.personCircleOutline}
									style={{ fontSize: '6rem' }}
								/>
							</S.Avatar>
							<S.AvatarUpload onClick={uploadNewAvatar}>
								<IonIcon icon={I.cameraOutline} />
							</S.AvatarUpload>
						</IonCol>
					</IonRow>

					<IonRow>
						<IonCol size="12" className="ion-text-center">
							<S.ProfileTitle>
								{currentUser?.username ? currentUser.username : ''}
							</S.ProfileTitle>
						</IonCol>
					</IonRow>

					<IonRow>
						<IonCol size="12" className="ion-text-center">
							<IonCardSubtitle>
								{currentUser?.name ? currentUser.name : ''}
							</IonCardSubtitle>
						</IonCol>
						<IonCol size="12" className="ion-text-center">
							<IonCardSubtitle>
								{currentUser?.email ? currentUser.email : ''}
							</IonCardSubtitle>
						</IonCol>
					</IonRow>
				</S.Banner>
				<IonRow>
					<IonButton
						onClick={() => updateAvatar(generateRandomAvatar())}
						size="small"
					>
						Generate avatar
					</IonButton>
				</IonRow>

				<InputField
					changeHandler={inputChangeHandler}
					id="username"
					type="text"
				/>

				<IonRow style={{ justifyContent: 'center', paddingTop: '2rem' }}>
					<MainButton disabled={disableSubmitButton} onClick={submitHandler}>
						Submit
					</MainButton>
				</IonRow>
			</IonContent>
		</IonPage>
	);
};

export default Home;
