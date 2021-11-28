import { MainButton } from 'src/theme';
import styled from 'styled-components';

export const Form = styled.div`
	display: flex;
	border-top: 2px solid #d3d3d3;

	.inputField {
		border: none;
		width: 80%;
		min-height: 3.5rem;
		max-height: 6rem;
		font-size: 1.2em;
		background: white;
		*:focus {
			outline: none;
		}
	}

	.inputField__suggestions__list {
		background-color: white;
		border-radius: 0.25rem;
		width: 99vw;
		position: relative;
		right: 0.25rem;
	}

	.inputField__suggestions__item {
		padding: 5px 15px;
		border-bottom: 1px solid #eeeeee;
	}
	.inputField__suggestions__item--focused {
		background-color: var(--ion-color-light-shade);
		border-radius: 0.25rem;
	}

	/* .mention { */
	/* background: var(--ion-color-secondary-shade); */
	/* background: var(--ion-color-light-shade); */
	/* padding: 0 0.125rem; */
	/* }  */
`;
export const Input = styled.input`
	border: none;
	border-radius: 0;
	padding: 1rem;
	width: 80%;
	font-size: 1.2em;

	:focus {
		outline: none;
	}
`;
export const SendButton = styled(MainButton)`
	text-transform: uppercase;
	width: 20%;
`;

export const MessageList = styled.div`
	width: 100%;
`;

export const MessageContainer = styled.div<{ outgoingMessage: boolean }>`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0.75rem;
	margin-top: 0.25rem;
	justify-content: ${({ outgoingMessage }) =>
		outgoingMessage ? 'flex-end' : 'flex-start'};
`;

export const ContentContainer = styled.span<{ outgoingMessage: boolean }>`
	border-radius: 1.25rem;
	min-width: 7.5rem;
	padding: 0.725rem 1.75rem 0 2.25rem;
	background: ${({ outgoingMessage }) =>
		outgoingMessage
			? 'var(--outgoing-message-background)'
			: 'var(--incoming-message-background)'};
`;

export const From = styled.p`
	position: relative;
	top: -1.175rem;
	right: 1.175rem;
	font-weight: bold;
`;
export const Content = styled.p`
	font-size: 1.125em;
	word-wrap: break-word;
`;

export const Date = styled.span`
	font-size: 0.65rem;
	color: #888888;
	position: relative;
	bottom: 0.25rem;
	right: 1.175rem;
`;
