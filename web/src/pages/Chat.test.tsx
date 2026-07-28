import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { Chat } from './Chat';

// Mock hooks
const handlers: Record<string, Function> = {};
const mockSocket = {
  on: (ev: string, fn: Function) => { handlers[ev] = fn; },
  off: vi.fn(),
  emit: vi.fn(),
  id: 'socket-1',
  connected: true,
};

vi.mock('@/hooks/useSocket', () => ({
  useSocket: () => ({ socket: mockSocket, connected: true }),
}));

vi.mock('@/store/auth', () => ({
  useAuth: () => ({ user: { username: 'me', userID: '1', avatar: '', socketID: '', room: 'geoChat', geo: { coord: { lat: 0, lng: 0 }, preferedDistance: 10 }, beSeenBeyondRange: false }, patchUser: vi.fn() }),
}));

vi.mock('@/hooks/usePosition', () => ({ usePosition: () => ({ pos: { lat: 0, lng: 0 } }) }));

test('enables composer after joined event', async () => {
  render(<Chat />);
  const btn = await screen.findByRole('button', { name: /Send message/i });
  // initially disabled because not joined
  expect(btn).toBeDisabled();

  // simulate server 'joined' event
  // wait until the component registers the 'joined' handler
  await waitFor(() => expect(handlers['joined']).toBeDefined());
  act(() => {
    handlers['joined']();
  });

  // fill textarea so the send button can enable
  const ta = screen.getByPlaceholderText('Message nearby people…');
  await userEvent.type(ta, 'hello');

  // button should become enabled (wait for state update)
  await waitFor(() => expect(btn).not.toBeDisabled());
});
