import * as React from 'react';

import { useStore } from '../../Store';
import { process } from '../../Store/action';
import { to_Decrypt, to_Encrypt } from '../../utils/aes';

import * as S from './styles';

type ChatProps = any;
type Message = {
	userId: string | number;
	username: string;
	text: string;
};
const Chat: React.FC<ChatProps> = ({ username, roomname, socket }) => {
	const [text, setText] = React.useState('');
	const [messages, setMessages] = React.useState<Message[]>([]);

	const { StoreDispatch } = useStore();

	const dispatchProcess = React.useCallback(
		(encrypt: any, msg: any, cipher: any) => {
			StoreDispatch(process(encrypt, msg, cipher));
		},
		[StoreDispatch],
	);
	React.useEffect(() => {
		socket.on(
			'message',
			(data: { text: string; username: string; userId: string }) => {
				//decypt
				const ans = to_Decrypt(data.text, data.username);
				dispatchProcess(false, ans, data.text);
				console.log(ans);
				setMessages((prevState) => [
					...prevState,
					{
						userId: data.userId,
						username: data.username,
						text: ans,
					},
				]);
			},
		);
	}, [dispatchProcess, socket]);

	const sendData = () => {
		if (text.length) {
			const ans = to_Encrypt(text);
			socket.emit('chat', ans);
			setText('');
		}
	};
	const messagesEndRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
	}, []);

	console.log(messages, 'mess');
	return (
		<S.ChatWrapper>
			<S.Username>
				<h2>
					{username} <span style={{ fontSize: '0.7rem' }}>in {roomname}</span>
				</h2>
			</S.Username>
			<S.ChatMessage>
				{messages.map((m) => {
					if (m.username === username) {
						return (
							<S.Message>
								<p>{m.text}</p>
								<span>{m.username}</span>
							</S.Message>
						);
					} else {
						return (
							<S.MessageRight>
								<p>{m.text} </p>
								<span>{m.username}</span>
							</S.MessageRight>
						);
					}
				})}
				<div ref={messagesEndRef} />
			</S.ChatMessage>
			<S.SendWrapper>
				<S.Input
					placeholder="enter your message"
					value={text}
					onChange={(e) => setText(e.target.value)}
					onKeyPress={(e) => {
						if (e.key === 'Enter') {
							sendData();
						}
					}}
				/>
				<S.Button onClick={sendData}>Send</S.Button>
			</S.SendWrapper>
		</S.ChatWrapper>
	);
};
export default Chat;
