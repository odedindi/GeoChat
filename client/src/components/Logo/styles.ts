import { IonImg, IonThumbnail, IonLabel } from '@ionic/react';
import styled from 'styled-components';

export const LogoWrapper = styled(IonThumbnail)`
	height: 3rem;
	background: white;
	border-radius: 50%;
`;

export const Logo = styled(IonImg)`
	height: 4rem;
	width: 4rem;
	position: relative;
	top: -0.4rem;
	left: -0.43rem;
`;

export const Title = styled(IonLabel)`
	margin-top: 1rem;
`;
