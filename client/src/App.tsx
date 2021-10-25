import { Redirect, Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Providers from './Providers';

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
import * as I from 'ionicons/icons';
import UnAuthed from './routes/UnAuthed';
import Login from './pages/Auth/Login';
import RestorePassword from './pages/Auth/RestorePassword';
import Signup from './pages/Auth/Signup';
import ChatApp from './pages/Chat';

const App: React.FC = () => (
	<IonApp>
		<IonReactRouter>
			<IonTabs>
				<IonRouterOutlet>
					<Providers>
						<UnAuthed path="/home" component={Home} />
						<UnAuthed path="/auth/login" component={Login} />
						<UnAuthed path="/auth/signup" component={Signup} />
						<UnAuthed
							path="/auth/restorepassword"
							component={RestorePassword}
						/>
						<Route exact path="/">
							<Redirect to="/home" />
						</Route>
						<UnAuthed path="/chat/:roomname/:username" component={ChatApp} />
					</Providers>
				</IonRouterOutlet>
				<IonTabBar slot="bottom">
					<IonTabButton tab="tab1" href="/">
						<IonIcon icon={I.logoWechat} />
						<IonLabel>Home</IonLabel>
					</IonTabButton>
					<IonTabButton tab="tab2" href="/map">
						<IonIcon icon={I.mapOutline} />
						<IonLabel>Map</IonLabel>
					</IonTabButton>
					<IonTabButton tab="tab3" href="/settings">
						<IonIcon icon={I.settingsOutline} />
						<IonLabel>Settings</IonLabel>
					</IonTabButton>
				</IonTabBar>
			</IonTabs>
		</IonReactRouter>
	</IonApp>
);

export default App;
