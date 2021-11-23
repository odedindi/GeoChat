import { Module } from '@nestjs/common';
import { ChatModule } from 'src/chat/chat.module';
import { MessageService } from 'src/services/message.service';
import { PrismaService } from 'src/services/prisma.service';
import { UserService } from 'src/services/user.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ChatModule],
  controllers: [AppController],
  providers: [AppService /* PrismaService, UserService, MessageService */],
})
export class AppModule {}
