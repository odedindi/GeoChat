import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Home, MessageSquare, Map as MapIcon, Settings as SettingsIcon } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { cn } from '@/lib/cn';
import { useAuth } from '@/store/auth';
import { Avatar } from '@/components/ui/Avatar';

const navItems = [
  { to: '/home', label: 'Home', icon: Home },
  { to: '/chat', label: 'Chat', icon: MessageSquare },
  { to: '/map', label: 'Map', icon: MapIcon },
  { to: '/settings', label: 'Settings', icon: SettingsIcon },
];

export function AppShell() {
  const { user } = useAuth();
  const loc = useLocation();
  const onChat = loc.pathname.startsWith('/chat') || loc.pathname.startsWith('/map');

  return (
    <div className="flex h-full w-full bg-bg text-fg">
      {/* Desktop sidebar */}
      <aside className="hidden h-full w-60 shrink-0 flex-col border-r border-border bg-bg-elevated/40 p-4 md:flex">
        <div className="px-2 py-1">
          <Logo />
        </div>
        <nav className="mt-6 flex flex-col gap-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-brand/10 text-brand'
                    : 'text-fg-muted hover:bg-bg-elevated hover:text-fg',
                )
              }
            >
              <Icon className="size-4" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto">
          {user ? (
            <div className="flex items-center gap-3 rounded-lg border border-border bg-bg p-3">
              <Avatar src={user.avatar} alt={user.username} size={36} />
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">{user.username}</div>
                <div className="truncate text-xs text-fg-subtle">
                  {user.geo.preferedDistance} km radius
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </aside>

      {/* Main */}
      <main className={cn('flex h-full min-w-0 flex-1 flex-col', onChat && 'overflow-hidden')}>
        <Outlet />
      </main>

      {/* Mobile bottom nav */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-bg-elevated/95 backdrop-blur md:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium transition-colors',
                isActive ? 'text-brand' : 'text-fg-muted',
              )
            }
          >
            <Icon className="size-5" />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
