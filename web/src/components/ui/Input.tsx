import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className, invalid, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(
        'h-11 w-full rounded-lg border bg-bg-elevated px-3.5 text-sm text-fg placeholder:text-fg-subtle',
        'transition-colors outline-none',
        'focus:border-brand/60 focus:ring-2 focus:ring-brand/20',
        invalid
          ? 'border-danger/60 focus:border-danger focus:ring-danger/20'
          : 'border-border',
        className,
      )}
      {...rest}
    />
  );
});

export function Label({
  children,
  htmlFor,
  hint,
}: {
  children: React.ReactNode;
  htmlFor?: string;
  hint?: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="flex items-baseline justify-between text-sm">
      <span className="font-medium text-fg">{children}</span>
      {hint ? <span className="text-xs text-fg-subtle">{hint}</span> : null}
    </label>
  );
}

export function FieldError({ children }: { children?: React.ReactNode }) {
  if (!children) return null;
  return <p className="mt-1 text-xs text-danger">{children}</p>;
}
