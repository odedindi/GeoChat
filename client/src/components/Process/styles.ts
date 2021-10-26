import styled from 'styled-components';

export const ProcessWapper = styled.div`
	width: 450px;
	min-height: 500px;
	margin-right: 12rem;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	padding: 2rem;
`;

export const Title = styled.h4`
	color: rgb(4, 238, 4);
	font-weight: 400;
`;

export const Content = styled.p`
	margin-top: 0.5rem;
	background-color: rgba(0, 0, 0, 0.4);
	padding: 1.2rem;
	font-size: 1rem;
	border-radius: 5px;
	text-overflow: auto;
`;

export const SecretKey = styled.h5`
	margin-bottom: 5rem;
	font-weight: 400;
	color: rgb(4, 238, 4);
`;
export const Code = styled.span`
	color: yellow;
`;

export const Incoming = styled.div`
	width: 100%;
	margin-bottom: 15rem;
	overflow: auto;
	text-overflow: auto;
`;

export const Crypt = styled.div`
	width: 100%;
	overflow: auto;

	height: 100%;
`;
