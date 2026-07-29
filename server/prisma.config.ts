import path from 'node:path';
import { config } from 'dotenv';
import { defineConfig } from 'prisma/config';

config({ path: path.join(__dirname, '.env') });

export default defineConfig({
  schema: path.join(__dirname, 'prisma', 'schema.prisma'),
  migrations: {
    seed: 'npx ts-node ./prisma/seed.ts',
  },
  datasource: {
    url: process.env.DATABASE_URL!,
  },
});
