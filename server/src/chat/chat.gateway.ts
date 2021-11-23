import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import log from 'src/config/logger';
import ChatController from './chat.controller';
import { messageRepository, userRepository } from './repositories';

@WebSocketGateway({ cors: true })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  chatController = new ChatController(messageRepository, userRepository);
  //   constructor(private readonly chatController: ChatController) {}

  handleDisconnect = async (socket: Socket) =>
    this.chatController.handleDisconnection(socket);

  handleConnection = async (socket: Socket) =>
    this.chatController.initConnection(socket);

  afterInit = (server: Server) => log.info(`WebSocketGateway init`);

  //   initConnection = (socket: Socket) => {
  //     socket.on('join', ({ user, room }: { user: UserDTO; room: string }) =>
  //       this.chatController.joinRoom(socket, user, room),
  //     );
  //     // Listen for chatMessage
  //     socket.on('chatMessage', ({ content, coord }) =>
  //       this.chatController.handleChatMessage(socket, content, coord),
  //     );
  //     socket.on('disconnect', async () => this.chatController.handleDisconnection(socket));
  //     // ====> older stuff
  //     socket.on('getMessages', () => this.chatController.getMessages(socket));
  //     socket.on('connect_error', (error) =>
  //       log.error(`connect_error: ${error.message}`),
  //     );
  //   };

  //   @SubscribeMessage('join')
  //   listenForMessages(@MessageBody() data: any, socket: Socket) {
  //     console.log('data: ', data);
  //   }
}
