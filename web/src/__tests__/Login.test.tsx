import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

// Mock navigation
const navigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => navigate };
});

// Mock api
const mockApi = vi.fn();
// oxlint-disable-next-line @typescript-eslint/no-explicit-any
vi.mock('@/lib/api', () => ({
  api: (p: string, i: any) => mockApi(p, i),
  ApiError: class ApiError extends Error {},
}));

// Mock auth store
const setToken = vi.fn();
const setUser = vi.fn();
vi.mock('@/store/auth', () => ({ useAuth: () => ({ setToken, setUser }) }));

import { Login } from '@/pages/auth/Login';
import { MemoryRouter } from 'react-router-dom';

test('shows validation errors and submits successfully', async () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>,
  );

  // Try submitting with empty fields
  await userEvent.click(screen.getByRole('button', { name: /Sign in/i }));

  expect(await screen.findByText(/Enter your username or email/i)).toBeTruthy();
  expect(await screen.findByText(/Password must be at least 8 characters/i)).toBeTruthy();

  // Prepare successful api response
  mockApi.mockResolvedValueOnce({
    token: 'tok',
    user: {
      userID: '1',
      username: 'alice',
      avatar: '',
      socketID: '',
      room: 'geoChat',
      preferedDistance: 40,
      geolocation_lat: 1,
      geolocation_lng: 2,
      beSeenBeyondRange: false,
    },
  });

  // Fill form
  await userEvent.type(screen.getByLabelText(/Username or email/i), 'alice');
  await userEvent.type(screen.getByLabelText(/Password/i, { selector: 'input' }), 'password123');
  await userEvent.click(screen.getByRole('button', { name: /Sign in/i }));

  await waitFor(() => expect(mockApi).toHaveBeenCalled());
  expect(setToken).toHaveBeenCalledWith('tok');
  expect(setUser).toHaveBeenCalled();
  expect(navigate).toHaveBeenCalledWith('/home');
});
