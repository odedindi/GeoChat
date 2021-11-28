import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	padding: 1rem;
	background-color: #282c34;
	color: white;
`;

type UseIsSocketConnected = () => {
	IsConnected: () => JSX.Element;
	isSocketConnected: boolean;
	setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
};
const useIsSocketConnected: UseIsSocketConnected = () => {
	const [isSocketConnected, setIsConnected] = React.useState(false);

	const IsConnected = () => (
		<Container>
			<p>Connected: {'' + isSocketConnected}</p>
		</Container>
	);

	return { IsConnected, isSocketConnected, setIsConnected };
};

export default useIsSocketConnected;
