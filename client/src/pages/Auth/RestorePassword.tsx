import * as React from 'react';
import { useKeyboardListener } from 'src/hooks/useKeyboardListener';

import * as S from './styles';

const RestorePassword: React.FC = () => {
	const [loading, setLoading] = React.useState(false);
	const [userInput, setInput] = React.useState({ email: '' });
	const [preventSubmit, setPreventSubmit] = React.useState(true);

	React.useEffect(() => {
		if (!loading && userInput.email.length) {
			setPreventSubmit(false);
		} else {
			setPreventSubmit(true);
		}
	}, [loading, userInput]);

	const initStream = async () => {
		setLoading(true);

		const url = '';
		const body = { email: userInput.email };
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

	useKeyboardListener(initStream, 'Enter');

	const inputChangeHandler = ({ name, value }: HTMLInputElement) =>
		setInput((prev) => ({ ...prev, [name]: value }));

	return (
		<S.CardWrapper>
			<S.Card>
				<S.CardTitle>GeoChating Restore Password</S.CardTitle>
				<h5>Fill in your email address and we will send you a new password</h5>
				<S.Input
					type="email"
					placeholder="Email"
					name="email"
					onChange={({ target }) => inputChangeHandler(target)}
				/>
				<S.Button disabled={preventSubmit} onClick={initStream}>
					Submit
				</S.Button>
			</S.Card>
		</S.CardWrapper>
	);
};

export default RestorePassword;
