import { IonCol, IonInput, IonItem, IonLabel, IonRow } from '@ionic/react';

type InputFieldProps = {
	type: 'text' | 'email';
	id: string;
	changeHandler: (target: HTMLIonInputElement) => void;
};

const InputField: React.FC<InputFieldProps> = ({ changeHandler, id, type }) => {
	const title = `${id[0].toUpperCase()}${id.slice(1)}`;
	return (
		<IonRow>
			<IonCol>
				<IonItem>
					<IonLabel position="floating">{title}</IonLabel>
					<IonInput
						type={type}
						id={id}
						onIonChange={({ target }) =>
							changeHandler(target as HTMLIonInputElement)
						}
					/>
				</IonItem>
			</IonCol>
		</IonRow>
	);
};

export default InputField;
