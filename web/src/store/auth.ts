import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/lib/types';
import { avatarUrl, randomId } from '@/lib/geo';

type AuthState = {
  user: User | null;
  token: string | null;
  setUser: (u: User | null) => void;
  patchUser: (patch: Partial<User>) => void;
  setToken: (t: string | null) => void;
  logout: () => void;
  /** Create a default local user (for the no-auth onboarding path). */
  bootstrapLocalUser: (username: string, coord: { lat: number; lng: number }) => User;
};

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      patchUser: (patch) =>
        set((s) => (s.user ? { user: { ...s.user, ...patch } } : s)),
      setToken: (token) => {
        if (token) localStorage.setItem('token', token);
        else localStorage.removeItem('token');
        set({ token });
      },
      logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null });
      },
      bootstrapLocalUser: (username, coord) => {
        const existing = get().user;
        const userID = existing?.userID || randomId();
        const user: User = {
          userID,
          username,
          avatar: existing?.avatar || avatarUrl(userID),
          socketID: '',
          room: 'geoChat',
          geo: {
            coord,
            preferedDistance: existing?.geo.preferedDistance ?? 40,
          },
          beSeenBeyondRange: existing?.beSeenBeyondRange ?? false,
        };
        set({ user });
        return user;
      },
    }),
    {
      name: 'geochat:auth',
      partialize: (s) => ({ user: s.user, token: s.token }),
    },
  ),
);
