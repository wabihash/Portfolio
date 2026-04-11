'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/layout/ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.93 }}
      className={[
        'relative flex h-8 w-8 items-center justify-center rounded-lg border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2',
        isDark
          ? 'border-cyan-200/20 bg-[var(--surface)] text-[var(--text-primary)] hover:border-cyan-200/40 hover:bg-[var(--surface-hover)] focus-visible:ring-cyan-200/50'
          : 'border-slate-300/60 bg-slate-100 text-slate-600 hover:border-slate-400/60 hover:bg-slate-200 focus-visible:ring-slate-400/50',
        'sm:h-9 sm:w-9',
      ].join(' ')}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Moon className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: 30, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -30, scale: 0.7 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Sun className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
