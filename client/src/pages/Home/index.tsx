import type { RangeChangeEventDetail } from '@ionic/core';
import { IonCol, IonPage } from '@ionic/react';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import * as Action from 'src/Store/action';
import InputField from 'src/components/InputField';
import Logo from 'src/components/Logo';
import Loading from 'src/components/Spinner/Loading';
import {
	useDidMount,
	useKeyboardListener,
	usePosition,
	useStorage,
	useStore,
} from 'src/hooks';
import generate from 'src/utils/generators';
import { getLogger } from 'src/utils/logger';

import SelectPreferedRange from './SelectPreferedRange';
import * as S from './styles';

const log = getLogger('Welcome page');

const Home: React.FC = () => {
	const { didMount } = useDidMount();
	const [isLoading, setIsLoading] = React.useState(false);
	const history = useHistory();
	const { geoPos, geoPosError } = usePosition();
	const { storage } = useStorage();
	const {
		storeState: { user },
		storeDispatch,
	} = useStore();
	// if is not in store fetch user's data from storage
	const [currentUser, setCurrentUser] = React.useState<User>(() =>
		user
			? user
			: {
					userID: generate.id(),
					avatar: '',
					socketID: '',
					username: '',
					room: '',
					geo: { coord: { lat: 0, lng: 0 }, preferedDistance: 40 },
			  },
	);

	React.useEffect(() => {
		const getUserFromStorage = async () => {
			const { value } = (await storage.getItem('GeoChatUserDetails')) as {
				value: string;
			};
			if (value) {
				const fetchedUser = JSON.parse(value) as User;
				storeDispatch(Action.addUser(fetchedUser));
				log('found user in storage and dispatched to store');
				setCurrentUser(fetchedUser);
			}
		};
		setIsLoading(true);
		getUserFromStorage();
		setIsLoading(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// update user's location
	React.useEffect(() => {
		if (geoPos) {
			setCurrentUser(
				(prev): User => ({
					...prev,
					geo: {
						...prev.geo,
						coord: { lat: geoPos.latitude, lng: geoPos.longitude },
					},
				}),
			);
		}
	}, [geoPos]);

	// username input handler, if there is a known username field will not be shown
	const inputChangeHandler = ({ id, value }: HTMLIonInputElement) =>
		setCurrentUser((prev) => ({ ...prev, [id]: value }));

	// Enter Chat button logic
	// if there is no known geo location and known username button is disabled
	const [disableSubmitButton, setDisableSubmitButton] = React.useState(true);
	React.useEffect(() => {
		if (currentUser?.username && geoPos) setDisableSubmitButton(false);
		else setDisableSubmitButton(true);
	}, [currentUser, disableSubmitButton, geoPos]);

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

	// range input handler
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
			<Loading open={submiting || isLoading} />
			<S.PageContainer fullscreen>
				<S.Banner>
					<Logo />
					<IonCol size="12">
						{geoPosError && <S.GeoLocError>{geoPosError}</S.GeoLocError>}
					</IonCol>
				</S.Banner>
				<S.LogInContainer>
					<SelectPreferedRange
						value={currentUser.geo.preferedDistance}
						setValue={preferedDistanceHandler}
					/>
					{(!user || !user.username) && (
						<InputField
							changeHandler={inputChangeHandler}
							id="username"
							type="text"
							required={true}
						/>
					)}
					<S.BtnContainer>
						<S.EnterChatBtn
							disabled={disableSubmitButton}
							onClick={submitHandler}
						>
							Enter Chat
						</S.EnterChatBtn>
					</S.BtnContainer>
				</S.LogInContainer>
			</S.PageContainer>
		</IonPage>
	);
};

export default Home;
