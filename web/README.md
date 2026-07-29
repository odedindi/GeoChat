# GeoChat — Web (modern rewrite)

The new client. Vite + React 19 + TypeScript 5 + Tailwind v4, with React Router 7,
Zustand, Socket.IO, Leaflet, react-hook-form, zod, Framer Motion and a PWA shell.

## Quick start

```bash
cd web
npm install
cp .env.example .env       # adjust VITE_SERVER_URL if backend is elsewhere
yarn dev                # http://localhost:5180 (proxies /api + /socket.io to backend)
```

Set the dev port via `VITE_PORT` (defaults in `vite.config.ts`). Example:

```bash
VITE_PORT=5180 yarn dev
```

Backend is expected on `http://localhost:4000` by default (see `vite.config.ts`).

## Scripts

| Command          | What it does                            |
| ---------------- | --------------------------------------- |
| `yarn dev`       | Vite dev server with HMR                |
| `yarn build`     | Type-check + production build to `dist` |
| `yarn preview`   | Preview the production build            |
| `yarn lint`      | ESLint flat config                      |
| `yarn typecheck` | TS only, no emit                        |
| `yarn test`      | Run unit tests (Vitest)                 |

## Project layout

```
web/src
├── components/          # ui primitives, layout, chat, map widgets
├── hooks/               # useSocket, usePosition
├── lib/                 # api, socket, types, helpers
├── pages/               # Home, Chat, Map, Settings, auth/*
├── routes/              # router config + guards
├── store/               # zustand stores (auth, theme)
├── index.css            # Tailwind v4 entry + design tokens
└── main.tsx
```

## Design tokens

Defined in [src/index.css](src/index.css) under `@theme` and `.dark`.
Tailwind v4 auto-generates utilities (`bg-bg`, `text-fg-muted`, `bg-brand`, etc.) from them.

## PWA

`vite-plugin-pwa` is configured with auto-update and runtime caching for OSM tiles.
Drop two icons in `public/`:

- `public/pwa-192x192.png`
- `public/pwa-512x512.png`

(SVG favicon already in place.)

## Socket events

Kept compatible with the existing NestJS gateway (`join`, `messageFromUser`,
`getUsersAroundMe`, `getMessages`, `messagesInProximity`,
`usersInAuthorProximity`, `youGotMentioned`, `raiseToast`, `message`).
