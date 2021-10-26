import styled from 'styled-components';

export const theme = {
	colors: {
		brand: '#E47D31',
		bg: '#fff',
		header: '#0a1f44',
		paragraph: '#343D48',
		anchor: 'darkorchid',
		background: '#282b34',
		red: '#ff1e56',
		yellow: '#ffac41',
		grey: '#2d343e',
		darkOrange: '#d3d3d3',
	},
};

export const MainInput = styled.input`
	height: 3.5rem;
	min-width: 7.5rem;
	width: 80%;

	border: 1px solid ${theme.colors.darkOrange};
	border-radius: 5px;

	-webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

	background: hsla(0, 0%, 100%, 0.2);

	margin-bottom: 1.5rem;
	padding: 16px;
`;

export const MainButton = styled.button<{ disabled?: boolean }>`
	width: 50%;
	padding: 14px 10px;

	background-color: ${({ disabled }) =>
		disabled ? 'gray' : theme.colors.yellow};

	border: none;
	border-radius: 5px;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.2);

	line-height: 1.4em;
	font-size: 1rem;
	min-width: 7.5rem;

	&:hover {
		cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
	}
`;
