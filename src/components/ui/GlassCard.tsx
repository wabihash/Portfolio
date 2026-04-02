import type { HTMLAttributes, ReactElement } from 'react';
import { cn } from '@/lib/utils';

type GlassCardProps = HTMLAttributes<HTMLDivElement>;

export function GlassCard({ className, ...props }: GlassCardProps): ReactElement {
  return <div className={cn('glass-card rounded-2xl', className)} {...props} />;
}
