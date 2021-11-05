import {
	IonContent,
	IonHeader,
	IonPage,
	IonRow,
	IonTitle,
	IonToolbar,
} from '@ionic/react';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useSocket } from 'src/Socket';
import { useStore } from 'src/Store';
import * as Action from 'src/Store/action';
import InputField from 'src/components/InputField';
import Loading from 'src/components/Spinner/Loading';
import useDidMount from 'src/hooks/useDidMount';
import { useGeoLocation } from 'src/hooks/useGeoLocation';
import { useKeyboardListener } from 'src/hooks/useKeyboardListener';
import useStorage from 'src/hooks/useStorage';
import useUploadNewAvatar from 'src/hooks/useUploadNewAvatar';
import { MainButton } from 'src/theme';
import { generateRandomAvatar } from 'src/utils/generateRandomAvatar';
import { generateRandomId } from 'src/utils/generateRandomId';
import { getLogger } from 'src/utils/logger';
import { newUserTemplate } from 'src/utils/newUserTemplate';

import Banner from './Banner';
import PageNaviButton from './PageNaviButton';
import * as S from './styles';

const log = getLogger('Welcome page');

const Home: React.FC = () => {
	const { didMount } = useDidMount();
	const history = useHistory();
	const { socket } = useSocket();
	const { storeDispatch } = useStore();
	const { geoLocation, getGeoLocation } = useGeoLocation();
	const { storage } = useStorage();

	const [currentUser, setCurrentUser] = React.useState<User | null>(null);
	React.useEffect(() => {
		const user = localStorage.getItem('GeoChatUserDetails');
		if (user) setCurrentUser(JSON.parse(user) as User);

		const get = async () => {
			const { value } = (await storage.getItem('GeoChatUserDetails')) as {
				value: string;
			};
			if (value) setCurrentUser(JSON.parse(value) as User);
		};
		get();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const { newAvatar, uploadNewAvatar } = useUploadNewAvatar();

	const updateAvatar = (path: string) =>
		setCurrentUser((prev) =>
			!prev
				? { ...newUserTemplate, id: generateRandomId(), avatar: path }
				: { ...prev, avatar: path },
		);
	const generateAvatarHandler = () => updateAvatar(generateRandomAvatar());

	React.useEffect(() => {
		if (newAvatar) {
			log('new avatar');
			updateAvatar(newAvatar.webviewPath as string);
		}
	}, [newAvatar]);

	const getLocationHandler = () => getGeoLocation();
	const [geoLocError, setGeoLocError] = React.useState<string | null>(null);
	React.useEffect(() => {
		if (!geoLocation) return;
		else if (typeof geoLocation === 'string') {
			setGeoLocError(geoLocation as string);
			log(`error: ${geoLocation}`);
		} else {
			setGeoLocError(null);
			setCurrentUser((prev) =>
				!prev
					? {
							...newUserTemplate,
							id: generateRandomId(),
							geo: { ...newUserTemplate.geo, coord: geoLocation },
					  }
					: { ...prev, geo: { ...prev.geo, coord: geoLocation } },
			);
			log(`getLocation successful`);
		}
	}, [geoLocation]);

	const pageNaviButtons = [
		{
			clickHandler: generateAvatarHandler,
			title: 'Generate Avatar',
		},
		{
			clickHandler: getLocationHandler,
			title: 'Get Location',
		},
	];

	const inputChangeHandler = ({ id, value }: HTMLIonInputElement) =>
		setCurrentUser((prev) =>
			!prev
				? { ...newUserTemplate, id: generateRandomId(), [id]: value }
				: { ...prev, [id]: value },
		);

	const [disableSubmitButton, setDisableSubmitButton] = React.useState(true);
	React.useEffect(() => {
		if (currentUser?.username) setDisableSubmitButton(false);
		else setDisableSubmitButton(true);
	}, [currentUser]);

	const [submiting, setSubmiting] = React.useState(false);
	const submitHandler = React.useCallback(() => {
		log('handle setUsername');
		setSubmiting(true);
		if (!disableSubmitButton && socket) {
			socket.emit('setUsername', currentUser);
			storage.setItem('GeoChatUserDetails', JSON.stringify(currentUser));
			storeDispatch(Action.addUser(currentUser as User));
			log('hadnled setUsername successfully, pushing client to /chat');
			setTimeout(() => {
				history.push('/chat');
			}, 500);
		} else {
			setSubmiting(false);
		}
	}, [
		currentUser,
		disableSubmitButton,
		history,
		socket,
		storage,
		storeDispatch,
	]);
	useKeyboardListener(submitHandler, 'Enter');

	if (!didMount) return <Loading open={!didMount} />;
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Welcome to geochat</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<Loading open={submiting} />
				<Banner user={currentUser} uploadNewAvatar={uploadNewAvatar} />
				{pageNaviButtons.map((btn) => (
					<IonRow key={btn.title}>
						<PageNaviButton clickHandler={btn.clickHandler} title={btn.title} />
					</IonRow>
				))}
				{geoLocError && <S.GeoLocError>error</S.GeoLocError>}

				<InputField
					changeHandler={inputChangeHandler}
					id="username"
					type="text"
					required={true}
				/>
				<IonRow style={{ justifyContent: 'center', paddingTop: '2rem' }}>
					<MainButton disabled={disableSubmitButton} onClick={submitHandler}>
						Enter Chat
					</MainButton>
				</IonRow>
			</IonContent>
		</IonPage>
	);
};

export default Home;
