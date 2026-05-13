'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/layout/ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={[
        'relative flex h-8 w-8 items-center justify-center rounded-lg border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2',
        isDark
          ? 'border-cyan-200/20 bg-[var(--surface)] text-[var(--text-primary)] hover:border-cyan-200/40 hover:bg-[var(--surface-hover)] focus-visible:ring-cyan-200/50'
          : 'border-slate-300/60 bg-slate-100 text-slate-600 hover:border-slate-400/60 hover:bg-slate-200 focus-visible:ring-slate-400/50',
        'sm:h-9 sm:w-9',
      ].join(' ')}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-75'}`}
      >
        <Moon className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
      </span>
      <span
        aria-hidden="true"
        className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${isDark ? 'opacity-0 -rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'}`}
      >
        <Sun className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
      </span>
    </button>
  );
}
