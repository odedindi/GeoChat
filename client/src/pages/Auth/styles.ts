import styled from 'styled-components';

import { MainButton, MainInput } from '../../theme';

export const CardWrapper = styled.div`
	text-align: center;
`;

export const CardHeader = styled.div`
	display: flex;
	flex-flow: row wrap;
	align-items: baseline;
	justify-content: space-around;
	padding: 1.25rem;
`;
export const Card = styled.div`
	position: fixed;
	top: 25%;
	left: calc(-50vw + 50%);
	right: calc(-50vw + 50%);
	margin-left: auto;
	margin-right: auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const CardTitle = styled.h4`
	padding-bottom: 1.25rem;
`;
export const Input = styled(MainInput)``;

export const Button = styled(MainButton)`
	min-width: 7.5rem;
	&:hover {
		cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
	}
`;
