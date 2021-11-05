import type L from 'leaflet';
import * as React from 'react';

export const useMapCenter = (): {
	mapCenter: L.Map;
	setMapCenter: React.Dispatch<React.SetStateAction<L.Map>>;
} => {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const [mapCenter, setMapCenter] = React.useState<L.Map>(undefined!);

	return { mapCenter, setMapCenter };
};

export default useMapCenter;
