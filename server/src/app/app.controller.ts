import { AppService } from './app.service';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, // private readonly userService: UserRepository,
  ) // private readonly messageService: MessageRepository,
  {}

  @Get()
  getOK(): string {
    return this.appService.getOK();
  }

  // @Get('users:userid')
  // async getUserByUserId(@Param('userid') userid: string) {
  //   return this.userService.getUser({ userID: userid });
  // }

  // @Get('users/socketid:socketid')
  // async getUserBySocketId(@Param('socketid') socketid: string) {
  //   return this.userService.getUser({ socketID: socketid });
  // }

  // // TODO @Post @Update @Delete user

  // @Get('messages')
  // async getAllMessages() {
  //   return this.messageService.getAllMessages({});
  // }

  // @Get('filtered-messages')
  // async getFilteredMessages(
  //   @Body()
  //   {
  //     geolocation_lat,
  //     geolocation_lng,
  //     preferedDistance,
  //   }: {
  //     geolocation_lat: number;
  //     geolocation_lng: number;
  //     preferedDistance: number;
  //   },
  // ) {
  //   return this.messageService.getMessagesWithinRange(
  //     geolocation_lat,
  //     geolocation_lng,
  //     preferedDistance,
  //   );
  // }
  // @Post('messages')
  // async createMessage(
  //   @Body()
  //   MessageData: {
  //     messageID: string;
  //     fromuser: string;
  //     content: string;
  //     createdat: string;
  //     geolocation_lat: number;
  //     geolocation_lng: number;
  //   },
  // ) {
  //   const {
  //     messageID,
  //     fromuser,
  //     content,
  //     createdat,
  //     geolocation_lat,
  //     geolocation_lng,
  //   } = MessageData;

  //   return this.messageService.addMessage({
  //     messageID,
  //     content,
  //     createdat,
  //     geolocation_lat,
  //     geolocation_lng,
  //     User: { connect: { username: fromuser } },
  //   });
  // }
}
