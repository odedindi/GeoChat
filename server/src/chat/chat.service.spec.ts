import { ChatService, type UserDTO, type Coord, type MessageFromUser } from './chat.service';

// Minimal mock of PrismaService used by ChatService
const mockPrisma = () => ({
  user: {
    findUnique: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
  },
  message: {
    create: jest.fn(),
  },
  $queryRaw: jest.fn(),
});

const makeSocket = () => {
  return {
    id: 'socket-1',
    join: jest.fn(),
    emit: jest.fn(),
    data: {},
  } as any;
};

describe('ChatService (unit)', () => {
  let svc: ChatService;
  let prisma: any;

  beforeEach(() => {
    prisma = mockPrisma();
    svc = new ChatService(prisma as any);
  });

  test('addMessage returns DTO shape', async () => {
    const fake = {
      messageID: 'm1',
      fromuser: 'alice',
      content: 'hello',
      createdat: '123',
      geolocation_lat: 1,
      geolocation_lng: 2,
    };
    prisma.message.create.mockResolvedValue(fake);
    const res = await svc.addMessage('alice', 'hello', {
      lat: 1,
      lng: 2,
    } as Coord);
    expect(res.messageID).toBe('m1');
    expect(res.content).toBe('hello');
  });

  test('upsertUserOnJoin creates new user and emits welcome', async () => {
    const socket = makeSocket();
    const user: UserDTO = {
      userID: 'u1',
      username: 'bob',
      avatar: 'a',
      socketID: '',
      room: 'geoChat',
      preferedDistance: 1,
      geolocation_lat: 0,
      geolocation_lng: 0,
      beSeenBeyondRange: false,
    };
    prisma.user.findUnique.mockResolvedValue(null);
    prisma.user.create.mockResolvedValue({});

    const merged = await svc.upsertUserOnJoin(socket as any, user);
    expect(socket.emit).toHaveBeenCalledWith('joined');
    // welcome toast on new create
    expect(socket.emit).toHaveBeenCalledWith('raiseToast', expect.stringContaining('Welcome'));
    expect(merged.userID).toBe('u1');
  });

  test('handleMessage emits raiseToast when no author', async () => {
    const socket = makeSocket();
    // prisma will not find user by socket
    prisma.user.findUnique.mockResolvedValue(null);
    const payload: MessageFromUser = {
      content: 'x',
      coord: { lat: 0, lng: 0 },
      mentions: [],
    } as any;
    // call with a fake server
    await svc.handleMessage(
      { to: () => ({ emit: jest.fn() }) } as any,
      socket as any,
      payload as any,
    );
    expect(socket.emit).toHaveBeenCalledWith(
      'raiseToast',
      expect.stringContaining('Please rejoin'),
    );
  });

  test('getMessagesInRange delegates to $queryRaw', async () => {
    prisma.$queryRaw.mockResolvedValue([{ messageID: 'x' }]);
    const res = await svc.getMessagesInRange(0, 0, 1);
    expect(prisma.$queryRaw).toHaveBeenCalled();
    expect(res[0].messageID).toBe('x');
  });
});
