import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

// Mock react-leaflet components used by the page
vi.mock('react-leaflet', () => ({
  // oxlint-disable-next-line @typescript-eslint/no-explicit-any
  MapContainer: ({ children }: any) => <div data-testid="map">{children}</div>,
  TileLayer: () => <div />,
  Circle: () => <div />,
  CircleMarker: () => <div />,
  // oxlint-disable-next-line @typescript-eslint/no-explicit-any
  Marker: ({ children }: any) => <div>{children}</div>,
  // oxlint-disable-next-line @typescript-eslint/no-explicit-any
  Popup: ({ children }: any) => <div>{children}</div>,
  useMap: () => ({ flyTo: () => {}, getZoom: () => 13 }),
}));

vi.mock('@/hooks/usePosition', () => ({ usePosition: () => ({ pos: { lat: 1, lng: 2 } }) }));
vi.mock('@/hooks/useSocket', () => ({
  useSocket: () => ({
    socket: { on: vi.fn(), off: vi.fn(), emit: vi.fn(), id: 's1' },
    connected: true,
  }),
}));
vi.mock('@/store/auth', () => ({
  useAuth: () => ({
    user: {
      userID: '1',
      username: 'u',
      avatar: '',
      socketID: '',
      room: 'geoChat',
      geo: { coord: { lat: 1, lng: 2 }, preferedDistance: 10 },
      beSeenBeyondRange: false,
    },
  }),
}));

import { MapPage } from '@/pages/Map';

test('renders map and message counter', () => {
  render(<MapPage />);
  expect(screen.getByTestId('map')).toBeTruthy();
  expect(screen.getByText(/messages within/i)).toBeTruthy();
});
