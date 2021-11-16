import moment from 'moment';
import * as React from 'react';

import * as S from './styles';

export const Messages: React.FC<{ messages: Message[] }> = ({ messages }) => (
	<S.MessageList>
		{messages
			.sort(
				(a: Message, b: Message) => Number(b.createdat) - Number(a.createdat),
			)
			.map(({ messageID, createdat, fromuser, content }) => (
				<S.Message
					key={messageID}
					title={`Sent at ${new Date(createdat).toLocaleTimeString()}`}
				>
					<S.From>{fromuser}:</S.From>
					<S.Content>{content}</S.Content>
					<S.Date>{moment(Number(createdat)).format('lll')}</S.Date>
				</S.Message>
			))}
	</S.MessageList>
);
