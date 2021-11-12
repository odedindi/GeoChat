import type { RangeChangeEventDetail } from '@ionic/core';
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
import { useStore } from 'src/Store';
import * as Action from 'src/Store/action';
import InputField from 'src/components/InputField';
import Loading from 'src/components/Spinner/Loading';
import useDidMount from 'src/hooks/useDidMount';
import { useKeyboardListener } from 'src/hooks/useKeyboardListener';
import useStorage from 'src/hooks/useStorage';
import { MainButton } from 'src/theme';
import { generateRandomId } from 'src/utils/generateRandomId';
import { getLogger } from 'src/utils/logger';

import Banner from './Banner';
import SelectPreferedRange from './SelectPreferedRange';
// import * as S from './styles';

const log = getLogger('Welcome page');

const Home: React.FC = () => {
	const { didMount } = useDidMount();
	const history = useHistory();
	const { storeDispatch } = useStore();
	const { storage } = useStorage();

	const [currentUser, setCurrentUser] = React.useState<User>({
		userID: generateRandomId(),
		avatar: '',
		socketID: '',
		username: '',
		room: '',
		geo: { coord: { lat: 0, lng: 0 }, preferedDistance: 40 },
	});
	React.useEffect(() => {
		const get = async () => {
			const { value } = (await storage.getItem('GeoChatUserDetails')) as {
				value: string;
			};
			if (value) setCurrentUser(JSON.parse(value) as User);
		};
		get();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const inputChangeHandler = ({ id, value }: HTMLIonInputElement) =>
		setCurrentUser((prev) => ({ ...prev, [id]: value }));

	const [disableSubmitButton, setDisableSubmitButton] = React.useState(true);
	React.useEffect(() => {
		if (currentUser?.username) setDisableSubmitButton(false);
		else setDisableSubmitButton(true);
	}, [currentUser]);

	const [submiting, setSubmiting] = React.useState(false);
	const submitHandler = React.useCallback(() => {
		log('handle setUsername');
		setSubmiting(true);
		if (!disableSubmitButton) {
			storage.setItem('GeoChatUserDetails', JSON.stringify(currentUser));
			storeDispatch(Action.addUser(currentUser as User));
			log('hadnled setUsername successfully, pushing client to /chat');
			setTimeout(() => {
				history.push('/chat');
			}, 500);
		} else {
			setSubmiting(false);
		}
	}, [currentUser, disableSubmitButton, history, storage, storeDispatch]);
	useKeyboardListener(submitHandler, 'Enter');

	const preferedDistanceHandler = ({
		detail: { value },
	}: CustomEvent<RangeChangeEventDetail>) =>
		setCurrentUser((prev) => ({
			...prev,
			geo: { ...prev.geo, preferedDistance: value as number },
		}));

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
				<Banner user={currentUser} userStateUpdateHandler={setCurrentUser} />
				<InputField
					changeHandler={inputChangeHandler}
					id="username"
					type="text"
					required={true}
				/>
				<SelectPreferedRange
					value={currentUser.geo.preferedDistance}
					setValue={preferedDistanceHandler}
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
