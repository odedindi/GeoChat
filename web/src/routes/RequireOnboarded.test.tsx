import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { RequireOnboarded } from './RequireOnboarded';

vi.mock('../store/auth', () => ({
  useAuth: vi.fn(),
}));

import { useAuth } from '../store/auth';

test('redirects to /auth/login when no token/user', () => {
  useAuth.mockReturnValue({ user: null, token: null });
  const { container } = render(
    <MemoryRouter initialEntries={["/chat"]}>
      <Routes>
        <Route path="/" element={<RequireOnboarded />}>
          <Route path="chat" element={<div>chat</div>} />
        </Route>
        <Route path="/auth/login" element={<div>login</div>} />
      </Routes>
    </MemoryRouter>,
  );
  expect(container).toHaveTextContent('login');
});

test('redirects to /home when token present but no user', () => {
  useAuth.mockReturnValue({ user: null, token: 'tok' });
  const { container } = render(
    <MemoryRouter initialEntries={["/chat"]}>
      <Routes>
        <Route path="/" element={<RequireOnboarded />}>
          <Route path="chat" element={<div>chat</div>} />
        </Route>
        <Route path="/home" element={<div>home</div>} />
      </Routes>
    </MemoryRouter>,
  );
  expect(container).toHaveTextContent('home');
});

test('renders children when user present', () => {
  useAuth.mockReturnValue({ user: { username: 'u', userID: '1' }, token: 'tok' });
  const { container } = render(
    <MemoryRouter initialEntries={["/chat"]}>
      <Routes>
        <Route path="/" element={<RequireOnboarded />}>
          <Route path="chat" element={<div>chat</div>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
  expect(container).toHaveTextContent('chat');
});
