import { IonCol, IonIcon, IonImg, IonRow } from '@ionic/react';
import * as I from 'ionicons/icons';
import * as React from 'react';

import * as S from './styles';

type BannerProps = {
	user: User | null;
	uploadNewAvatar: UploadNewAvatar;
};
const Banner: React.FC<BannerProps> = ({ uploadNewAvatar, user }) => {
	return (
		<S.Banner>
			<IonRow>
				<IonCol size="12">
					<S.Avatar>
						{user?.avatar ? (
							<IonImg src={user.avatar} alt="avatar" />
						) : (
							<IonIcon
								icon={I.personCircleOutline}
								style={{ fontSize: '6rem' }}
							/>
						)}
					</S.Avatar>
					<S.AvatarUpload onClick={uploadNewAvatar}>
						<IonIcon icon={I.cameraOutline} />
					</S.AvatarUpload>
				</IonCol>
			</IonRow>

			<IonRow>
				<IonCol size="12" className="ion-text-center">
					<S.ProfileTitle>{user?.username ? user.username : ''}</S.ProfileTitle>
				</IonCol>
				<IonCol size="12" className="ion-text-center">
					<S.ProfileTitle>
						{user?.geo ? `Coord: [${user.geo.lat}, ${user.geo.lng}]` : ''}
					</S.ProfileTitle>
				</IonCol>
			</IonRow>
		</S.Banner>
	);
};
export default Banner;
