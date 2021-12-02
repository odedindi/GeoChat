import type { RangeChangeEventDetail } from '@ionic/core';
import { IonCol, IonPage } from '@ionic/react';
import _ from 'lodash';
import * as React from 'react';
import * as Action from 'src/Store/action';
import Avatar from 'src/components/Avatar';
import InputField from 'src/components/InputField';
import Loading from 'src/components/Spinner/Loading';
import * as Hooks from 'src/hooks';
import generate from 'src/utils/generators';
import { getLogger } from 'src/utils/logger';

import SelectPreferredRange from './SelectPreferredRange';
import ToggleOption from './ToggleOption';
import * as S from './styles';

const log = getLogger('Settings page');

const Settings: React.FC = () => {
	const { DarkModeToggler } = Hooks.useDarkMode();
	const { didMount } = Hooks.useDidMount();
	const [isLoading, setIsLoading] = React.useState(false);

	const { geoPos, geoPosError } = Hooks.usePosition();
	const { storage } = Hooks.useStorage();
	const {
		storeState: { user },
		storeDispatch,
	} = Hooks.useStore();
	// if is not in store fetch user's data from storage
	const [currentUser, setCurrentUser] = React.useState<User>(() =>
		user ? user : generate.newUser(),
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

	// setting changes handler
	const settingsChangeHandler = React.useCallback(
		({
			id,
			value,
		}:
			| HTMLIonInputElement
			| { id: keyof typeof currentUser; value: string | boolean }) =>
			setCurrentUser((prev) => ({ ...prev, [id]: value })),
		[],
	);

	// avater handling logic
	const updateAvatar = (path: string) =>
		settingsChangeHandler({ id: 'avatar', value: path });

	// range input handler
	const preferedDistanceHandler = ({
		detail: { value },
	}: CustomEvent<RangeChangeEventDetail>) =>
		setCurrentUser((prev) => ({
			...prev,
			geo: { ...prev.geo, preferedDistance: value as number },
		}));

	// save button logic
	// if there is no known user or user in store
	// and currentUser (state) are equal button is disabled
	const [allowSubmit, setAllowSubmit] = React.useState(false);
	React.useEffect(() => {
		if (user && !_.isEqual(user, currentUser)) setAllowSubmit(true);
		else setAllowSubmit(false);
	}, [currentUser, allowSubmit, geoPos, user]);

	const [submiting, setSubmiting] = React.useState(false);
	const submitHandler = React.useCallback(() => {
		log('handle saving updated user setting');
		setSubmiting(true);
		if (allowSubmit) {
			storage.setItem('GeoChatUserDetails', JSON.stringify(currentUser));
			storeDispatch(Action.addUser(currentUser as User));
			log('hadnled saving updated user setting successfully');
			setTimeout(() => {
				setSubmiting(false);
			}, 500);
		} else {
			setSubmiting(false);
		}
	}, [currentUser, allowSubmit, storage, storeDispatch]);
	Hooks.useKeyboardListener(submitHandler, 'Enter');

	React.useEffect(() => {
		console.log(currentUser);
	}, [currentUser]);

	if (!didMount) return <Loading open={!didMount} />;
	return (
		<IonPage>
			<Loading open={submiting || isLoading} />
			<S.PageContainer fullscreen>
				<S.Banner>
					{/* <Logo /> */}
					<Avatar avatar={currentUser?.avatar} updateHandler={updateAvatar} />

					<IonCol size="12">
						{geoPosError && <S.GeoLocError>{geoPosError}</S.GeoLocError>}
					</IonCol>
				</S.Banner>
				<S.LogInContainer>
					<DarkModeToggler />
					<InputField
						changeHandler={settingsChangeHandler}
						id="username"
						type="text"
					/>
					<SelectPreferredRange
						value={currentUser.geo.preferedDistance}
						setValue={preferedDistanceHandler}
					/>
					<ToggleOption
						state={currentUser.beSeenBeyondRange}
						label="Be seen beyond preferred range"
						id="beSeenBeyondRange"
						onChange={settingsChangeHandler}
						tooltipContent="Allow users that are outside your preferred range to see and mention you."
					/>
					<S.BtnContainer>
						<S.EnterChatBtn disabled={!allowSubmit} onClick={submitHandler}>
							Save
						</S.EnterChatBtn>
					</S.BtnContainer>
				</S.LogInContainer>
			</S.PageContainer>
		</IonPage>
	);
};

export default Settings;
