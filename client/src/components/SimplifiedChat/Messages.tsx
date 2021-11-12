/* eslint-disable @typescript-eslint/no-non-null-assertion */
import moment from 'moment';
import * as React from 'react';
import type { Socket } from 'socket.io-client';
import styled from 'styled-components';

const MessageList = styled.div`
	width: 100%;

	.message-container {
		display: flex;
		flex-direction: row;
		padding: 0.5rem;
		border-bottom: 1px solid #eeeeee;
		align-items: center;
	}

	.user,
	.date {
		font-size: 0.625rem;
		color: #888888;
	}

	.user {
		min-width: 120px;
	}

	.message {
		flex-grow: 1;
	}
`;

export const Messages: React.FC<{ socket: Socket }> = ({ socket }) => {
	const [messages, setMessages] = React.useState<any>({});

	const messageListener = React.useCallback((message: any) => {
		setMessages((prevMessages: any) => {
			const newMessages = { ...prevMessages };
			newMessages[message.id] = message;
			return newMessages;
		});
	}, []);

	React.useEffect(() => {
		socket.on('message', messageListener);

		return () => {
			socket.off('message', messageListener);
		};
	});

	return (
		<MessageList>
			{[...(Object.values(messages) as Message[])]
				.sort((a: Message, b: Message) => a.createdat - b.createdat)
				.map((message) => (
					<div
						key={message.id}
						className="message-container"
						title={`Sent at ${new Date(
							message.createdat!,
						).toLocaleTimeString()}`}
					>
						{console.log(message)}
						<span className="user">{message.fromuser}:</span>
						<span className="message">{message.content}</span>
						<span className="date">
							{moment(message.createdat).format('lll')}
						</span>
					</div>
				))}
		</MessageList>
	);
};
