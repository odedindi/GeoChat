import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

const navigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => navigate };
});

const mockApi = vi.fn();
// oxlint-disable-next-line @typescript-eslint/no-explicit-any
vi.mock('@/lib/api', () => ({
  api: (p: string, i: any) => mockApi(p, i),
  ApiError: class ApiError extends Error {},
}));

const setToken = vi.fn();
const setUser = vi.fn();
vi.mock('@/store/auth', () => ({ useAuth: () => ({ setToken, setUser }) }));

import { Signup } from '@/pages/auth/Signup';
import { MemoryRouter } from 'react-router-dom';

test('validates and registers user', async () => {
  render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>,
  );

  await userEvent.click(screen.getByRole('button', { name: /Create account/i }));

  expect(await screen.findByText(/Please choose a username/i)).toBeTruthy();

  mockApi.mockResolvedValueOnce({
    token: 'newtok',
    user: {
      userID: '2',
      username: 'bob',
      avatar: '',
      socketID: '',
      room: 'geoChat',
      preferedDistance: 40,
      geolocation_lat: 0,
      geolocation_lng: 0,
      beSeenBeyondRange: false,
    },
  });

  await userEvent.type(screen.getByLabelText(/Username/i), 'bob');
  await userEvent.type(screen.getByLabelText(/Email/i), 'bob@example.com');
  await userEvent.type(screen.getByLabelText(/^Password$/i), 'password123');
  await userEvent.type(screen.getByLabelText(/Confirm/i), 'password123');
  await userEvent.click(screen.getByRole('button', { name: /Create account/i }));

  await waitFor(() => expect(mockApi).toHaveBeenCalled());
  expect(setToken).toHaveBeenCalledWith('newtok');
  expect(setUser).toHaveBeenCalled();
  expect(navigate).toHaveBeenCalledWith('/home');
});
