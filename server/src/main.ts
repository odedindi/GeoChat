import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app/app.module';
import * as C from './config/constants';
import log from './config/logger';
import * as cors from 'cors';

const bootstrap = async () => {
  const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  };

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cors(corsOptions));
  app.setGlobalPrefix('v2');
  await app.listen(C.PORT);
  log.info(`Server is running on http://${C.HOST}:${C.PORT}`);
};
bootstrap();
