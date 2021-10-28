type RouteProps = {
	component: React.FC<{ history: string }>;
	loading?: boolean;
	path: string;
};
