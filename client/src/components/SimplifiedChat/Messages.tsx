import * as React from 'react';

import Message from './Message';
import * as S from './styles';

const MessageList: React.FC<{ messages: Message[] }> = ({ messages }) => (
	<S.MessageList>
		{messages
			.sort(
				(a: Message, b: Message) => Number(b.createdat) - Number(a.createdat),
			)
			.map((message) => (
				<Message key={message.messageID} message={message} />
			))}
	</S.MessageList>
);

export default MessageList;
