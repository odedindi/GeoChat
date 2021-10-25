import { Redirect, Route } from 'react-router-dom';

const UnAuthed: React.FC<RouteProps> = ({
	component: Component,
	loading,
	path,
}) => {
	const isAuthed = Boolean(localStorage.getItem('token'));
	return (
		<Route
			path={path}
			render={(props) =>
				loading ? (
					<p>Loading...</p>
				) : !isAuthed ? (
					<Component history={props.history as unknown as string} />
				) : (
					<Redirect to={{ pathname: '/' }} />
				)
			}
		/>
	);
};

export default UnAuthed;
