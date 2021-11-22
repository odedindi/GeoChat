import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	padding: 1rem;
	background-color: #282c34;
	color: white;
`;

type UseIsSocketConnected = () => {
	IsConnected: () => JSX.Element;
	setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
};
const useIsSocketConnected: UseIsSocketConnected = () => {
	const [isConnected, setIsConnected] = React.useState(false);

	const IsConnected = () => (
		<Container>
			<p>Connected: {'' + isConnected}</p>
		</Container>
	);

	return { IsConnected, setIsConnected };
};

export default useIsSocketConnected;
