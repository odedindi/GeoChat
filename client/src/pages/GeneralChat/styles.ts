import { IonButton, IonCol, IonIcon, IonInput, IonRow } from '@ionic/react';
import styled from 'styled-components';

const Message = styled(IonCol)`
	padding: 1rem 0;
	border-radius: 1rem;
	margin-bottom: 0.3rem;

	color: #fff;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const MsgContentWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
`;
export const AvatarWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: auto;
	justify-content: space-between;
	margin: 0 2rem;
`;

export const ChatTitle = styled.p`
	text-align: center;
	color: gray;
`;
export const CurrentUserMessage = styled(Message)`
	background: var(--ion-color-tertiary-shade);
`;
export const OtherUsersMessage = styled(Message)`
	background: var(--ion-color-secondary-tint);
`;
export const MessageTime = styled.div`
	font-size: 0.75rem;
	text-align: center;
	align-self: center;
	justify-self: flex-end;
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
