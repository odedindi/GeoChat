import { io, Socket } from 'socket.io-client';

const SERVER_URL = import.meta.env.VITE_SERVER_URL || '';

let socket: Socket | null = null;
let currentAuthToken: string | null = null;

type AuthGetter = string | null | (() => string | null);

/**
 * Return the singleton Socket.io client. Accepts either a token or a
 * callback `() => token` so the auth used on reconnect attempts is always
 * pulled from the latest source. If the token used for the initial
 * handshake differs from the previous one, the socket is recreated.
 */
export function getSocket(getAuth?: AuthGetter): Socket {
  const getAuthFn = typeof getAuth === 'function' ? getAuth : () => (typeof getAuth !== 'undefined' ? getAuth : (typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null));
  const tokenToUse = getAuthFn();

  // If socket exists and token unchanged, reuse but ensure auth getter is applied for reconnects
  if (socket && currentAuthToken === tokenToUse) {
    // update auth before any reconnect attempt
    try {
      // @ts-ignore - socket.auth is supported by socket.io-client runtime
      socket.auth = tokenToUse ? { token: tokenToUse } : {};
    } catch (e) {
      // ignore
    }
    return socket;
  }

  // tear down previous socket if token changed
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
  }

  currentAuthToken = tokenToUse;

  socket = io(SERVER_URL || undefined, {
    transports: ['websocket'],
    autoConnect: false,
    reconnection: true,
    reconnectionDelay: 500,
    reconnectionDelayMax: 4000,
    auth: tokenToUse ? { token: tokenToUse } : undefined,
  });

  // Before a reconnect attempt, refresh the auth payload from the getter so
  // the latest token is used without needing to recreate the socket.
  socket.on('reconnect_attempt', () => {
    try {
      const t = getAuthFn();
      // @ts-ignore
      socket && (socket.auth = t ? { token: t } : {});
    } catch (e) {
      // ignore
    }
  });

  return socket;
}

export function resetSocket() {
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
    currentAuthToken = null;
  }
}
