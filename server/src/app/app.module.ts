import { Module } from '@nestjs/common';
import { ChatModule } from '../chat/chat.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ChatModule],
  controllers: [AppController],
  providers: [AppService /* PrismaService, UserService, MessageService */],
})
export class AppModule {}
