/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type L from 'leaflet';
import * as React from 'react';

interface MapCenterContext {
	mapCenter: L.Map;
	setMapCenter: React.Dispatch<React.SetStateAction<L.Map>>;
}

const mapCenterContext = React.createContext<MapCenterContext>(undefined!);
const { Provider } = mapCenterContext;

export const MapCenterProvider: React.FC = ({ children }) => {
	const [mapCenter, setMapCenter] = React.useState<L.Map>(undefined!);

	return <Provider value={{ mapCenter, setMapCenter }}>{children}</Provider>;
};

const useMapCenter = (): MapCenterContext => React.useContext(mapCenterContext);

export default useMapCenter;
