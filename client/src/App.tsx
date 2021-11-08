/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import {
	IonApp,
	IonIcon,
	IonLabel,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import * as I from 'ionicons/icons';
import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';

import Providers from './Providers';
import Login from './pages/Auth/Login';
import RestorePassword from './pages/Auth/RestorePassword';
import Signup from './pages/Auth/Signup';
import GeneralChat from './pages/GeneralChat';
import Chat from './pages/GeneralChat/SimplifiedChat';
import Home from './pages/Home';
import MapPage from './pages/Map';
import UnAuthed from './routes/UnAuthed';
import routes from './routes/routes';

const App: React.FC = () => {
	return (
		<IonApp>
			<IonReactRouter>
				<IonTabs>
					<IonRouterOutlet>
						<Providers>
							<UnAuthed path={routes.home} component={Home} />
							<UnAuthed path={routes.chat} component={Chat} />
							<UnAuthed path={routes.map} component={MapPage} />
							<UnAuthed path={routes.login} component={Login} />
							<UnAuthed path={routes.signup} component={Signup} />
							<UnAuthed
								path={routes.restorePassword}
								component={RestorePassword}
							/>
							<Route exact path="/">
								<Redirect to={routes.home} />
							</Route>
						</Providers>
					</IonRouterOutlet>

					<IonTabBar slot="bottom">
						<IonTabButton tab="tab1" href={routes.home}>
							<IonIcon icon={I.home} />
							<IonLabel>Home</IonLabel>
						</IonTabButton>
						<IonTabButton tab="tab2" href={routes.chat}>
							<IonIcon icon={I.logoWechat} />
							<IonLabel>chat</IonLabel>
						</IonTabButton>
						<IonTabButton tab="tab3" href={routes.map}>
							<IonIcon icon={I.map} />
							<IonLabel>Map</IonLabel>
						</IonTabButton>
						<IonTabButton tab="tab4" href={routes.settings}>
							<IonIcon icon={I.settings} />
							<IonLabel>Settings</IonLabel>
						</IonTabButton>
					</IonTabBar>
				</IonTabs>
			</IonReactRouter>
		</IonApp>
	);
};
export default App;
