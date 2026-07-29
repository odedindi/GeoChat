import { cn } from '@/lib/cn';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-500 text-white shadow-soft">
        <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden>
          <path
            d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className="text-lg font-semibold tracking-tight">GeoChat</span>
    </div>
  );
}
