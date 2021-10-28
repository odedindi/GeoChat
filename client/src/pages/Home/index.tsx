import {
	createAnimation,
	IonButton,
	IonCardSubtitle,
	IonCol,
	IonContent,
	IonHeader,
	IonIcon,
	IonImg,
	IonLoading,
	IonPage,
	IonRow,
	IonTitle,
	IonToolbar,
} from '@ionic/react';
import * as I from 'ionicons/icons';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useSocket } from 'src/Socket';
import { useStore } from 'src/Store';
import * as Action from 'src/Store/action';
import InputField from 'src/components/InputField';
import { useKeyboardListener } from 'src/hooks/useKeyboardListener';
import useUploadNewAvatar from 'src/hooks/useUploadNewAvatar';
import { MainButton } from 'src/theme';
import { generateRandomAvatar } from 'src/utils/generateRandomAvatar';
import { generateRandomId } from 'src/utils/generateRandomId';
import { getLogger } from 'src/utils/logger';

import * as S from './styles';

const log = getLogger('Welcome');

const Home: React.FC = () => {
	const history = useHistory();

	const { socket } = useSocket();

	const { storeDispatch } = useStore();

	React.useEffect(() => {
		const user = localStorage.getItem('GeoChatUserDetails');
		if (user) {
			storeDispatch(Action.addUser(JSON.parse(user) as User));
			history.push('/chat');
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
			log('new avatar');
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

	const [submiting, setSubmiting] = React.useState(false);
	const submitHandler = React.useCallback(() => {
		log('hadnle setUsername');
		setSubmiting(true);
		if (!disableSubmitButton && socket) {
			socket.emit('setUsername', currentUser);
			localStorage.setItem('GeoChatUserDetails', JSON.stringify(currentUser));
			log('hadnled setUsername successfully, pushing client to /chat');
			history.push('/chat');
		} else {
			setSubmiting(false);
		}
	}, [currentUser, disableSubmitButton, history, socket]);

	useKeyboardListener(submitHandler);

	const enterAnimation = (baseEl: any) => {
		const backdropAnimation = createAnimation()
			.addElement(baseEl.querySelector('ion-backdrop')!)
			.fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

		const wrapperAnimation = createAnimation()
			.addElement(baseEl.querySelector('.modal-wrapper')!)
			.keyframes([
				{ offset: 0, opacity: '0', transform: 'scale(0)' },
				{ offset: 1, opacity: '0.99', transform: 'scale(1)' },
			]);

		return createAnimation()
			.addElement(baseEl)
			.easing('ease-out')
			.duration(500)
			.addAnimation([backdropAnimation, wrapperAnimation]);
	};

	const leaveAnimation = (baseEl: any) => {
		return enterAnimation(baseEl).direction('reverse');
	};

	const simpleAnimation = () => {
		const el = document.querySelector('.square-a');
		if (el) {
			const animation = createAnimation()
				.addElement(el)
				.duration(1000)
				.direction('alternate')
				.iterations(Infinity)
				.keyframes([
					{ offset: 0, transform: 'scale(3)', opacity: '1' },
					{
						offset: 1,
						transform: 'scale(1.5)',
						opacity: '0.5',
					},
				]);
			animation.play();
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
				<IonHeader>
					<IonToolbar>
						<IonTitle size="large" className={'square-a'}>
							Welcome please enter username
						</IonTitle>
					</IonToolbar>
				</IonHeader>
				<S.Banner>
					<IonRow>
						<IonCol size="12">
							<S.Avatar>
								{currentUser?.avatar ? (
									<IonImg src={currentUser.avatar} alt="avatar" />
								) : (
									<IonIcon
										icon={I.personCircleOutline}
										style={{ fontSize: '6rem' }}
									/>
								)}
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
				<IonLoading isOpen={submiting} />
			</IonContent>
		</IonPage>
	);
};

export default Home;
