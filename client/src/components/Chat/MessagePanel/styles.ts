import styled from 'styled-components';

export const Header = styled.div`
	line-height: 40px;
	padding: 10px 20px;
	border-bottom: 1px solid #dddddd;
`;
export const Messages = styled.ul`
	margin: 0;
	padding: 20px;
`;
export const Message = styled.li`
	list-style: none;
`;
export const Sender = styled.div`
	font-weight: bold;
	margin-top: 5px;
`;
export const Form = styled.div`
	padding: 10px;
`;
export const Input = styled.input`
	width: 80%;
	resize: none;
	padding: 10px;
	line-height: 1.5;
	border-radius: 5px;
	border: 1px solid #000;
`;
export const SendBtn = styled.button`
	vertical-align: top;
`;
