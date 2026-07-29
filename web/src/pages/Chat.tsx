import { useEffect, useMemo, useState, Suspense, lazy } from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { toast } from 'sonner';
import type { ComponentType } from 'react';
import { MessageList } from '@/components/chat/MessageList';
const Composer = lazy(() =>
  import('@/components/chat/Composer').then((m) => ({
    default: (m as unknown as Record<string, ComponentType>).Composer,
  })),
);
const ComposerAny = Composer as unknown as ComponentType<{
  nearbyUsers: { userID: string; username: string }[];
  onMentionTrigger: () => void;
  onSubmit: (content: string, mentions: Mention[]) => void;
  disabled?: boolean;
}>;
import { useAuth } from '@/store/auth';
import { useSocket } from '@/hooks/useSocket';
import { usePosition } from '@/hooks/usePosition';
import { userToDTO, type Mention, type Message, type UserDTO } from '@/lib/types';
import { cn } from '@/lib/cn';

export function Chat() {
  const { user, patchUser } = useAuth();
  const { socket, connected } = useSocket();
  const { pos } = usePosition();
  const [messages, setMessages] = useState<Message[]>([]);
  const [nearby, setNearby] = useState<UserDTO[]>([]);
  const [joined, setJoined] = useState(false);

  // Keep user location in store fresh
  useEffect(() => {
    if (user && pos && (user.geo.coord.lat !== pos.lat || user.geo.coord.lng !== pos.lng)) {
      patchUser({ geo: { ...user.geo, coord: { lat: pos.lat, lng: pos.lng } } });
    }
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, [pos?.lat, pos?.lng]);

  // Listeners: attach once per socket, stay attached across pos/user changes.
  useEffect(() => {
    const onMessage = (m: Message) =>
      setMessages((prev) => (prev.some((p) => p.messageID === m.messageID) ? prev : [...prev, m]));
    const onMentioned = (fromuser: string, content: string) =>
      toast(`@${fromuser} mentioned you`, { description: content });
    const onUsers = (users: UserDTO[]) => setNearby(users);
    const onToast = (msg: string) => toast(msg);
    const onJoined = () => setJoined(true);
    const onDisconnect = () => setJoined(false);

    socket.on('message', onMessage);
    socket.on('youGotMentioned', onMentioned);
    socket.on('usersInAuthorProximity', onUsers);
    socket.on('raiseToast', onToast);
    socket.on('joined', onJoined);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('message', onMessage);
      socket.off('youGotMentioned', onMentioned);
      socket.off('usersInAuthorProximity', onUsers);
      socket.off('raiseToast', onToast);
      socket.off('joined', onJoined);
      socket.off('disconnect', onDisconnect);
    };
  }, [socket]);

  // Join: (re)emit when connection comes up or identity/position changes.
  useEffect(() => {
    if (!user || !pos || !connected) return;
    socket.emit('join', {
      user: userToDTO({
        ...user,
        geo: { ...user.geo, coord: { lat: pos.lat, lng: pos.lng } },
        socketID: socket.id || '',
      }),
    });
    // Intentionally shallow: only re-emit when these specific fields change
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, connected, user?.userID, user?.username, pos?.lat, pos?.lng]);

  const onSubmit = (content: string, mentions: Mention[]) => {
    if (!user || !pos) return;
    socket.emit('messageFromUser', {
      content,
      coord: { lat: pos.lat, lng: pos.lng },
      mentions,
    });
  };

  const nearbySuggestions = useMemo(
    () =>
      nearby
        .filter((u) => u.userID !== user?.userID)
        .map((u) => ({ userID: u.userID, username: u.username })),
    [nearby, user?.userID],
  );

  return (
    <div className="flex h-full flex-col pb-16 md:pb-0">
      <header className="flex items-center justify-between border-b border-border bg-bg-elevated/60 px-4 py-3 backdrop-blur">
        <div>
          <h1 className="text-base font-semibold">Nearby chat</h1>
          <p className="text-xs text-fg-subtle">
            {user?.geo.preferedDistance ?? 0} km radius · {messages.length} messages
          </p>
        </div>
        <div
          className={cn(
            'flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs',
            connected
              ? 'border-success/30 bg-success/10 text-success'
              : 'border-border bg-bg text-fg-muted',
          )}
        >
          {connected ? <Wifi className="size-3.5" /> : <WifiOff className="size-3.5" />}
          {connected ? 'Live' : 'Offline'}
        </div>
      </header>

      <div className="min-h-0 flex-1">
        {user && <MessageList messages={messages} currentUser={user.username} />}
      </div>

      <Suspense fallback={<div className="p-3 text-center">Loading composer…</div>}>
        <ComposerAny
          nearbyUsers={nearbySuggestions}
          onMentionTrigger={() => socket.emit('getUsersAroundMe')}
          onSubmit={onSubmit}
          disabled={!connected || !joined}
        />
      </Suspense>
    </div>
  );
}
