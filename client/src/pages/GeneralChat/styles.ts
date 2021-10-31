import { IonButton, IonIcon, IonRow } from '@ionic/react';
import styled from 'styled-components';

export const ChatTitle = styled.p`
	text-align: center;
	color: gray;
`;

export const SendButtun = styled(IonButton)`
	position: relative;
	top: 0.675rem;
	left: 0.728rem;
	--padding-start: -1.5rem;
	--padding-end: 2.5rem;
`;
export const SendIcon = styled(IonIcon)`
	font-size: 2rem;
`;
export const UserInputWrapper = styled(IonRow)`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
`;
