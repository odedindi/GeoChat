import { IonCol, IonInput, IonItem, IonLabel, IonRow } from '@ionic/react';

type InputFieldProps = {
	type: 'text' | 'email';
	id: string;
	changeHandler: (target: HTMLIonInputElement) => void;
	required?: boolean;
};

const InputField: React.FC<InputFieldProps> = ({
	changeHandler,
	id,
	required,
	type,
}) => {
	const title = `${id[0].toUpperCase()}${id.slice(1)}`;
	return (
		<IonRow>
			<IonCol>
				<IonItem>
					<IonLabel position="floating">
						{title}
						{required && '*'}
					</IonLabel>
					<IonInput
						type={type}
						id={id}
						onIonChange={({ target }) =>
							changeHandler(target as HTMLIonInputElement)
						}
						required={required}
					/>
				</IonItem>
			</IonCol>
		</IonRow>
	);
};

export default InputField;
