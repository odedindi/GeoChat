import { IonAvatar, IonCardTitle, IonGrid, IonRow } from '@ionic/react';
import styled from 'styled-components';

export const GeoLocError = styled(IonRow)`
	justify-content: center;
	color: var(--ion-color-danger);
`;

export const Banner = styled(IonGrid)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	align-content: center;
	/* background-color: var(--ion-color-success-tint);
	color: white; */
	background-color: #282c34;
	color: white;
`;

export const Avatar = styled(IonAvatar)`
	padding: 0.25rem;
	width: 7rem;
	height: 7rem;
	border: 5px solid rgba(218, 223, 208, 0.4);
`;

export const AvatarUpload = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	background-color: #fff;
	border: 3px solid rgba(218, 223, 208, 0.4);
	color: #505050;
	position: absolute;
	padding: 0.3rem;
	font-size: 1.1rem;
	border-radius: 500px;
	margin-top: -2.2rem;
	margin-left: 5rem;

	&:hover {
		cursor: pointer;
	}
`;

export const ProfileTitle = styled(IonCardTitle)`
	padding: 1rem;
	color: white;
	font-size: 1.5rem;
`;
