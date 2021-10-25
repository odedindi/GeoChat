import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Welcome to geochat</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Welcome to geochat</IonTitle>
					</IonToolbar>
				</IonHeader>
				<Link to="/auth/login">Login</Link>
				<br />
				<Link to="/auth/signup">Signup</Link>
				<br />
				<Link to="/auth/restorepassword">Restore password</Link>
				<ExploreContainer />
			</IonContent>
		</IonPage>
	);
};

export default Home;
