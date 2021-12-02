import { IonActionSheet, IonCol, IonIcon } from '@ionic/react';
import * as I from 'ionicons/icons';
import * as React from 'react';
import { useUploadNewAvatar } from 'src/hooks';
import generate from 'src/utils/generators';

import BasicAvatar from './Avatar';
import * as S from './styles';

const EditableAvatar: React.FC<{
	avatar: string | undefined;
	updateHandler: (avatarPath: string) => void;
}> = ({ avatar, updateHandler }) => {
	const [showActionSheet, setShowActionSheet] = React.useState(false);

	const { newAvatar, uploadNewAvatar } = useUploadNewAvatar();
	React.useEffect(() => {
		if (updateHandler && newAvatar) {
			updateHandler(newAvatar.webviewPath as string);
		}
	}, [newAvatar, updateHandler]);

	return (
		<IonCol size="1">
			<BasicAvatar avatar={avatar} />
			<S.AvatarUpload onClick={() => setShowActionSheet(true)}>
				<IonIcon icon={I.chevronDown} />
			</S.AvatarUpload>
			<IonActionSheet
				isOpen={showActionSheet}
				onDidDismiss={() => setShowActionSheet(false)}
				buttons={[
					{
						text: 'Upload Image',
						icon: I.cameraOutline,
						handler: uploadNewAvatar,
					},
					{
						text: 'Get Random',
						icon: I.transgender,
						handler: () => {
							updateHandler(generate.avatar());
						},
					},
					{
						text: 'Cancel',
						icon: I.close,
						role: 'cancel',
					},
				]}
			></IonActionSheet>
		</IonCol>
	);
};

export default EditableAvatar;
