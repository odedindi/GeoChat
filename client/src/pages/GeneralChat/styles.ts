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

export const SideBar = styled.div`
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	width: 17rem;
	overflow-x: hidden;
	background-color: #3f0e40;
	color: white;
`;
export const ChatWindow = styled.div`
	margin-right: 17rem;
`;
