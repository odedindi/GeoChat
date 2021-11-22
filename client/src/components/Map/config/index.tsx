import * as React from 'react';
import { ScaleControl } from 'react-leaflet';

import RefreshMap from './RefreshMap';
import Tiles from './tiles';

const MapConfig: React.FC = () => {
	const [allowLayers] = React.useState(
		false,
		// process.env.NODE_ENV === 'development' ? true : false,
	);
	return (
		<>
			<RefreshMap />
			<ScaleControl />
			<Tiles allowLayers={allowLayers} />
		</>
	);
};
export default MapConfig;
