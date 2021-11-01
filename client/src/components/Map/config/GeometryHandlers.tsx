import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { useStore } from 'src/Store';

const GeometryHandlers: React.FC = () => {
	const {
		mapMarking: { setUserMarkings },
	} = useStore();

	const create = ({ layerType, layer }: { layerType: string; layer: any }) => {
		if (layerType === 'polygon') {
			const { _leaflet_id }: { _leaflet_id: number } = layer;
			setUserMarkings((layers: any) => [
				...layers,
				{ id: _leaflet_id, latlngs: layer.getLatLngs()[0] },
			]);
		}
	};
	const edit = ({ layers: { _layers } }: { layers: { _layers: any } }) => {
		Object.values(_layers).map(({ _leaflet_id, editing }: any) =>
			setUserMarkings((layers: any[]) =>
				layers.map((layer: any) =>
					layer.id === _leaflet_id
						? {
								...layer,
								latlngs: { ...editing.latlngs[0] },
						  }
						: layer,
				),
			),
		);
	};
	const del = ({ layers: { _layers } }: { layers: { _layers: any } }) => {
		Object.values(_layers).map(({ _leaflet_id }: any) =>
			setUserMarkings((layers: any[]) =>
				layers.filter((layer: { id: number }) => layer.id !== _leaflet_id),
			),
		);
	};

	return (
		<FeatureGroup>
			<EditControl
				position="topright"
				onCreated={(event: any) => create(event)}
				onEdited={(event: any) => edit(event)}
				onDeleted={(event: any) => del(event)}
				draw={{
					rectangle: false,
					polyline: false,
					circlemarker: false,
					marker: false,
					polygon: false,
				}}
			/>
		</FeatureGroup>
	);
};

export default GeometryHandlers;
