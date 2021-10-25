import * as React from 'react';
import { Link } from 'react-router-dom';

import * as S from './styles';

const Signup: React.FC = () => {
	const [loading, setLoading] = React.useState(false);
	const [userInput, setInput] = React.useState({
		name: '',
		email: '',
		password: '',
		passwordRepeat: '',
	});
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

	const initStream = async () => {
		setLoading(true);

		const url = '';
		const body = {
			name: userInput.name,
			email: userInput.email,
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

	const inputChangeHandler = ({ name, value }: HTMLInputElement) =>
		setInput((prev) => ({ ...prev, [name]: value }));

	return (
		<S.CardWrapper>
			<S.CardHeader>
				<h6>Already got an account?</h6>
				<Link to="/auth/login">Login</Link>
			</S.CardHeader>
			<S.Card>
				<S.CardTitle>GeoChating Signup</S.CardTitle>
				<S.Input
					type="text"
					placeholder="Name"
					name="name"
					onChange={({ target }) => inputChangeHandler(target)}
				/>
				<S.Input
					type="email"
					placeholder="Email"
					name="email"
					onChange={({ target }) => inputChangeHandler(target)}
				/>
				<S.Input
					type="password"
					placeholder="Password"
					name="password"
					onChange={({ target }) => inputChangeHandler(target)}
				/>
				<S.Input
					type="password"
					placeholder="Password"
					name="passwordRepeat"
					disabled={!userInput.password.length}
					onChange={({ target }) => inputChangeHandler(target)}
				/>
				{errorMsg && <S.CardTitle>{errorMsg}</S.CardTitle>}
				<S.Button disabled={preventSubmit} onClick={initStream}>
					Submit
				</S.Button>
			</S.Card>
		</S.CardWrapper>
	);
};

export default Signup;
