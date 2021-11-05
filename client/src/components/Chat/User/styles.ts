import styled from 'styled-components';

export const User = styled.div<{ selected: boolean }>`
	background-color: ${({ selected }) => (selected ? '#1164a3' : '')};
	padding: 0.65rem;
`;
export const Description = styled.div`
	display: inline-block;
`;
export const Name = styled.div``;
export const Status = styled.div`
	color: #92959e;
`;
export const NewMessages = styled.div`
	color: white;
	background-color: red;
	width: 20px;
	border-radius: 5px;
	text-align: center;
	float: right;
	margin-top: 10px;
`;

export const Icon = styled.i`
	height: 8px;
	width: 8px;
	border-radius: 50%;
	display: inline-block;
	background-color: #e38968;
	margin-right: 6px;
`;
export const ConnectedIcon = styled(Icon)`
	background-color: #86bb71;
`;
