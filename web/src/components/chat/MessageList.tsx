import { useEffect, useRef } from 'react';
import type { Message } from '@/lib/types';
import { MessageBubble } from './MessageBubble';

export function MessageList({
  messages,
  currentUser,
}: {
  messages: Message[];
  currentUser: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: 'smooth' });
  }, [messages.length]);

  if (messages.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center text-fg-muted">
        <div className="grid size-12 place-items-center rounded-full bg-bg-elevated">
          <svg viewBox="0 0 24 24" fill="none" className="size-6 text-brand">
            <path
              d="M21 12a9 9 0 1 1-3.07-6.79"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="text-sm">No messages here yet.</div>
        <div className="text-xs text-fg-subtle">Be the first to say hi.</div>
      </div>
    );
  }

  return (
    <div ref={ref} className="flex h-full flex-col gap-3 overflow-y-auto px-4 py-4">
      {messages.map((m, i) => {
        const prev = messages[i - 1];
        const showAuthor = !prev || prev.fromuser !== m.fromuser;
        return (
          <MessageBubble key={m.messageID} msg={m} isOwn={m.fromuser === currentUser} showAuthor={showAuthor} />
        );
      })}
    </div>
  );
}
