import { useEffect } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Mode = 'light' | 'dark' | 'system';

type ThemeState = {
  mode: Mode;
  setMode: (m: Mode) => void;
};

export const useTheme = create<ThemeState>()(
  persist((set) => ({ mode: 'system', setMode: (mode) => set({ mode }) }), {
    name: 'geochat:theme',
  }),
);

function apply(mode: Mode) {
  const root = document.documentElement;
  const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const dark = mode === 'dark' || (mode === 'system' && sysDark);
  root.classList.toggle('dark', dark);
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', dark ? '#0a0a0a' : '#ffffff');
}

/** Mount once near the root to keep <html class="dark"> in sync. */
export function ThemeBoot() {
  const mode = useTheme((s) => s.mode);
  useEffect(() => {
    apply(mode);
    if (mode !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = () => apply('system');
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, [mode]);
  return null;
}
