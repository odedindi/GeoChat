import { ChatService, type UserDTO, type MessageFromUser } from '../chat/chat.service';

describe('ChatService (unit)', () => {
  let service: ChatService;
  let prismaMock: any;

  beforeEach(() => {
    prismaMock = {
      user: {
        findUnique: jest.fn(),
        update: jest.fn(),
        create: jest.fn(),
      },
      message: {
        create: jest.fn(),
      },
      $queryRaw: jest.fn(),
    };
    service = new ChatService(prismaMock);
  });

  it('sends mentions and respects beSeenBeyondRange', async () => {
    const author = {
      username: 'alice',
      preferedDistance: 1,
      socketID: 's1',
      geolocation_lat: 0,
      geolocation_lng: 0,
      beSeenBeyondRange: false,
    } as unknown as UserDTO;

    // prisma.user.findUnique called for socket lookup and for mention lookup
    prismaMock.user.findUnique.mockImplementation((args: any) => {
      const where = args?.where;
      if (where?.socketID) return Promise.resolve(author);
      if (where?.userID === 'target-uid') return Promise.resolve({ socketID: 's-target' });
      return Promise.resolve(null);
    });

    // message.create returns created message
    const created = {
      messageID: 'm1',
      fromuser: 'alice',
      content: 'hello',
      createdat: Date.now().toString(),
      geolocation_lat: 0,
      geolocation_lng: 0,
    };
    prismaMock.message.create.mockResolvedValue(created);

    // Nearby users: one is beyond preferedDistance but has beSeenBeyondRange true
    prismaMock.$queryRaw.mockResolvedValue([
      {
        userID: 'u2',
        username: 'bob',
        socketID: 's-bob',
        preferedDistance: 0.1,
        geolocation_lat: 1,
        geolocation_lng: 1,
        beSeenBeyondRange: true,
      },
      {
        userID: 'u3',
        username: 'carol',
        socketID: 's-carol',
        preferedDistance: 10,
        geolocation_lat: 0,
        geolocation_lng: 0,
        beSeenBeyondRange: false,
      },
    ]);

    const emitMocks: Record<string, any> = {};
    const server: any = {
      to: (socketID: string) => {
        if (!emitMocks[socketID]) emitMocks[socketID] = { emit: jest.fn() };
        return emitMocks[socketID];
      },
    };

    const socket: any = { id: 's1', emit: jest.fn(), data: {} };

    const payload: MessageFromUser = {
      content: 'hello',
      coord: { lat: 0, lng: 0 },
      mentions: [{ userID: 'target-uid', username: 'target' }],
    };

    await service.handleMessage(server as any, socket as any, payload);

    // Message saved
    expect(prismaMock.message.create).toHaveBeenCalled();
    // Mention delivered
    expect(emitMocks['s-target']).toBeDefined();
    expect(emitMocks['s-target'].emit).toHaveBeenCalledWith('youGotMentioned', 'alice', 'hello');
    // Broadcast delivered to carol and bob (bob via beSeenBeyondRange)
    expect(emitMocks['s-carol']).toBeDefined();
    expect(emitMocks['s-carol'].emit).toHaveBeenCalledWith(
      'message',
      expect.objectContaining({ messageID: 'm1' }),
    );
    expect(emitMocks['s-bob']).toBeDefined();
    expect(emitMocks['s-bob'].emit).toHaveBeenCalledWith(
      'message',
      expect.objectContaining({ messageID: 'm1' }),
    );
    // Author receives message
    expect(socket.emit).toHaveBeenCalledWith(
      'message',
      expect.objectContaining({ messageID: 'm1' }),
    );
  });
});
