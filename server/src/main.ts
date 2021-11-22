import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.SERVER_PORT;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v2');
  await app.listen(PORT);
}
bootstrap();
