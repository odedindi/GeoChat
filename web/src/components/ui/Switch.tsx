import { cn } from '@/lib/cn';

type Props = {
  checked: boolean;
  onChange: (v: boolean) => void;
  ariaLabel?: string;
  disabled?: boolean;
};

export function Switch({ checked, onChange, ariaLabel, disabled }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
        checked ? 'bg-brand border-brand' : 'bg-bg-elevated border-border',
        disabled && 'opacity-50 cursor-not-allowed',
      )}
    >
      <span
        className={cn(
          'inline-block size-5 transform rounded-full bg-white shadow-soft transition-transform',
          checked ? 'translate-x-5' : 'translate-x-0.5',
        )}
      />
    </button>
  );
}
