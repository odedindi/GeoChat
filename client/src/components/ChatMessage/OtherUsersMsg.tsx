import { IonAvatar, IonLabel } from '@ionic/react';
import moment from 'moment';

import * as S from './styles';

const OtherUsersMsg: React.FC<{ msg: Msg }> = ({ msg }) => (
	<S.OtherUsersMessage size="9" offset="3" key={msg.id}>
		<S.MsgContentWrapper>
			<S.AvatarWrapper>
				<IonAvatar>
					<img src={msg.from.avatar} alt="user's avatar" />
				</IonAvatar>
				<IonLabel>
					<b>{msg.from.username}: </b>
				</IonLabel>
			</S.AvatarWrapper>

			<span>{msg.text}</span>
		</S.MsgContentWrapper>
		<S.MessageTime>
			{moment(msg.createdAt).format('DD MMM YY hh:mm')}
		</S.MessageTime>
	</S.OtherUsersMessage>
);
export default OtherUsersMsg;
