import { IonRow, IonTitle, IonToolbar, IonButton, IonCol } from '@ionic/react';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from 'src/components/Avatar';
import { useStorage } from 'src/hooks';
import { getLogger } from 'src/utils/logger';

const log = getLogger('Toolbar');

const Toolbar: React.FC<{ user: User | undefined | null }> = ({ user }) => {
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
				<IonCol size="8">
					<IonRow>
						<IonTitle>Welcome</IonTitle>
						<Avatar avatar={user?.avatar} />
					</IonRow>
				</IonCol>
				<IonCol size="4">
					<IonButton onClick={disconnectHandler}>Disconnect</IonButton>
				</IonCol>
			</IonRow>
		</IonToolbar>
	);
};

export default Toolbar;
