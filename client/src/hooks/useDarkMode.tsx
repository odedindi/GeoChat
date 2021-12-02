import { IonIcon, IonItem, IonLabel, IonToggle } from '@ionic/react';
import * as I from 'ionicons/icons';
import * as React from 'react';
import styled from 'styled-components';

import { useStorage } from '.';

type DarkModeContext = {
	handleToggle: () => void;
	DarkModeToggler: React.FC;
};
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const darkModeContext = React.createContext<DarkModeContext>(undefined!);
const { Provider } = darkModeContext;

const DarkModeIcon = styled(IonIcon)<{ dark: boolean }>`
	border-radius: 50%;

	padding: 0.5rem;
	height: 1rem;
	width: 1rem;

	margin-top: 5px;
	margin-bottom: 5px;
	transition: all 0.5s linear;
	background: ${({ dark }) => (dark ? '#27323e' : '#666')};
	color: ${({ dark }) => (dark ? '#fff' : 'var(--ion-color-warning)')};
`;

export const DarkModeProvider: React.FC = ({ children }) => {
	const { storage } = useStorage();
	const [state, setState] = React.useState(false);

	React.useEffect(() => {
		// check on first load if there user has preference
		const checkDarkModePreference = async () => {
			const { value } = (await storage.getItem('darkMode')) as {
				value: string;
			};
			const darkMode = (await JSON.parse(value)) as boolean;

			if (darkMode && !state) return setState(true);
			else if (!darkMode && state) return setState(false);
		};
		checkDarkModePreference();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	React.useEffect(() => {
		// handle change of darkMode state by toggling the class names
		if (state) document.body.classList.add('dark');
		if (!state) document.body.classList.remove('dark');
	}, [state]);

	const handleToggle = () => {
		if (state) {
			storage.setItem('darkMode', 'false');
			setState(false);
		} else {
			storage.setItem('darkMode', 'true');
			setState(true);
		}
	};

	const DarkModeToggler: React.FC = () => (
		<IonItem lines="full">
			<DarkModeIcon slot="start" icon={state ? I.moon : I.sunny} dark={state} />
			{/* <IonIcon
				slot="start"
				icon={state ? I.moon : I.sunny}
				className=".darkModeIconTogller .darkModeIconTogller-dark "
			/> */}
			<IonLabel>Dark Mode</IonLabel>
			<IonToggle
				slot="end"
				name="darkMode"
				checked={state}
				onIonChange={handleToggle}
			/>
		</IonItem>
	);

	return (
		<Provider value={{ handleToggle, DarkModeToggler }}>{children}</Provider>
	);
};

const useDarkMode = (): DarkModeContext => React.useContext(darkModeContext);

export default useDarkMode;
