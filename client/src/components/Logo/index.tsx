import * as S from './styles';

const Logo: React.FC = () => (
	<>
		<S.LogoWrapper>
			<S.Logo src="assets/beacon.png" alt="App's Logo" />
		</S.LogoWrapper>
		<S.Title>Beacon Geo Chat</S.Title>
	</>
);

export default Logo;
