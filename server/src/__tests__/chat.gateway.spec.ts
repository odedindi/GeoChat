import { ChatGateway } from '../chat/chat.gateway';

describe('ChatGateway (unit)', () => {
  it('forwards join and message events to ChatService', async () => {
    const chatMock: any = {
      handleJoin: jest.fn(),
      handleMessage: jest.fn(),
      sendMessagesInProximity: jest.fn(),
      sendUsersAroundMe: jest.fn(),
      handleDisconnect: jest.fn(),
    };
    const gateway = new ChatGateway(chatMock);

    const server: any = { /* not used directly in gateway methods */ };
    // inject server
    (gateway as any).server = server;

    const socket: any = { id: 's1' };
    await gateway.onJoin(socket, { user: { userID: 'u1' } } as any);
    expect(chatMock.handleJoin).toHaveBeenCalledWith(server, socket, { userID: 'u1' });

    await gateway.onMessage(socket, { content: 'x', coord: { lat: 0, lng: 0 }, mentions: [] });
    expect(chatMock.handleMessage).toHaveBeenCalledWith(server, socket, expect.any(Object));

    await gateway.onGetMessages(socket);
    expect(chatMock.sendMessagesInProximity).toHaveBeenCalledWith(socket);

    await gateway.onGetUsersAroundMe(socket);
    expect(chatMock.sendUsersAroundMe).toHaveBeenCalledWith(socket);
  });
});
