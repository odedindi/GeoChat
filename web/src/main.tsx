import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { router } from '@/routes';
import { ThemeBoot } from '@/store/theme';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeBoot />
    <RouterProvider router={router} />
    <Toaster
      position="top-center"
      richColors
      closeButton
      toastOptions={{ className: 'rounded-xl border-border' }}
    />
  </StrictMode>,
);
