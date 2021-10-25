import { theme } from 'src/theme';
import styled, { css } from 'styled-components';

const scrollbars = ({
	size,
	foregroundColor,
	backgroundColor = `linear-gradient(0deg, ${foregroundColor} 0%, white 100%) `,
}: {
	size: string;
	foregroundColor: string;
	backgroundColor: string;
}) => css`
	&::-webkit-scrollbar {
		width: ${size};
		height: ${size};
	}

	&::-webkit-scrollbar-thumb {
		background: ${foregroundColor};
		border-radius: 10px;
	}

	&::-webkit-scrollbar-track {
		background: ${backgroundColor};
		border-radius: 10px;
	}

	//style for Internet Explorer
	& {
		scrollbar-face-color: ${foregroundColor};
		scrollbar-track-color: ${backgroundColor};
	}
`;

export const ChatWrapper = styled.div`
	/* width: 400px; */
	height: 600px;
	background-color: ${theme.colors.grey};
	padding: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const Username = styled.div`
	text-align: start;
	width: 100%;
	h2 {
		font-weight: 300;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		padding-bottom: 1rem;
	}
`;

export const ChatMessage = styled.div`
	height: 70%;
	overflow-y: auto;
	${scrollbars({
		size: '5px',
		foregroundColor: theme.colors.yellow,
		backgroundColor: theme.colors.background,
	})};
	display: flex;
	flex-direction: column;
	width: 100%;
	align-content: flex-start;
`;

export const Message = styled.div`
	margin-left: 0px;
	max-width: 220px;
	padding-left: 0.5rem;

	p {
		font-size: 1rem;
		background-color: #250202;
		padding: 1rem;
		border-radius: 0px 10px 10px 10px;
		font-weight: 300;
		color: #b4b6be;
	}

	span {
		font-size: 0.6rem;
		font-weight: 200;
		color: #b4b6be;
		padding-left: 0.5rem;
	}
`;

export const MessageRight = styled(Message)`
	margin-left: auto;
	margin-right: 0px;
	display: flex;
	flex-direction: column;
	max-width: 220px;
	padding-right: 0.5rem;
	p {
		text-align: end;
		border-radius: 10px 0px 10px 10px;
		background-color: ${theme.colors.red};
		color: white;
	}
	span {
		width: 100%;
		text-align: end;
		padding-left: 0rem;
		padding-right: 0.5rem;
	}
`;

export const SendWrapper = styled.div`
	width: 100%;
	height: 50px;
	display: flex;
`;

export const Input = styled.input`
	width: 80%;
	text-decoration: none;
	background-color: #404450;
	border: none;
	padding-left: 1rem;
	border-radius: 5px 0px 0px 5px;
	&:focus {
		outline: none;
	}
`;
export const Button = styled.button`
	width: 20%;
	border: none;
	background-color: ${theme.colors.yellow};
	border-radius: 0px 5px 5px 0px;
	&:hover {
		cursor: pointer;
	}
`;
