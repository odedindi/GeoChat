import { IonAvatar } from '@ionic/react';
import styled from 'styled-components';

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
