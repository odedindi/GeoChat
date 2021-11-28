import { IonRow, IonTitle, IonToolbar, IonButton, IonCol } from '@ionic/react';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from 'src/components/Avatar';
import Map from 'src/components/Map';
import { useStorage } from 'src/hooks';
import { getLogger } from 'src/utils/logger';

const log = getLogger('Toolbar');

const Toolbar: React.FC<{ user: User | null }> = ({ user }) => {
	const history = useHistory();
	const { storage } = useStorage();

	const disconnectHandler = () => {
		log('disconnect');
		storage.removeItem('GeoChatUserDetails');
		history.push('/');
	};
	return (
		<IonToolbar>
			<IonRow>
				<IonCol size="3.5">
					<IonRow>
						<IonTitle>Welcome {user?.username}</IonTitle>
						<Avatar avatar={user?.avatar} />
					</IonRow>
				</IonCol>
				<IonCol size="6.5">
					<div style={{ height: '100%', width: '100%' }}>
						<Map user={user} />
					</div>
				</IonCol>
				<IonCol size="2">
					<IonButton color="warning" onClick={disconnectHandler}>
						Disconnect
					</IonButton>
				</IonCol>
			</IonRow>
		</IonToolbar>
	);
};

export default Toolbar;
