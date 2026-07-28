import { cn } from '@/lib/cn';

export function Avatar({
  src,
  alt,
  size = 40,
  className,
}: {
  src?: string;
  alt: string;
  size?: number;
  className?: string;
}) {
  const initials = alt
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-bg-elevated text-fg-muted ring-1 ring-border',
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {src ? (
        <img src={src} alt={alt} className="size-full object-cover" loading="lazy" />
      ) : (
        <span className="font-medium">{initials}</span>
      )}
    </div>
  );
}
