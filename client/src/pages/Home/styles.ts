import { MainInput } from 'src/theme';
import styled from 'styled-components';

export const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	padding: 2rem;
	background-color: #2d343e;
	display: flex;
	justify-content: space-evenly;
	flex-direction: column;
	border-radius: 5px;
`;

export const Input = styled(MainInput)`
	&:focus {
		outline: none;
	}
`;

export const Button = styled.button`
	font-size: 1rem;
	padding: 0.5rem 1rem 0.5rem 1rem;
	width: 100px;
	border: none;
	background-color: #ffac41;
	border-radius: 5px;

	color: black;
	&:hover {
		cursor: pointer;
	}
`;
