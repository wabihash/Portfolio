import type { ButtonHTMLAttributes, ReactElement } from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, type = 'button', ...props }: ButtonProps): ReactElement {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300',
        'bg-white text-black hover:scale-[1.02] active:scale-[0.98]',
        className
      )}
      {...props}
    />
  );
}
