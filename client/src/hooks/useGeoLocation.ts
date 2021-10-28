import * as React from 'react';

type Success = {
	(position: { coords: { latitude: number; longitude: number } }): void;
};
type Error = { (): void };

type UseGeoLocation = {
	(): {
		geoLocation: string | GeoCoord | null;
		getGeoLocation: () => void;
	};
};
export const useGeoLocation: UseGeoLocation = () => {
	const [geoLocation, setGeoLocation] = React.useState<
		string | GeoCoord | null
	>(null);
	const getGeoLocation = () => {
		if (!navigator.geolocation) {
			setGeoLocation('Geolocation is not supported');
		}

		const success: Success = ({ coords: { latitude, longitude } }) =>
			setGeoLocation({
				lat: latitude,
				lng: longitude,
			});

		const error: Error = () => setGeoLocation('Unable to retrieve location');

		navigator.geolocation.getCurrentPosition(success, error);
	};

	return { geoLocation, getGeoLocation };
};

export default useGeoLocation;
