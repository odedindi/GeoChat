import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import helmet from 'helmet';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const logger = new Logger('Bootstrap');

  app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
  app.enableCors({
    origin: (process.env.CORS_ORIGIN || '*').split(',').map((s) => s.trim()),
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });
  app.setGlobalPrefix('v2');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.enableShutdownHooks();

  const port = Number(process.env.SERVER_PORT) || 4000;
  try {
    await app.listen(port, '0.0.0.0');
    logger.log(`🚀 GeoChat server listening on http://localhost:${port}/v2`);
  } catch (err: any) {
    // More descriptive startup failure logging (e.g. port in use)
    logger.error(`Failed to start server: ${err?.code || err?.message || err}`);
    if (err?.code === 'EADDRINUSE') {
      logger.error(`Port ${port} already in use. Set SERVER_PORT to a different port or kill the process using it.`);
    }
    // Re-throw so the process exits non-zero as before, but with logs produced.
    throw err;
  }
}

bootstrap();
