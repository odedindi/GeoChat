import * as React from 'react';
import { Link } from 'react-router-dom';

import * as S from './styles';

const Login: React.FC = () => {
	const [loading, setLoading] = React.useState(false);
	const [userInput, setInput] = React.useState({
		name: '',
		email: '',
	});
	const [preventSubmit, setPreventSubmit] = React.useState(true);

	React.useEffect(() => {
		if (!userInput.name.length || !userInput.email.length || loading)
			setPreventSubmit(true);

		if (userInput.name && userInput.email && !loading) setPreventSubmit(false);
	}, [loading, userInput]);

	const initStream = async () => {
		setLoading(true);

		const url = '';
		const body = {
			name: userInput.name,
			email: userInput.email,
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
				<h6>Don't have an account yet?</h6>
				<Link to="/auth/signup">Signup</Link>
			</S.CardHeader>
			<S.Card>
				<S.CardTitle>GeoChating Login</S.CardTitle>
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
				<S.CardHeader>
					<Link to="/auth/restorepassword">Forgot your password?</Link>
				</S.CardHeader>
				<S.Button disabled={preventSubmit} onClick={initStream}>
					Submit
				</S.Button>
			</S.Card>
		</S.CardWrapper>
	);
};

export default Login;
