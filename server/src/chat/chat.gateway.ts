import {
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import log from '../config/logger';
import ChatController from './chat.controller';
import { messageRepository, userRepository } from '../repositories';

@WebSocketGateway({ cors: true })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  chatController = new ChatController(messageRepository, userRepository);

  handleDisconnect = async (socket: Socket) =>
    this.chatController.handleDisconnection(socket);

  afterInit = (_server: Server) => log.info(`WebSocketGateway init`);

  handleConnection = async (socket: Socket) =>
    this.chatController.initConnection(this.server, socket);
}
