'use client';

import type { ComponentType } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

type ContactCardProps = {
  href?: string;
  label: string;
  value: string;
  icon: ComponentType<{ className?: string }>;
  className?: string;
};

export function ContactCard({ href, label, value, icon: Icon, className }: ContactCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const sharedClassName = cn(
    'group flex w-full items-center gap-4 rounded-2xl border border-gray-800/90 bg-black/40 p-4 backdrop-blur-md transition duration-300',
    'hover:border-amber-300/40 hover:bg-black/50 hover:shadow-[0_14px_30px_rgba(251,191,36,0.14)]',
    className,
  );

  const content = (
    <>
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-linear-to-br from-[#1f2937] via-[#3f2a1f] to-[#754f17] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
        <Icon className="h-5 w-5 text-amber-300" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-[var(--text-primary)]">{label}</p>
        <p className="truncate text-sm text-[var(--text-muted)]">{value}</p>
      </div>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={href.startsWith('mailto:') || href.startsWith('tel:') ? undefined : '_blank'}
        rel={href.startsWith('mailto:') || href.startsWith('tel:') ? undefined : 'noopener noreferrer'}
        whileHover={shouldReduceMotion ? undefined : { y: -4 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className={sharedClassName}
        aria-label={`${label}: ${value}`}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div
      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className={sharedClassName}
      role="group"
      aria-label={`${label}: ${value}`}
    >
      {content}
    </motion.div>
  );
}