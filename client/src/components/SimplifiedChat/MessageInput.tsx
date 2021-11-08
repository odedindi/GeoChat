import { IonItem, IonLabel } from '@ionic/react';
import * as React from 'react';
import type { Socket } from 'socket.io-client';

import * as S from './styles';

export const MessageInput: React.FC<{ socket: Socket }> = ({ socket }) => {
	const [value, setValue] = React.useState('');
	const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const msgText = value.trim();
		if (!msgText) return;

		socket.emit('chatMessage', value);
		setValue('');
	};

	return (
		<S.Form onSubmit={submitForm}>
			<IonItem>
				<IonLabel position="floating">Type your message..</IonLabel>
				<S.Input
					autofocus
					value={value}
					onIonChange={({ detail: { value } }) => setValue(value as string)}
					clearInput
				/>
			</IonItem>
		</S.Form>
	);
};
