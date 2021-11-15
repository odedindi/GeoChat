import { IonItem, IonLabel } from '@ionic/react';
import * as React from 'react';

import * as S from './styles';

type MessageInputProps = {
	value: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};
export const MessageInput: React.FC<MessageInputProps> = ({
	value,
	setValue,
	onSubmit,
}) => {
	return (
		<S.Form onSubmit={onSubmit}>
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
