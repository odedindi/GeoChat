import { IonCol, IonIcon, IonRow } from '@ionic/react';
import * as I from 'ionicons/icons';
import * as React from 'react';
import Avatar from 'src/components/Avatar';
import { useGeoLocation, useUploadNewAvatar } from 'src/hooks';
import { generateRandomAvatar } from 'src/utils/generateRandomAvatar';
import { getLogger } from 'src/utils/logger';

import PageNaviButton from './PageNaviButton';
import * as S from './styles';

const log = getLogger('Banner');

type BannerProps = {
	user: User | Partial<User>;
	userStateUpdateHandler: React.Dispatch<React.SetStateAction<User>>;
};
const Banner: React.FC<BannerProps> = ({ user, userStateUpdateHandler }) => {
	const { geoLocation, getGeoLocation } = useGeoLocation();
	const { newAvatar, uploadNewAvatar } = useUploadNewAvatar();

	const updateAvatar = React.useCallback(
		(path: string) =>
			userStateUpdateHandler((prev) => ({ ...prev, avatar: path })),
		[userStateUpdateHandler],
	);
	const generateAvatarHandler = () => updateAvatar(generateRandomAvatar());

	React.useEffect(() => {
		if (newAvatar) {
			log('new avatar');
			updateAvatar(newAvatar.webviewPath as string);
		}
	}, [newAvatar, updateAvatar]);

	const [geoLocError, setGeoLocError] = React.useState<string | null>(null);
	React.useEffect(() => {
		if (!geoLocation) return;
		else if (typeof geoLocation === 'string') {
			setGeoLocError(geoLocation as string);
			log(`error: ${geoLocation}`);
		} else {
			setGeoLocError(null);
			userStateUpdateHandler(
				(prev): User => ({ ...prev, geo: { ...prev.geo, coord: geoLocation } }),
			);
			log(`getLocation successful`);
		}
	}, [geoLocation, userStateUpdateHandler]);

	return (
		<S.Banner>
			<IonRow>
				<IonCol size="6">
					<IonRow>
						<PageNaviButton
							clickHandler={generateAvatarHandler}
							title={'Generate Avatar'}
						/>
					</IonRow>
					<IonRow>
						<PageNaviButton
							clickHandler={() => getGeoLocation()}
							title={'Get Location'}
						/>
					</IonRow>

					{geoLocError && <S.GeoLocError>error</S.GeoLocError>}
				</IonCol>
				<IonCol size="6">
					<Avatar avatar={user?.avatar} />
					<S.AvatarUpload onClick={uploadNewAvatar}>
						<IonIcon icon={I.cameraOutline} />
					</S.AvatarUpload>
				</IonCol>
				<S.ProfileTitle>{user?.username ? user.username : ''}</S.ProfileTitle>
				<IonCol size="6" className="ion-text-center">
					<S.ProfileTitle>
						{user?.geo?.coord
							? `Coord: [${Number(user.geo.coord.lat).toFixed(2)}, ${Number(
									user.geo.coord.lng,
							  ).toFixed(2)}]`
							: ''}
					</S.ProfileTitle>
				</IonCol>
			</IonRow>
		</S.Banner>
	);
};
export default Banner;
