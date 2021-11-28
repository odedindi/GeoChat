import { IonCol, IonIcon } from '@ionic/react';
import * as I from 'ionicons/icons';
import * as React from 'react';
import { useUploadNewAvatar } from 'src/hooks';

import BasicAvatar from './Avatar';
import * as S from './styles';

const EditableAvatar: React.FC<AvatarProps> = ({
	avatar,
	userUpdateHandler,
}) => {
	const { newAvatar, uploadNewAvatar } = useUploadNewAvatar();

	React.useEffect(() => {
		if (userUpdateHandler && newAvatar) {
			userUpdateHandler((prev: User) => ({
				...prev,
				avatar: newAvatar.webviewPath as string,
			}));
		}
	}, [newAvatar, userUpdateHandler]);

	return (
		<IonCol size="1">
			<BasicAvatar avatar={avatar} />
			<S.AvatarUpload onClick={uploadNewAvatar}>
				<IonIcon icon={I.cameraOutline} />
			</S.AvatarUpload>
		</IonCol>
	);
};

export default EditableAvatar;
