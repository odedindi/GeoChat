import { useEffect, useState } from 'react';

import { getSocket, resetSocket } from '@/lib/socket';
import { useAuth } from '@/store/auth';

/** Manages the singleton socket lifecycle and exposes its connected state. */
export function useSocket(connect = true) {
  const token = useAuth((s) => s.token);
  // pass a getter so the socket can refresh auth on reconnect attempts
  const socket = getSocket(() => token ?? null);
  const [connected, setConnected] = useState(socket.connected);

  useEffect(() => {
    if (!connect) return;

    const onConnect = () => setConnected(true);
    const onDisconnect = () => setConnected(false);

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    if (!socket.connected) socket.connect();

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
    // Recreate socket when token changes so auth handshake is applied
  }, [socket, connect, token]);

  // If token goes away, tear down socket to avoid stale auth.
  useEffect(() => {
    if (!token) {
      resetSocket();
    }
  }, [token]);

  return { socket, connected };
}
