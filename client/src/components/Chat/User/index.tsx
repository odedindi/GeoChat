import * as React from 'react';

import StatusIcon from './StatusIcon';
import * as S from './styles';

type ChatUserProps = { user: any };

const ChatUser: React.FC<ChatUserProps> = ({ user }) => {
	const [selected, setSelected] = React.useState(false);
	const clickHandler = () => setSelected(!selected);
	const [status, setStatus] = React.useState(false);
	React.useEffect(() => {
		user?.connected ? setStatus(true) : setStatus(false);
	}, [user?.connected]);

	return (
		<S.User selected={selected} onClick={clickHandler}>
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
