import * as React from 'react';

import StatusIcon from './StatusIcon';
import * as S from './styles';

type ChatUserProps = {
	user: any;
	selected: boolean;
	onClick: (user: User) => void;
};

const ChatUser: React.FC<ChatUserProps> = ({ user, selected, onClick }) => {
	const [status, setStatus] = React.useState(false);
	React.useEffect(() => {
		user?.connected ? setStatus(true) : setStatus(false);
	}, [user?.connected]);

	return (
		<S.User selected={selected} onClick={() => onClick(user)}>
			{user.newMessages && <S.NewMessages>*</S.NewMessages>}
			<S.Description>
				<S.Name>{user.username}</S.Name>
				<S.Status>
					<StatusIcon connected={status} />
				</S.Status>
			</S.Description>
		</S.User>
	);
};

export default ChatUser;
