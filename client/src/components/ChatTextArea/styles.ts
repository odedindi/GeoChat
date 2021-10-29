import styled from 'styled-components';

export const Mention = styled.span<{ selected: boolean; focused: boolean }>`
	padding: 3px 3px 2px;
	margin: 0 1px;
	vertical-align: baseline;
	display: inline-block;
	border-radius: 4px;
	background-color: #eee;
	font-size: 0.9em;
	box-shadow: ${({ selected, focused }) =>
		selected && focused ? '0 0 0 2px #B4D5FF' : 'none'};
`;

export const MentionableUsersWrapper = styled.div`
	top: -9999px;
	left: -9999px;
	position: absolute;
	z-index: 1;
	padding: 3px;
	background: white;
	border-radius: 4px;
	box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
`;
export const MentionableUsers = styled.div<{ transparent: boolean }>`
	padding: 1px 3px;
	border-radius: 3px;
	background: ${({ transparent }) => (transparent ? '#B4D5FF' : 'transparent')};
`;
