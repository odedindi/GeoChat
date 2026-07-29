import { format, formatDistanceToNow, isToday } from 'date-fns';
import { motion } from 'framer-motion';
import type { Message } from '@/lib/types';
import { Avatar } from '@/components/ui/Avatar';
import { avatarUrl } from '@/lib/geo';
import { cn } from '@/lib/cn';

function fmtTime(ts: string) {
  const n = Number(ts);
  const d = new Date(Number.isFinite(n) && n > 0 ? n : ts);
  if (isNaN(d.getTime())) return '';
  return isToday(d) ? format(d, 'HH:mm') : formatDistanceToNow(d, { addSuffix: true });
}

/** Render @mentions in a message body. */
function renderContent(content: string) {
  // server sends "@username" after the client strips the [id] format
  const parts = content.split(/(@[\w.-]+)/g);
  return parts.map((p, i) =>
    p.startsWith('@') ? (
      <span key={i} className="font-medium text-brand">
        {p}
      </span>
    ) : (
      <span key={i}>{p}</span>
    ),
  );
}

export function MessageBubble({
  msg,
  isOwn,
  showAuthor,
}: {
  msg: Message;
  isOwn: boolean;
  showAuthor: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className={cn('flex w-full items-end gap-2', isOwn ? 'justify-end' : 'justify-start')}
    >
      {!isOwn && (
        <div className="w-8">
          {showAuthor && <Avatar src={avatarUrl(msg.fromuser)} alt={msg.fromuser} size={32} />}
        </div>
      )}
      <div className={cn('flex max-w-[78%] flex-col gap-1', isOwn ? 'items-end' : 'items-start')}>
        {!isOwn && showAuthor && (
          <span className="px-1 text-xs font-medium text-fg-muted">{msg.fromuser}</span>
        )}
        <div
          className={cn(
            'whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2 text-sm shadow-soft',
            isOwn
              ? 'rounded-br-md bg-bubble-out text-bubble-out-fg'
              : 'rounded-bl-md bg-bubble-in text-bubble-in-fg',
          )}
        >
          {renderContent(msg.content)}
        </div>
        <span className="px-1 text-[10px] text-fg-subtle">{fmtTime(msg.createdat)}</span>
      </div>
    </motion.div>
  );
}
