import { Editable as SlateEditable } from 'slate-react';
import styled from 'styled-components';

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

export const Editable = styled(SlateEditable)`
	border: 1px solid var(--ion-color-medium);
	min-height: 4rem;
	max-height: 9rem;
	height: auto !important;
	overflow: scroll;
	overflow-x: hidden;
	width: 85vw;
	font-size: 1.125rem;
	padding: 0 2rem;
`;
