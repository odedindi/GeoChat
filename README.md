<img src="https://raw.githubusercontent.com/odedindi/GeoChat/main/client/public/assets/beacon.png" alt="GeoChat" width="56" height="56" />

# GeoChat

A free, geo-aware messaging app. Pick a radius around you and chat with the people inside it — nothing more, nothing less. Built as a PWA that works on the web and installs to your home screen.

## Stack

**Web (`web/`)** — Vite 6, React 19, TypeScript 5, Tailwind v4 (OKLCH design tokens), React Router 7, Zustand 5, react-leaflet 5, socket.io-client 4, react-hook-form + zod, framer-motion, sonner, vite-plugin-pwa.

**Server (`server/`)** — NestJS 11, Prisma 6, PostgreSQL + PostGIS, socket.io 4, JWT auth (`@nestjs/jwt` + Passport), bcrypt, helmet, throttler, class-validator.

## Quick start

Prereqs: Node 22+, Yarn 4 (Corepack), Docker (for Postgres/PostGIS).

```bash
# 1. install everything
yarn install:all

# 2. configure server
cp server/.env.example server/.env
# edit JWT_SECRET, DATABASE_URL, CORS_ORIGIN

# 3. bring up postgres+postgis
docker compose up -d db

# 4. run migrations + seed
yarn db:migrate -- --name init
yarn db:seed

# 5. run server + web together
yarn dev
```

- Web dev server: <http://localhost:5180>
- API: <http://localhost:4000/v2> (proxied via `/api` from the web app)
- Postgres: localhost:5432 (user `pg` / pw `password` / db `geochat`)

Set the web dev port with `VITE_PORT` (default configured in `web/vite.config.ts`):

```bash
VITE_PORT=5180 yarn dev:web
```

Run tests:

```bash
yarn test:server   # server unit tests
yarn test:web      # web unit tests
```

## Scripts

| Script                                      | What it does                                       |
| ------------------------------------------- | -------------------------------------------------- |
| `yarn dev`                                  | server (`:4000`) + web (`:5180`) with concurrently |
| `yarn dev:web` / `dev:server`               | run one side only                                  |
| `yarn build`                                | typecheck + build both                             |
| `yarn lint:web` / `typecheck:web`           | web QA                                             |
| `yarn db:migrate` / `db:seed` / `db:studio` | Prisma helpers                                     |

## Architecture

```
GeoChat/
├── web/                # new Vite/React PWA (active)
├── server/             # new NestJS API + WebSocket gateway
├── docker-compose.yml  # Postgres + PostGIS + server
└── Dockerfile          # multi-stage build for server/
```

The WebSocket contract (events: `join`, `messageFromUser`, `getMessages`, `getUsersAroundMe`, `messagesInProximity`, `usersInAuthorProximity`, `youGotMentioned`, `raiseToast`, `message`) is shared between the web app and server.

## Features

- Real-time chat scoped to a user-chosen radius (geofenced via PostGIS `ST_DWithin`)
- @mention popover with proximity-aware autocomplete
- Live map with your range overlay and message markers
- JWT auth (register / login / `GET /v2/auth/me`)
- Light / Dark / System theme with OKLCH tokens
- PWA with offline app shell + OpenStreetMap tile cache

## License

MIT — see [LICENSE](LICENSE).
