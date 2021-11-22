interface Position {
	latitude: number;
	longitude: number;
	accuracy: number;
	speed: number | null;
	heading: number | null;
	timestamp: number;
}

interface PositionContext {
	geoPos: Position | null;
	geoPosError: string | null;
}
