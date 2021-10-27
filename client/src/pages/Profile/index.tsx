import {
	IonButton,
	IonCardSubtitle,
	IonCol,
	IonContent,
	IonHeader,
	IonIcon,
	IonImg,
	IonPage,
	IonRow,
	IonTitle,
	IonToolbar,
} from '@ionic/react';
import { cameraOutline, personCircleOutline } from 'ionicons/icons';
import * as React from 'react';
import { useStore } from 'src/Store';
import * as Action from 'src/Store/action';
import InputField from 'src/components/InputField';
import useUploadNewAvatar from 'src/hooks/useUploadNewAvatar';
import { MainButton } from 'src/theme';
import { generateRandomAvatar } from 'src/utils/generateRandomAvatar';

import * as S from './styles';

const ProfilePage: React.FC = () => {
	const { storeState, storeDispatch } = useStore();
	const { newAvatar, uploadNewAvatar } = useUploadNewAvatar();

	const [currentUser, setCurrentUser] = React.useState(() => storeState.user);

	const updateAvatar = (path: string) =>
		setCurrentUser((prev) => ({ ...prev, avatar: path }));
	React.useEffect(() => {
		if (newAvatar) {
			updateAvatar(newAvatar.webviewPath as string);
		}
	}, [newAvatar]);

	const inputFields = [
		{ id: 'name', type: 'text' },
		{ id: 'username', type: 'text' },
		{ id: 'email', type: 'email' },
	];

	const inputChangeHandler = ({ id, value }: HTMLIonInputElement) =>
		setCurrentUser((prev) => ({ ...prev, [id]: value }));

	const [disableSubmitButton, setDisableSubmitButton] = React.useState(true);
	React.useEffect(() => {
		if (storeState.user !== currentUser) setDisableSubmitButton(false);
		else setDisableSubmitButton(true);
	}, [currentUser, storeState.user]);
	const submitHandler = () => {
		storeDispatch(Action.addUser(currentUser));
		localStorage.setItem('GeoChatUserDetails', JSON.stringify(currentUser));
	};

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Profile Information</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Profile</IonTitle>
					</IonToolbar>
				</IonHeader>

				<S.Banner>
					<IonRow>
						<IonCol size="12">
							<S.Avatar>
								{currentUser.avatar ? (
									<IonImg src={currentUser.avatar} alt="avatar" />
								) : (
									<IonIcon
										icon={personCircleOutline}
										style={{ fontSize: '6rem' }}
									/>
								)}
							</S.Avatar>
							<S.AvatarUpload onClick={uploadNewAvatar}>
								<IonIcon icon={cameraOutline} />
							</S.AvatarUpload>
						</IonCol>
					</IonRow>

					<IonRow>
						<IonCol size="12" className="ion-text-center">
							<S.ProfileTitle>
								{currentUser.username ? currentUser.username : ''}
							</S.ProfileTitle>
						</IonCol>
					</IonRow>

					<IonRow>
						<IonCol size="12" className="ion-text-center">
							<IonCardSubtitle>
								{currentUser.name ? currentUser.name : ''}
							</IonCardSubtitle>
						</IonCol>
						<IonCol size="12" className="ion-text-center">
							<IonCardSubtitle>
								{currentUser.email ? currentUser.email : ''}
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

				{inputFields.map((inputField) => (
					<InputField
						key={inputField.id}
						changeHandler={inputChangeHandler}
						id={inputField.id}
						type={inputField.type as 'text' | 'email'}
					/>
				))}
				<IonRow style={{ justifyContent: 'center', paddingTop: '2rem' }}>
					<MainButton disabled={disableSubmitButton} onClick={submitHandler}>
						Submit
					</MainButton>
				</IonRow>
			</IonContent>
		</IonPage>
	);
};

export default ProfilePage;
