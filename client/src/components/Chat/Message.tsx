import moment from 'moment';
import * as React from 'react';
import ReactEmoji from 'react-emoji';
import { useStore } from 'src/hooks';

import * as S from './styles';

const Message: React.FC<{ message: Message }> = ({
	message: { createdat, content, fromuser },
}) => {
	const {
		storeState: { user },
	} = useStore();
	const [outgoingMessage] = React.useState(() =>
		user?.username === fromuser ? true : false,
	);
	const [messageDate] = React.useState(() => {
		const todayDate = moment(Date.now()).format('ll');
		const messageSentDate = moment(Number(createdat)).fromNow();
		const messageSentHour = moment(Number(createdat)).format('hh:mm');
		const isMessageFromToday = todayDate === messageSentDate;
		if (isMessageFromToday) return messageSentHour;
		return messageSentDate;
	});

	return outgoingMessage ? (
		<S.MessageContainer outgoingMessage={outgoingMessage}>
			<S.ContentContainer outgoingMessage={outgoingMessage}>
				<S.Content>{ReactEmoji.emojify(content)}</S.Content>
				<S.Date>{messageDate}</S.Date>
			</S.ContentContainer>
		</S.MessageContainer>
	) : (
		<S.MessageContainer outgoingMessage={outgoingMessage}>
			<S.ContentContainer outgoingMessage={outgoingMessage}>
				<S.From>{fromuser.toLowerCase()}</S.From>

				<S.Content>{ReactEmoji.emojify(content)}</S.Content>

				<S.Date>{messageDate}</S.Date>
			</S.ContentContainer>
		</S.MessageContainer>
	);
};

export default Message;
