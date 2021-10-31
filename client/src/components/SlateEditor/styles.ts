import styled from 'styled-components';

export const Mention = styled.span<{ selected: boolean; focused: boolean }>`
	padding: 3px 3px 2px;
	margin: 0 1px;
	vertical-align: baseline;
	display: inline-block;
	border-radius: 4px;
	background-color: #353535;
	color: #fff;
	font-size: 0.9em;
	box-shadow: ${({ selected, focused }) =>
		selected && focused ? '0 0 0 2px #B4D5FF' : 'none'};
`;
