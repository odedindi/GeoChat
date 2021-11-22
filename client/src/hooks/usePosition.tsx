import * as React from 'react';

const useGeoLocation = (
	watch = false,
	userSettings = {},
): { position: Position | null; error: string | null } => {
	const defaultSettings = React.useMemo(
		() => ({
			enableHighAccuracy: false,
			timeout: Infinity,
			maximumAge: 5,
		}),
		[],
	);

	const settings = React.useMemo(
		() => ({
			...defaultSettings,
			...userSettings,
		}),
		[defaultSettings, userSettings],
	);

	const [position, setPosition] = React.useState<Position | null>(null);
	const [error, setError] = React.useState<string | null>(null);

	const onChange: PositionCallback = ({
		coords: { latitude, longitude, accuracy, speed, heading },
		timestamp,
	}) => {
		setPosition({
			latitude,
			longitude,
			accuracy,
			speed,
			heading,
			timestamp,
		});
	};

	const onError: PositionErrorCallback = (error) => setError(error.message);

	React.useEffect(() => {
		if (!navigator || !navigator.geolocation) {
			setError('Geolocation is not supported');
			return;
		}
		if (watch) {
			const watcher = navigator.geolocation.watchPosition(
				onChange,
				onError,
				settings,
			);
			return () => navigator.geolocation.clearWatch(watcher);
		}
		navigator.geolocation.getCurrentPosition(onChange, onError, settings);
	}, [settings, watch]);

	return { position, error };
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const positionContext = React.createContext<PositionContext>(undefined!);
const { Provider } = positionContext;

export const PositionProvider: React.FC = ({ children }) => {
	const { position, error } = useGeoLocation(true, {
		enableHighAccuracy: true,
	});

	const [geoPos, setGeoPos] = React.useState<Position | null>(null);
	const [geoPosError, setGeoPosError] = React.useState<string | null>(null);

	React.useEffect(() => {
		if (!position && !error) setGeoPosError('Trying to fetch location...');
		if (error) setGeoPosError(error);
		if (position) {
			setGeoPosError(null);
			setGeoPos(position);
		}
	}, [error, position]);

	return <Provider value={{ geoPos, geoPosError }}>{children}</Provider>;
};

const usePosition = (): PositionContext => React.useContext(positionContext);

export default usePosition;
