import { IonContent, IonIcon, IonPage } from '@ionic/react';
import * as I from 'ionicons/icons';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { useKeyboardListener } from 'src/hooks/useKeyboardListener';

import * as S from './styles';

const Login: React.FC = () => {
	const [loading, setLoading] = React.useState(false);
	const [userInput, setInput] = React.useState({
		username: '',
		password: '',
	});
	const [showPassword, setShowPassword] = React.useState(false);
	const showUnshowPassword = () => setShowPassword(!showPassword);
	const [preventSubmit, setPreventSubmit] = React.useState(true);

	React.useEffect(() => {
		if (!userInput.username.length || !userInput.password.length || loading)
			setPreventSubmit(true);

		if (userInput.username && userInput.password && !loading)
			setPreventSubmit(false);
	}, [loading, userInput]);

	const handleSubmit = async () => {
		setLoading(true);

		const url = '';
		const body = {
			username: userInput.username,
			password: userInput.password,
		};
		const config = {
			method: 'POST',
			headers: new Headers({
				'Content-type': 'application/json',
			}),
			body: JSON.stringify(body),
		};

		console.log('start fetch');
		const response = await fetch(url, config);
		const data = await response.json();
		console.log(data);

		setLoading(false);
	};

	useKeyboardListener(handleSubmit, 'Enter');

	const inputChangeHandler = ({ name, value }: HTMLInputElement) =>
		setInput((prev) => ({ ...prev, [name]: value }));

	return (
		<IonPage>
			<IonContent fullscreen={true} scrollEvents={true}>
				<S.CardHeader>
					<h6>Don't have an account yet?</h6>
					<Link to="/auth/signup">Signup</Link>
				</S.CardHeader>
				<S.CardWrapper>
					<S.Card>
						<S.CardTitle>Beacon Login</S.CardTitle>
						<S.Input
							type="text"
							placeholder="Username"
							name="username"
							value={userInput.username}
							onChange={({ target }) => inputChangeHandler(target)}
						/>
						<S.Input
							type={showPassword ? 'text' : 'password'}
							placeholder="Password"
							name="password"
							value={userInput.password}
							onChange={({ target }) => inputChangeHandler(target)}
						/>

						<S.ShowUnshowButton
							onClick={showUnshowPassword}
							fill="clear"
							slot="icon-only"
							shape="round"
							color="dark"
							size="large"
						>
							{!showPassword ? (
								<IonIcon icon={I.eye} />
							) : (
								<IonIcon icon={I.eyeOff} />
							)}
						</S.ShowUnshowButton>

						<S.CardHeader>
							<Link to="/auth/restorepassword">
								Forgot your username or password?
							</Link>
						</S.CardHeader>
						<S.Button disabled={preventSubmit} onClick={handleSubmit}>
							Submit
						</S.Button>
					</S.Card>
				</S.CardWrapper>
			</IonContent>
		</IonPage>
	);
};

export default Login;
