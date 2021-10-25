import { useParams } from 'react-router-dom';
import { useSocket } from '../../Socket';

import Chat from '../../components/Chat';
// import Process from '../../components/Process';

import * as S from './styles';

type ChatAppParams = { username: string; roomname: string };

const ChatApp: React.FC = () => {
	const { socket } = useSocket();
	const { username, roomname } = useParams<ChatAppParams>();
	return (
		<S.ChatAppWrapper>
			<S.Right>
				<Chat username={username} roomname={roomname} socket={socket} />
			</S.Right>
			{/* <S.Left>
				<Process />
			</S.Left> */}
		</S.ChatAppWrapper>
	);
};

export default ChatApp;
