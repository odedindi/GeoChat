import { theme } from 'src/theme';
import styled from 'styled-components';

export const ChatAppWrapper = styled.div`
	width: 100%;
	height: 100%;
	background-color: ${theme.colors.background};
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	align-items: center;
`;
export const Left = styled.div`
	flex: 1;
`;
export const Right = styled.div`
	flex: 2;
`;
