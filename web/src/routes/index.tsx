import { Suspense, lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { Home } from '@/pages/Home';
const Chat = lazy(() => import('@/pages/Chat').then((m) => ({ default: (m as any).Chat })));
const MapPage = lazy(() => import('@/pages/Map').then((m) => ({ default: (m as any).MapPage })));
import { Settings } from '@/pages/Settings';
import { Login } from '@/pages/auth/Login';
import { Signup } from '@/pages/auth/Signup';
import { Forgot } from '@/pages/auth/Forgot';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { RequireOnboarded } from '@/routes/RequireOnboarded';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: 'home', element: <Home /> },
      {
        element: <RequireOnboarded />,
        children: [
          {
            path: 'chat',
            element: (
              <Suspense fallback={<div className="p-6 text-center">Loading chat…</div>}>
                <Chat />
              </Suspense>
            ),
          },
          {
            path: 'map',
            element: (
              <Suspense fallback={<div className="p-6 text-center">Loading map…</div>}>
                <MapPage />
              </Suspense>
            ),
          },
          { path: 'settings', element: <Settings /> },
        ],
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { index: true, element: <Navigate to="/auth/login" replace /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      { path: 'forgot', element: <Forgot /> },
    ],
  },
  { path: '*', element: <Navigate to="/home" replace /> },
]);
