import { Navigate, Outlet } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { useAuth } from '@/store/auth';

/**
 * Gate chat/map/settings behind auth + onboarding. If there's no token the
 * user should sign in. If there's a token but no `user` object yet, send to
 * `/home` to complete onboarding/local bootstrap.
 */
export function RequireOnboarded() {
  const { user, token } = useAuth(useShallow((s) => ({ user: s.user, token: s.token })));
  if (!token && !user) return <Navigate to="/auth/login" replace />;
  if (!user) return <Navigate to="/home" replace />;
  return <Outlet />;
}
