import { IonCol } from '@ionic/react';
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
