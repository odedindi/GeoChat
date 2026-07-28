FROM node:22-slim AS build
ENV LANG=C.UTF-8 LC_ALL=C.UTF-8
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY server/package.json server/package-lock.json* ./
RUN npm install --no-audit --no-fund
COPY server/ ./
RUN npx prisma generate && npm run build

FROM node:22-slim AS runtime
ENV NODE_ENV=production LANG=C.UTF-8 LC_ALL=C.UTF-8
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
EXPOSE 4000
CMD ["node", "dist/main.js"]
