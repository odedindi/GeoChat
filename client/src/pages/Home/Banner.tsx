import { IonCol, IonIcon, IonImg, IonRange, IonRow } from '@ionic/react';
import * as I from 'ionicons/icons';
import * as React from 'react';

import * as S from './styles';

type BannerProps = {
	user: User | null;
	uploadNewAvatar: UploadNewAvatar;
};
const Banner: React.FC<BannerProps> = ({ uploadNewAvatar, user }) => {
	const [preferedDistanceValue, setPreferedDistanceValue] = React.useState(0);

	const [rangeValue, setRangeValue] = React.useState<{
		lower: number;
		upper: number;
	}>({ lower: 0, upper: 0 });

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
						{user?.geo.coord
							? `Coord: [${user.geo.coord.lat}, ${user.geo.coord.lng}]`
							: ''}
					</S.ProfileTitle>
					<S.ProfileTitle>
						{user ? `preferedDistance: ${user.geo.preferedDistance}` : ''}
						<IonRange
							dualKnobs={true}
							pin={true}
							min={40}
							max={200}
							step={10}
							snaps={true}
							onIonChange={(e) => setRangeValue(e.detail.value as any)}
						/>
					</S.ProfileTitle>
				</IonCol>
			</IonRow>
		</S.Banner>
	);
};
export default Banner;
