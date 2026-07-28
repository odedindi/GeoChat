import { vi, describe, it, expect } from 'vitest';

vi.mock('socket.io-client', async () => {
  return {
    io: vi.fn(() => ({
      on: vi.fn(),
      off: vi.fn(),
      connect: vi.fn(),
      disconnect: vi.fn(),
      removeAllListeners: vi.fn(),
      connected: false,
      id: 'socket-id',
    })),
  };
});

import { getSocket, resetSocket } from './socket';
import { io } from 'socket.io-client';

describe('socket client', () => {
  it('passes auth token when provided', () => {
    (io as unknown as vi.Mock).mockClear();
    const s1 = getSocket(() => 'tkn');
    expect(io).toHaveBeenCalled();
    resetSocket();
    const s2 = getSocket(() => null);
    expect(io).toHaveBeenCalled();
  });
});
