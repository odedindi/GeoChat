import { Redirect, Route } from 'react-router-dom';

const Authed: React.FC<RouteProps> = ({
	component: Component,
	loading,
	path,
}) => {
	const isAuthed = Boolean(localStorage.getItem('token'));
	return (
		<Route
			path={path}
			exact
			render={(props) =>
				loading ? (
					<p>Loading...</p>
				) : isAuthed ? (
					<Component history={props.history as unknown as string} />
				) : (
					<Redirect
						to={{ pathname: '/auth/login', state: { next: props.location } }}
					/>
				)
			}
		/>
	);
};

export default Authed;
