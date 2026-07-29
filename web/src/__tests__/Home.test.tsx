import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

const mockBootstrap = vi.fn();
const navigate = vi.fn();

vi.mock('@/hooks/usePosition', () => ({
  usePosition: () => ({ pos: { lat: 10, lng: 20 }, error: null, loading: false }),
}));
vi.mock('@/store/auth', () => ({
  useAuth: () => ({ user: null, bootstrapLocalUser: mockBootstrap, patchUser: vi.fn() }),
}));
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => navigate };
});

import { Home } from '@/pages/Home';

test('creates local user and navigates to chat', async () => {
  render(<Home />);

  const input = screen.getByLabelText(/Display name/i);
  await userEvent.type(input, 'localuser');

  const btn = screen.getByRole('button', { name: /Enter chat/i });
  await userEvent.click(btn);

  expect(mockBootstrap).toHaveBeenCalledWith('localuser', { lat: 10, lng: 20 });
  expect(navigate).toHaveBeenCalledWith('/chat');
});
