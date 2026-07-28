import { useEffect, useState } from 'react';

export type GeoPosition = {
  lat: number;
  lng: number;
  accuracy: number;
  heading: number | null;
  speed: number | null;
  timestamp: number;
};

type State = { pos: GeoPosition | null; error: string | null; loading: boolean };

/** Continuously watches device geolocation. */
export function usePosition(): State {
  const [state, setState] = useState<State>({ pos: null, error: null, loading: true });

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setState({ pos: null, error: 'Geolocation not supported by this browser.', loading: false });
      return;
    }

    const id = navigator.geolocation.watchPosition(
      (p) =>
        setState({
          loading: false,
          error: null,
          pos: {
            lat: p.coords.latitude,
            lng: p.coords.longitude,
            accuracy: p.coords.accuracy,
            heading: p.coords.heading,
            speed: p.coords.speed,
            timestamp: p.timestamp,
          },
        }),
      (err) => setState((s) => ({ ...s, loading: false, error: humanize(err) })),
      { enableHighAccuracy: true, maximumAge: 5_000, timeout: 30_000 },
    );

    return () => navigator.geolocation.clearWatch(id);
  }, []);

  return state;
}

function humanize(e: GeolocationPositionError) {
  switch (e.code) {
    case 1:
      return 'Location permission denied. Enable it in your browser settings.';
    case 2:
      return 'Location unavailable. Check your device GPS or network.';
    case 3:
      return 'Location request timed out.';
    default:
      return e.message || 'Unknown location error.';
  }
}
