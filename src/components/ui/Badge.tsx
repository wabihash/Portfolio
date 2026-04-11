import type { HTMLAttributes, ReactElement } from 'react';
import { cn } from '@/lib/utils';

type BadgeProps = HTMLAttributes<HTMLSpanElement>;

export function Badge({ className, ...props }: BadgeProps): ReactElement {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium',
        'glass-card text-[var(--text-secondary)]',
        className
      )}
      {...props}
    />
  );
}
