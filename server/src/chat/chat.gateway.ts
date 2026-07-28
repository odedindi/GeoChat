import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import type { Server, Socket } from 'socket.io';

import { ChatService, type MessageFromUser, type UserDTO } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: (process.env.CORS_ORIGIN || '*').split(',').map((s) => s.trim()),
  },
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server!: Server;
  private readonly logger = new Logger(ChatGateway.name);

  constructor(private readonly chat: ChatService) {}

  afterInit() {
    this.logger.log('WebSocket gateway ready');
  }

  handleConnection(socket: Socket) {
    this.logger.debug(`socket connected: ${socket.id}`);
  }

  async handleDisconnect(socket: Socket) {
    await this.chat.handleDisconnect(socket);
  }

  @SubscribeMessage('join')
  async onJoin(@ConnectedSocket() socket: Socket, @MessageBody() payload: { user: UserDTO }) {
    await this.chat.handleJoin(this.server, socket, payload.user);
  }

  @SubscribeMessage('messageFromUser')
  async onMessage(@ConnectedSocket() socket: Socket, @MessageBody() payload: MessageFromUser) {
    await this.chat.handleMessage(this.server, socket, payload);
  }

  @SubscribeMessage('getMessages')
  async onGetMessages(@ConnectedSocket() socket: Socket) {
    await this.chat.sendMessagesInProximity(socket);
  }

  @SubscribeMessage('getUsersAroundMe')
  async onGetUsersAroundMe(@ConnectedSocket() socket: Socket) {
    await this.chat.sendUsersAroundMe(socket);
  }
}
