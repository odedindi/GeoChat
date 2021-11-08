import { IonIcon, IonImg } from '@ionic/react';
import * as I from 'ionicons/icons';

import * as S from './styles';

const Avatar: React.FC<{ avatar: string | undefined }> = ({ avatar }) => (
	<S.Avatar>
		{avatar ? (
			<IonImg src={avatar} alt="avatar" />
		) : (
			<IonIcon icon={I.personCircleOutline} style={{ fontSize: '6rem' }} />
		)}
	</S.Avatar>
);

export default Avatar;
