import { useEffect, useMemo, useRef, useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { avatarUrl } from '@/lib/geo';
import { cn } from '@/lib/cn';
import type { Mention } from '@/lib/types';

type Suggestion = { userID: string; username: string };

type Props = {
  nearbyUsers: Suggestion[];
  onMentionTrigger: () => void;
  onSubmit: (content: string, mentions: Mention[]) => void;
  disabled?: boolean;
};

const MENTION_RE = /@\[([^\]]+)\]\(([^)]+)\)/g;

/** Convert "@[name](id) foo" -> { content: "@name foo", mentions: [...] } */
function parseMentions(raw: string): { content: string; mentions: Mention[] } {
  const mentions: Mention[] = [];
  const content = raw.replace(MENTION_RE, (_m, username: string, userID: string) => {
    mentions.push({ username, userID });
    return `@${username}`;
  });
  return { content, mentions };
}

export function Composer({ nearbyUsers, onMentionTrigger, onSubmit, disabled }: Props) {
  const taRef = useRef<HTMLTextAreaElement>(null);
  const [raw, setRaw] = useState('');
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);

  // Auto-resize
  useEffect(() => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 160) + 'px';
  }, [raw]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return nearbyUsers.filter((u) => u.username.toLowerCase().includes(q)).slice(0, 6);
  }, [query, nearbyUsers]);

  const detectMention = (value: string, caret: number) => {
    const before = value.slice(0, caret);
    const m = /@([\w.-]*)$/.exec(before);
    if (m) {
      setOpen(true);
      setQuery(m[1] || '');
      setActiveIdx(0);
      onMentionTrigger();
    } else {
      setOpen(false);
    }
  };

  const insertMention = (u: Suggestion) => {
    const ta = taRef.current;
    if (!ta) return;
    const caret = ta.selectionStart;
    const before = raw.slice(0, caret);
    const after = raw.slice(caret);
    const replaced = before.replace(/@([\w.-]*)$/, `@[${u.username}](${u.userID}) `);
    const next = replaced + after;
    setRaw(next);
    setOpen(false);
    requestAnimationFrame(() => {
      const pos = replaced.length;
      ta.focus();
      ta.setSelectionRange(pos, pos);
    });
  };

  const send = () => {
    const trimmed = raw.trim();
    if (!trimmed) return;
    const parsed = parseMentions(trimmed);
    onSubmit(parsed.content, parsed.mentions);
    setRaw('');
    setOpen(false);
  };

  return (
    <div className="border-t border-border bg-bg-elevated/80 px-3 py-3 backdrop-blur">
      <div className="relative mx-auto flex max-w-3xl items-end gap-2">
        {open && filtered.length > 0 && (
          <div className="absolute bottom-full left-0 mb-2 w-72 overflow-hidden rounded-xl border border-border bg-bg-elevated shadow-soft">
            <div className="px-3 py-1.5 text-[11px] uppercase tracking-wide text-fg-subtle">
              People nearby
            </div>
            {filtered.map((u, i) => (
              <button
                key={u.userID}
                onMouseEnter={() => setActiveIdx(i)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  insertMention(u);
                }}
                className={cn(
                  'flex w-full items-center gap-3 px-3 py-2 text-left text-sm',
                  i === activeIdx ? 'bg-brand/10 text-brand' : 'hover:bg-bg',
                )}
              >
                <Avatar src={avatarUrl(u.username)} alt={u.username} size={28} />
                <span className="font-medium">@{u.username}</span>
              </button>
            ))}
          </div>
        )}

        <textarea
          ref={taRef}
          rows={1}
          value={raw}
          disabled={disabled}
          placeholder={disabled ? 'Connecting…' : 'Message nearby people…'}
          onChange={(e) => {
            setRaw(e.target.value);
            detectMention(e.target.value, e.target.selectionStart || 0);
          }}
          onKeyDown={(e) => {
            if (open && filtered.length) {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActiveIdx((i) => (i + 1) % filtered.length);
                return;
              }
              if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActiveIdx((i) => (i - 1 + filtered.length) % filtered.length);
                return;
              }
              if (e.key === 'Enter' || e.key === 'Tab') {
                e.preventDefault();
                insertMention(filtered[activeIdx]);
                return;
              }
              if (e.key === 'Escape') {
                setOpen(false);
                return;
              }
            }
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          className={cn(
            'min-h-11 flex-1 resize-none rounded-2xl border border-border bg-bg px-4 py-3 text-sm',
            'placeholder:text-fg-subtle outline-none transition-colors',
            'focus:border-brand/60 focus:ring-2 focus:ring-brand/20',
          )}
        />
        <Button
          onClick={send}
          disabled={disabled || raw.trim().length === 0}
          size="icon"
          aria-label="Send message"
        >
          <Send className="size-4" />
        </Button>
      </div>
    </div>
  );
}
