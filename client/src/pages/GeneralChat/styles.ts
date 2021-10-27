import { IonButton, IonIcon, IonInput, IonRow } from '@ionic/react';
import styled from 'styled-components';

export const ChatTitle = styled.p`
	text-align: center;
	color: gray;
`;

export const ChatInputField = styled(IonInput)`
	border: 1px solid var(--ion-color-medium);
	border-radius: 1rem;
	height: 4rem;
	width: 95vw;
	font-size: 1.25rem;
	padding: 0.5rem 2rem; ;
`;
export const SendButtun = styled(IonButton)`
	position: relative;
	top: 0.675rem;
	/* right: .728rem; */
	--padding-start: -1.5rem;
	--padding-end: 2.5rem;
`;
export const SendIcon = styled(IonIcon)`
	font-size: 2rem;
`;
export const UserInputWrapper = styled(IonRow)`
	display: flex;
	justify-content: space-around;
`;
