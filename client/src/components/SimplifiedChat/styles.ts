import { IonInput } from '@ionic/react';
import styled from 'styled-components';

export const Form = styled.form`
	width: 100%;
`;
export const Input = styled(IonInput)`
	width: 100%;
	padding: 0.5rem;
`;

export const MessageList = styled.div`
	width: 100%;
`;

export const Message = styled.div`
	display: flex;
	flex-direction: row;
	padding: 0.5rem;
	border-bottom: 1px solid #eeeeee;
	align-items: center;
`;
export const From = styled.span`
	min-width: 80px;
`;
export const Content = styled.span`
	min-width: 80px;
	flex-grow: 1;
`;
export const Date = styled(From)`
	font-size: 0.625rem;
	color: #888888;
`;
