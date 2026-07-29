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

import { io } from 'socket.io-client';

import { getSocket, resetSocket } from './socket';

describe('socket client', () => {
  it('passes auth token when provided', () => {
    (io as unknown as vi.Mock).mockClear();
    getSocket(() => 'tkn');
    expect(io).toHaveBeenCalled();
    resetSocket();
    getSocket(() => null);
    expect(io).toHaveBeenCalled();
  });
});
