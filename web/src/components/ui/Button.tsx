import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
type Size = 'sm' | 'md' | 'lg' | 'icon';

const variants: Record<Variant, string> = {
  primary:
    'bg-brand text-brand-fg hover:bg-brand/90 active:bg-brand/85 shadow-soft',
  secondary:
    'bg-bg-elevated text-fg hover:bg-border/60 border border-border',
  ghost: 'bg-transparent text-fg hover:bg-bg-elevated',
  danger: 'bg-danger text-white hover:bg-danger/90',
  outline:
    'bg-transparent text-fg border border-border-strong hover:bg-bg-elevated',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm rounded-md',
  md: 'h-10 px-4 text-sm rounded-lg',
  lg: 'h-12 px-6 text-base rounded-xl',
  icon: 'h-10 w-10 rounded-lg',
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, variant = 'primary', size = 'md', loading, children, disabled, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium transition-all',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
        'disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}
    >
      {loading ? (
        <span className="size-4 rounded-full border-2 border-current border-r-transparent animate-spin" />
      ) : null}
      {children}
    </button>
  );
});
