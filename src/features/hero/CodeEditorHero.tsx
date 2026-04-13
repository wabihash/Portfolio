'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, Copy, Sparkles, Zap } from 'lucide-react';

const FULL_CONSOLE_LINE = 'console.log(portfolio.skills.join(" | "));';

const CODE_TO_COPY = [
  'const portfolio = {',
  '  name: "Wabi Dagim",',
  '  title: "UI/UX Designer & Developer",',
  '  skills: ["React", "Python", "TypeScript", "AI/ML", "Figma", "Node", "Next.js"],',
  '};',
  '',
  FULL_CONSOLE_LINE,
].join('\n');

export function CodeEditorHero() {
    // Get the CSS variable for the console log preview color
    const [consoleLogColor, setConsoleLogColor] = useState<string>("#fff");

    useEffect(() => {
      if (typeof window !== "undefined") {
        const color = getComputedStyle(document.documentElement).getPropertyValue('--console-log-preview').trim();
        setConsoleLogColor(color || "#fff");
      }
    }, []);
  const shouldReduceMotion = useReducedMotion();
  const [typedText, setTypedText] = useState(shouldReduceMotion ? FULL_CONSOLE_LINE : '');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) return;

    let active = true;
    let timeoutId: ReturnType<typeof setTimeout>;

    const typeAtIndex = (index: number) => {
      if (!active) {
        return;
      }

      setTypedText(FULL_CONSOLE_LINE.slice(0, index + 1));

      if (index < FULL_CONSOLE_LINE.length - 1) {
        timeoutId = setTimeout(() => typeAtIndex(index + 1), 42);
      }
    };

    timeoutId = setTimeout(() => typeAtIndex(0), 260);

    return () => {
      active = false;
      clearTimeout(timeoutId);
    };
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (!isCopied) {
      return;
    }

    const timeoutId = setTimeout(() => setIsCopied(false), 1500);
    return () => clearTimeout(timeoutId);
  }, [isCopied]);

  const cursor = useMemo(() => (shouldReduceMotion ? '' : '▋'), [shouldReduceMotion]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CODE_TO_COPY);
      setIsCopied(true);
    } catch {
      setIsCopied(false);
    }
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
      className="relative"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-300/20 blur-3xl"
      />

      <motion.div
        animate={shouldReduceMotion ? undefined : { y: [0, -7, 0] }}
        transition={{ duration: 5.5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
        className="absolute -top-4 right-2 z-20"
      >
        <div className="flex h-8 w-8 sm:h-11 sm:w-11 items-center justify-center rounded-md border border-cyan-200/45 bg-cyan-300/85 text-[#022026] shadow-[0_12px_28px_rgba(45,212,191,0.3)]">
          <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
      </motion.div>

      <motion.div
        animate={shouldReduceMotion ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 6.2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
        className="absolute -bottom-4 left-2 z-20"
      >
        <div className="flex h-8 w-8 sm:h-11 sm:w-11 items-center justify-center rounded-md border border-fuchsia-200/45 bg-fuchsia-500/80 text-(--text-primary) shadow-[0_12px_28px_rgba(217,70,239,0.3)]">
          <Zap className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
      </motion.div>

      <div className="relative rounded-[1.3rem] bg-linear-to-br from-cyan-300/45 via-emerald-200/10 to-lime-400/45 p-px shadow-[0_26px_58px_rgba(2,8,20,0.6)]">
        <div
          className="relative rounded-[1.25rem] border border-(--border-subtle) bg-(--bg-subtle) backdrop-blur-md"
          style={{
            overflowX: 'auto',
            minWidth: '315px',
            maxWidth: '100%',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[14px_14px]" />

          <div className="relative flex items-center justify-between border-b border-(--border-subtle) bg-(--bg-subtle) px-2 py-2 sm:px-4 sm:py-3 min-h-[36px] sm:min-h-[48px]">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-300" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-(--text-primary)">
                active
              </span>
              <p className="text-sm font-semibold tracking-wide text-lime-200">portfolio.tsx</p>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-md border border-cyan-200/40 bg-cyan-200/10 px-2.5 py-1.5 text-xs sm:text-xs text-[11px] font-medium text-(--text-primary) transition hover:bg-cyan-200/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70"
            >
              {isCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {isCopied ? 'Copied' : 'Copy Code'}
            </button>
          </div>

          <div className="relative grid grid-cols-[26px_1fr] gap-3 px-4 py-4 font-mono text-xs leading-6 text-(--text-primary) sm:px-5 sm:text-sm">
            <div className="select-none pt-0.5 text-right text-[11px] text-slate-500">
              <p>1</p>
              <p>2</p>
              <p>3</p>
              <p>4</p>
              <p>5</p>
              <p>6</p>
              <p>7</p>
            </div>

            <div className="space-y-0.5">
              <p>
                <span className="text-blue-400">const</span> <span className="text-cyan-300">portfolio</span>{' '}
                <span className="text-(--text-secondary)">=</span> <span className="text-(--text-primary)">{'{'}</span>
              </p>

              <p className="pl-4">
                <span className="text-(--text-primary)">name</span>
                <span className="text-(--text-secondary)">:</span> <span className="text-amber-300">&quot;Wabi Dagim&quot;</span>
                <span className="text-(--text-secondary)">,</span>
              </p>

              <p className="pl-4">
                <span className="text-(--text-primary)">title</span>
                <span className="text-(--text-secondary)">:</span>{' '}
                <span className="text-amber-300">&quot;UI/UX Designer &amp; Developer&quot;</span>
                <span className="text-(--text-secondary)">,</span>
              </p>

              <p className="pl-4">
                <span className="text-(--text-primary)">skills</span>
                <span className="text-(--text-secondary)">:</span>{' '}
                <span className="text-(--text-primary)">[</span>
                <span className="text-amber-300">&quot;React&quot;</span>
                <span className="text-(--text-secondary)">, </span>
                <span className="text-amber-300">&quot;Python&quot;</span>
                <span className="text-(--text-secondary)">, </span>
                <span className="text-amber-300">&quot;TypeScript&quot;</span>
                <span className="text-(--text-secondary)">, </span>
                <span className="text-amber-300">&quot;AI/ML&quot;</span>
                <span className="text-(--text-secondary)">, </span>
                <span className="text-amber-300">&quot;Figma&quot;</span>
                <span className="text-(--text-secondary)">, </span>
                <span className="text-amber-300">&quot;Node&quot;</span>
                <span className="text-(--text-secondary)">, </span>
                <span className="text-amber-300">&quot;Next.js&quot;</span>
                <span className="text-(--text-primary)">]</span>
                <span className="text-(--text-secondary)">,</span>
              </p>

              <p>
                <span className="text-(--text-primary)">{'};'}</span>
              </p>

              <p className="pt-1 text-emerald-300/70">{`//`} runtime preview</p>

              <p>
                <span className="text-blue-400">console</span>
                <span className="text-(--text-primary)">.</span>
                <span className="text-cyan-300">log</span>
                <span className="text-(--text-primary)">(</span>
                <span className="console-log-preview">{typedText}</span>
                <motion.span
                  aria-hidden="true"
                  animate={shouldReduceMotion ? undefined : { opacity: [1, 0, 1] }}
                  transition={{ duration: 0.9, repeat: Number.POSITIVE_INFINITY }}
                  className="ml-0.5 console-log-cursor"
                >
                  {cursor}
                </motion.span>
                <span className="text-(--text-primary)">)</span>
              </p>
            </div>

            <div className="col-span-2 mt-1 h-px bg-linear-to-r from-transparent via-cyan-300/40 to-transparent" />
            <p className="col-span-2 text-[11px] uppercase tracking-[0.22em] text-slate-500">Type-safe profile object loaded</p>
          </div>

          <div className="absolute right-3 top-14 h-2 w-14 rounded-full bg-cyan-300/20 blur-sm" />
          <div className="absolute left-3 bottom-3 h-1.5 w-20 rounded-full bg-lime-300/20 blur-sm" />
        </div>
      </div>
    </motion.div>
  );
}