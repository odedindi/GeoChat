import { IonRange } from '@ionic/react';
import * as React from 'react';
import { ScaleControl } from 'react-leaflet';
import styled from 'styled-components';

import GeometryHandlers from './GeometryHandlers';
import RefreshMap from './RefreshMap';
import Tiles from './tiles';

const MapConfig: React.FC = () => {
	const [allowLayers] = React.useState(
		process.env.NODE_ENV === 'development' ? true : false,
	);
	const [allowDrawing] = React.useState(
		process.env.NODE_ENV === 'development' ? true : false,
	);
	return (
		<>
			{allowDrawing && <GeometryHandlers />}
			<RefreshMap />
			<ScaleControl />
			<Tiles allowLayers={allowLayers} />
		</>
	);
};
export default MapConfig;
