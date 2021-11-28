import * as React from 'react';

import * as S from './styles';

type MessageInputProps = {
	value: string;
	handleChange: (text: string) => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};
export const MessageInput: React.FC<MessageInputProps> = ({
	value,
	handleChange,
	onSubmit,
}) => {
	return (
		<S.Form>
			<S.Input
				placeholder="Type your message.."
				value={value}
				onChange={({ target }) => handleChange(target.value)}
			/>
			<S.SendButton
				onClick={(e) =>
					onSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
				}
			>
				Send
			</S.SendButton>
		</S.Form>
	);
};
