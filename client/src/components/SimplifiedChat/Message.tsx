import moment from 'moment';

import * as S from './styles';

const Message: React.FC<{ message: Message }> = ({
	message: { createdat, content, fromuser },
}) => (
	<S.Message title={`Sent at ${new Date(createdat).toLocaleTimeString()}`}>
		<S.From>{fromuser}:</S.From>
		<S.Content>{content}</S.Content>
		<S.Date>{moment(Number(createdat)).format('lll')}</S.Date>
	</S.Message>
);

export default Message;
