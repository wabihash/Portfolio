import { motion } from 'framer-motion';
import type { ReactElement } from 'react';
import { ASSISTANT_CONFIG } from '@/features/assistant/config';

type AssistantLauncherProps = {
  showGreeting: boolean;
  greetingText: string;
  onDismissGreeting: () => void;
  onOpenAssistant: () => void;
};

export function AssistantLauncher({
  showGreeting,
  greetingText,
  onDismissGreeting,
  onOpenAssistant,
}: AssistantLauncherProps): ReactElement {
  return (
    <div className={`relative flex flex-col items-end ${showGreeting ? 'gap-0.5 sm:gap-1' : 'gap-2.5 sm:gap-3'}`}>
      {showGreeting ? (
        <section className="relative w-[min(14rem,calc(100vw-1rem))] rounded-xl border border-cyan-200/20 bg-[var(--surface)] p-2.5 text-[var(--text-primary)] shadow-[0_18px_42px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-all duration-300 ease-out animate-in fade-in zoom-in-95 slide-in-from-bottom-2 after:content-[''] after:absolute after:-bottom-1 after:right-7 after:h-3 after:w-3 after:rotate-45 after:border-b after:border-r after:border-cyan-200/20 after:bg-[var(--surface)] sm:w-[min(16rem,calc(100vw-2rem))] sm:rounded-2xl sm:p-3 sm:after:right-8">
          <button
            type="button"
            onClick={onDismissGreeting}
            className="absolute right-2 top-2 rounded-md border border-[var(--border-subtle)] px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]"
            aria-label="Dismiss assistant greeting"
          >
            x
          </button>
          <p className="pr-7 text-[11px] font-semibold text-[var(--text-primary)] sm:text-sm">
            {greetingText}
            <motion.span
              aria-hidden="true"
              className="ml-0.5 inline-block h-3 w-px bg-cyan-100/80"
              animate={{ opacity: [0.35, 1, 0.35], x: [0, 1, 0] }}
              transition={{ duration: 0.9, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
            />
          </p>
        </section>
      ) : null}

      <button
        type="button"
        onClick={onOpenAssistant}
        className="group rounded-full border border-cyan-200/35 bg-linear-to-r from-cyan-300 via-sky-300 to-blue-300 px-3.5 py-2 text-xs font-semibold text-slate-950 shadow-[0_10px_30px_rgba(56,189,248,0.45)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(56,189,248,0.55)] sm:px-4 sm:text-sm"
      >
        {ASSISTANT_CONFIG.launcherLabel}
      </button>
    </div>
  );
}
