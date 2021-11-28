import { IonButton } from '@ionic/react';
import generate from 'src/utils/generators';

type GetAvatarButtonProps = {
	userUpdateHandler: React.Dispatch<React.SetStateAction<User>>;
};

const GetAvatarButton: React.FC<GetAvatarButtonProps> = ({
	userUpdateHandler,
}) => {
	const generateAvatarHandler = () =>
		userUpdateHandler((prev: User) => ({ ...prev, avatar: generate.avatar() }));

	return (
		<IonButton onClick={generateAvatarHandler} size="small">
			Generate Avatar
		</IonButton>
	);
};

export default GetAvatarButton;
