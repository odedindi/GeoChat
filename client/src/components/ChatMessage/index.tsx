import CurrentUserMsg from './CurrentUserMsg';
import OtherUsersMsg from './OtherUsersMsg';

type ChatMessageProps = {
	type: 'CurrentUser' | 'OtherUsers';
	msg: Msg;
};
const ChatMessage: React.FC<ChatMessageProps> = ({ msg, type }) => {
	if (type === 'CurrentUser') return <CurrentUserMsg msg={msg} />;
	if (type === 'OtherUsers') return <OtherUsersMsg msg={msg} />;
	return null;
};

export default ChatMessage;
