import { IonAvatar, IonLabel } from '@ionic/react';
import moment from 'moment';
import * as React from 'react';
import type { CustomTypes } from 'slate';

import { ReadOnlySlate } from '../../SlateEditor';

import * as S from './styles';

const CurrentUserMsg: React.FC<{ msg: Message }> = ({ msg }) => (
	<S.CurrentUserMessage size="9">
		{/* <S.MsgContentWrapper>
			<S.AvatarWrapper>
				{msg?.from?.avatar && (
					<IonAvatar>
						<img src={msg.from.avatar as string} alt="user's avatar" />
					</IonAvatar>
				)}
				<IonLabel>
					<b>{msg?.from?.username}: </b>
				</IonLabel>
			</S.AvatarWrapper>
			<ReadOnlySlate
				value={JSON.parse(msg.text) as CustomTypes['ParagraphElement'][]}
			/>
		</S.MsgContentWrapper>
		<S.MessageTime>
			{moment(msg?.createdAt as number).format('DD MMM YY hh:mm')}
		</S.MessageTime> */}
	</S.CurrentUserMessage>
);
export default CurrentUserMsg;
