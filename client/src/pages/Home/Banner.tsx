import { IonCol, IonIcon, IonRow } from '@ionic/react';
import * as I from 'ionicons/icons';
import * as React from 'react';
import Avatar from 'src/components/Avatar';
import { usePosition, useUploadNewAvatar } from 'src/hooks';
import generate from 'src/utils/generators';
import { getLogger } from 'src/utils/logger';

import PageNaviButton from './PageNaviButton';
import * as S from './styles';

const log = getLogger('Banner');

type BannerProps = {
	user: User | Partial<User>;
	userStateUpdateHandler: React.Dispatch<React.SetStateAction<User>>;
};

const Banner: React.FC<BannerProps> = ({ user, userStateUpdateHandler }) => {
	const { geoPosError } = usePosition();
	const { newAvatar, uploadNewAvatar } = useUploadNewAvatar();
	const updateAvatar = React.useCallback(
		(path: string) =>
			userStateUpdateHandler((prev) => ({ ...prev, avatar: path })),
		[userStateUpdateHandler],
	);
	const generateAvatarHandler = () => updateAvatar(generate.avatar());

	React.useEffect(() => {
		if (newAvatar) {
			log('new avatar');
			updateAvatar(newAvatar.webviewPath as string);
		}
	}, [newAvatar, updateAvatar]);

	const avatar = (
		<IonCol size="1">
			<Avatar avatar={user?.avatar} />
			<S.AvatarUpload onClick={uploadNewAvatar}>
				<IonIcon icon={I.cameraOutline} />
			</S.AvatarUpload>
		</IonCol>
	);
	const username = (
		<IonCol size="1">
			<IonRow>
				<S.ProfileTitle>{user?.username}</S.ProfileTitle>
			</IonRow>
		</IonCol>
	);
	const generateAvatarButton = (
		<IonCol size="12">
			<IonRow>
				<PageNaviButton
					clickHandler={generateAvatarHandler}
					title={'Generate Avatar'}
				/>
			</IonRow>
		</IonCol>
	);
	const geoLocationError = (
		<IonCol size="12">
			<S.ProfileTitle>
				{geoPosError && <S.GeoLocError>{geoPosError}</S.GeoLocError>}
			</S.ProfileTitle>
		</IonCol>
	);

	return (
		<S.Banner>
			{avatar}
			{username}
			{generateAvatarButton}
			{geoLocationError}
		</S.Banner>
	);
};
export default Banner;
