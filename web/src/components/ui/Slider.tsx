import { cn } from '@/lib/cn';

type Props = {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (v: number) => void;
  className?: string;
  ariaLabel?: string;
};

export function Slider({
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  className,
  ariaLabel,
}: Props) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <input
      type="range"
      aria-label={ariaLabel}
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={(e) => onChange(Number(e.target.value))}
      className={cn(
        'h-2 w-full cursor-pointer appearance-none rounded-full',
        'bg-[linear-gradient(to_right,var(--color-brand)_0%,var(--color-brand)_var(--pct),var(--color-border)_var(--pct),var(--color-border)_100%)]',
        '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:ring-2 [&::-webkit-slider-thumb]:ring-brand [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110',
        '[&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-brand',
        className,
      )}
      style={{ ['--pct' as string]: `${pct}%` }}
    />
  );
}
