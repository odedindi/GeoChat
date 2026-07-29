import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

const patchUser = vi.fn();
const logout = vi.fn();
vi.mock('@/store/auth', () => ({
  useAuth: () => ({
    user: {
      userID: '1',
      username: 'me',
      avatar: 'a.png',
      socketID: '',
      room: 'geoChat',
      geo: { coord: { lat: 0, lng: 0 }, preferedDistance: 40 },
      beSeenBeyondRange: false,
    },
    patchUser,
    logout,
  }),
}));
vi.mock('@/store/theme', () => ({ useTheme: () => ({ mode: 'light', setMode: vi.fn() }) }));

import { Settings } from '@/pages/Settings';
import { MemoryRouter } from 'react-router-dom';

test('renders settings and saves changes', async () => {
  render(
    <MemoryRouter>
      <Settings />
    </MemoryRouter>,
  );
  const input = screen.getByLabelText(/Display name/i);
  await userEvent.clear(input);
  await userEvent.type(input, 'newname');
  const save = screen.getByRole('button', { name: /Save changes/i });
  await userEvent.click(save);
  expect(patchUser).toHaveBeenCalled();
});
