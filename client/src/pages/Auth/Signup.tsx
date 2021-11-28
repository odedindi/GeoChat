import { IonContent, IonHeader, IonIcon, IonPage } from '@ionic/react';
import * as I from 'ionicons/icons';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { useKeyboardListener } from 'src/hooks/useKeyboardListener';

import * as S from './styles';

const Signup: React.FC = () => {
	const [loading, setLoading] = React.useState(false);
	const [userInput, setInput] = React.useState({
		name: '',
		email: '',
		password: '',
		passwordRepeat: '',
	});
	const [showPassword, setShowPassword] = React.useState(false);
	const showUnshowPassword = () => setShowPassword(!showPassword);

	const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
	const [preventSubmit, setPreventSubmit] = React.useState(true);

	React.useEffect(() => {
		if (
			!loading &&
			userInput.name.length &&
			userInput.email.length &&
			userInput.password.length &&
			userInput.passwordRepeat.length &&
			userInput.password === userInput.passwordRepeat
		) {
			setErrorMsg(null);
			setPreventSubmit(false);
		} else {
			setPreventSubmit(true);
		}
	}, [loading, userInput]);
	React.useEffect(() => {
		if (
			userInput.passwordRepeat.length &&
			userInput.password !== userInput.passwordRepeat
		) {
			setPreventSubmit(true);
			setErrorMsg('Passwords must match!');
		}
	}, [userInput]);

	const handleSubmit = React.useCallback(async () => {
		setLoading(true);
		const { name, email, password } = userInput;
		const url = '';
		const body = {
			name: name,
			email: email,
			password: password,
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
	}, [userInput]);

	useKeyboardListener(handleSubmit, 'Enter');

	const inputChangeHandler = ({ name, value }: HTMLInputElement) =>
		setInput((prev) => ({ ...prev, [name]: value }));

	return (
		<IonPage>
			<IonHeader>
				<S.CardHeader>
					<h6>Already got an account?</h6>
					<Link to="/auth/login">Login</Link>
				</S.CardHeader>
			</IonHeader>
			<IonContent fullscreen={true} scrollEvents={true}>
				<S.CardWrapper>
					<S.Card>
						<S.CardTitle>GeoChating Signup</S.CardTitle>
						<S.Input
							type="text"
							placeholder="Full Name"
							name="name"
							value={userInput.name}
							onChange={({ target }) => inputChangeHandler(target)}
						/>
						<S.Input
							type="email"
							placeholder="E-mail"
							name="email"
							value={userInput.email}
							onChange={({ target }) => inputChangeHandler(target)}
						/>
						<S.Input
							type={showPassword ? 'text' : 'password'}
							placeholder="Password"
							name="password"
							value={userInput.password}
							onChange={({ target }) => inputChangeHandler(target)}
						/>
						<S.Input
							type={showPassword ? 'text' : 'password'}
							placeholder="Password Repeat"
							name="passwordRepeat"
							disabled={!userInput.password.length}
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
							{showPassword ? (
								<IonIcon icon={I.eye} />
							) : (
								<IonIcon icon={I.eyeOff} />
							)}
						</S.ShowUnshowButton>
						{errorMsg && <S.CardTitle>{errorMsg}</S.CardTitle>}
						<S.Button disabled={preventSubmit} onClick={handleSubmit}>
							Submit
						</S.Button>
					</S.Card>
				</S.CardWrapper>
			</IonContent>
		</IonPage>
	);
};

export default Signup;
