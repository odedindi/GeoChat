import * as React from 'react';

import StatusIcon from '../User/StatusIcon';

import * as S from './styles';

type MessagePanelProps = { user: any };

const MessagePanel: React.FC<MessagePanelProps> = ({ user }) => {
	const [status, setStatus] = React.useState(false);
	React.useEffect(() => {
		user?.connected ? setStatus(true) : setStatus(false);
	}, [user?.connected]);

	const [userInput, setUserInput] = React.useState('');

	const socket = {
		emit: (str: string, data: any) => console.log(str),
	};
	const submitHandler = () => {
		socket.emit('sentNewMessage', userInput);
		setUserInput('');
	};

	return (
		<>
			<S.Header>
				<StatusIcon connected={status} />
			</S.Header>
			<S.Messages>
				{user?.messages?.map((message: any, index: number) => (
					<S.Message key={index}>
						<S.Sender>{message.fromSelf ? 'You' : user.username}</S.Sender>
						{message.text}
					</S.Message>
				))}
			</S.Messages>
			<S.Form>
				<S.Input
					placeholder="Your message..."
					value={userInput}
					onChange={({ target: { value } }) => setUserInput(value)}
				/>
				<S.SendBtn disabled={!userInput.length} onClick={submitHandler}>
					Submit
				</S.SendBtn>
			</S.Form>
		</>
	);
};

export default MessagePanel;
