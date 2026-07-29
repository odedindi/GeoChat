FROM node:22-slim AS build
ENV LANG=C.UTF-8 LC_ALL=C.UTF-8
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
WORKDIR /app

RUN corepack enable
COPY .yarnrc.yml package.json yarn.lock ./
COPY server/package.json ./server/

RUN yarn install

COPY server/ ./server/
RUN yarn workspace geochat-server prisma generate
RUN yarn workspace geochat-server build

FROM node:22-slim AS runtime
ENV NODE_ENV=production LANG=C.UTF-8 LC_ALL=C.UTF-8
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
WORKDIR /app

COPY --from=build /app/server/package.json ./
COPY --from=build /app/server/dist ./dist
COPY --from=build /app/server/prisma.config.ts ./
COPY --from=build /app/server/prisma ./prisma
COPY --from=build /app/node_modules ./node_modules

EXPOSE 4000
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
