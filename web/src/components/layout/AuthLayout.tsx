import { Outlet, Link } from 'react-router-dom';
import { Logo } from '@/components/ui/Logo';

export function AuthLayout() {
  return (
    <div className="flex min-h-full items-center justify-center bg-bg p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Link to="/home">
            <Logo />
          </Link>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
