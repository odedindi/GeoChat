import { IonContent, IonGrid, IonRow } from '@ionic/react';
import { MainButton } from 'src/theme';
import styled from 'styled-components';

export const PageContainer = styled(IonContent)``;

export const LogInContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 2rem;

	.rangeWrapper {
		margin-bottom: 2rem;
	}
`;
export const BtnContainer = styled(IonRow)`
	justify-content: center;
	padding-top: 2rem;
`;

export const EnterChatBtn = styled(MainButton)``;

export const GeoLocError = styled(IonRow)`
	padding: 0.5rem 0;
	justify-content: center;
	font-size: 0.75rem;
	color: var(--ion-color-danger);
`;

export const Banner = styled(IonGrid)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	align-content: center;
	background-color: var(--banner-background);
	color: white;
	padding-top: 2rem;
`;
