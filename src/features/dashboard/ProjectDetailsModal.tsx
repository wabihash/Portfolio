'use client';

import { useEffect, useState, type ReactElement } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa6';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import type { Project } from '@/shared/types/project';

const FALLBACK_IMAGE = '/window.svg';

const ACCENT_THEME: Record<Project['accentColor'], { glow: string; badge: string; ring: string }> = {
  blue: {
    glow: 'shadow-[0_0_60px_rgba(96,165,250,0.18)]',
    badge: 'bg-blue-500/15 text-blue-200 border-blue-300/30',
    ring: 'from-blue-400/28 via-cyan-300/14 to-transparent',
  },
  emerald: {
    glow: 'shadow-[0_0_60px_rgba(52,211,153,0.18)]',
    badge: 'bg-emerald-500/15 text-emerald-200 border-emerald-300/30',
    ring: 'from-emerald-400/28 via-cyan-300/12 to-transparent',
  },
  orange: {
    glow: 'shadow-[0_0_60px_rgba(251,146,60,0.18)]',
    badge: 'bg-orange-500/15 text-orange-200 border-orange-300/30',
    ring: 'from-orange-400/28 via-amber-300/14 to-transparent',
  },
  violet: {
    glow: 'shadow-[0_0_60px_rgba(192,132,252,0.2)]',
    badge: 'bg-violet-500/15 text-violet-200 border-violet-300/30',
    ring: 'from-violet-400/28 via-fuchsia-300/14 to-transparent',
  },
  pink: {
    glow: 'shadow-[0_0_60px_rgba(244,114,182,0.18)]',
    badge: 'bg-pink-500/15 text-pink-200 border-pink-300/30',
    ring: 'from-pink-400/28 via-rose-300/14 to-transparent',
  },
  cyan: {
    glow: 'shadow-[0_0_60px_rgba(34,211,238,0.2)]',
    badge: 'bg-cyan-500/15 text-[var(--text-primary)] border-cyan-300/30',
    ring: 'from-cyan-400/28 via-sky-300/14 to-transparent',
  },
};

type ProjectDetailsModalProps = {
  onClose: () => void;
  project: Project | null;
};

function DetailBlock({
  eyebrow,
  title,
  body,
}: {
  body: string;
  eyebrow: string;
  title: string;
}): ReactElement {
  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-5 backdrop-blur-md">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-primary)]/65">{eyebrow}</p>
      <h4 className="mt-2 text-base font-semibold text-[var(--text-primary)]">{title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{body}</p>
    </div>
  );
}

export function ProjectDetailsModal({
  onClose,
  project,
}: ProjectDetailsModalProps): ReactElement | null {
  const shouldReduceMotion = useReducedMotion();
  const [imageSrc, setImageSrc] = useState(project?.image ?? FALLBACK_IMAGE);

  useEffect(() => {
    if (!project) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, project]);

  if (!project) {
    return null;
  }

  const accent = ACCENT_THEME[project.accentColor];

  return (
    <AnimatePresence>
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1 }}
        exit={shouldReduceMotion ? undefined : { opacity: 0 }}
        className="fixed inset-0 z-80 flex items-center justify-center p-4 md:p-8"
      >
        <button
          type="button"
          aria-label="Close project details"
          onClick={onClose}
          className="absolute inset-0 bg-[var(--bg-base)]/85 backdrop-blur-sm"
        />

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className={`relative z-10 flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-4xl border border-[var(--border-subtle)] bg-[var(--bg-base)] ${accent.glow} backdrop-blur-2xl`}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${project.id}-title`}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute left-5 top-8 z-20 inline-flex items-center gap-2 rounded-full border border-cyan-200/45 bg-[var(--surface-hover)] px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_14px_32px_rgba(2,8,20,0.48),0_0_26px_rgba(34,211,238,0.2)] backdrop-blur-md transition hover:-translate-y-0.5 hover:border-cyan-100/70 hover:bg-[var(--surface-deep)]"
            aria-label="Go back to the project grid"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" />
            <span>Back</span>
          </button>

          <div className={`pointer-events-none absolute inset-x-0 top-0 h-56 bg-linear-to-br ${accent.ring} blur-3xl`} />

          <div className="relative flex items-start justify-between gap-4 border-b border-[var(--border-subtle)] px-5 py-4 pl-24 md:px-7 md:pl-28">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-primary)]/65">Project Detail</p>
              <h3 id={`${project.id}-title`} className="mt-2 text-2xl font-semibold text-[var(--text-primary)] md:text-3xl">
                {project.title}
              </h3>
              {project.tagline && <p className="mt-2 text-sm text-[var(--text-secondary)]">{project.tagline}</p>}
            </div>
          </div>

          <div className="relative overflow-y-auto px-5 pb-6 pt-5 md:px-7 md:pb-7">
            <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
              <div className="space-y-5">
                <div className="relative overflow-hidden rounded-[1.6rem] border border-[var(--border-subtle)] bg-[var(--surface-inset)]">
                  <div className="relative aspect-16/10 w-full">
                    <Image
                      src={imageSrc}
                      alt={project.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      onError={() => setImageSrc(FALLBACK_IMAGE)}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#020814]/68 via-transparent to-white/5" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <DetailBlock eyebrow="Context" title="Problem" body={project.challenge} />
                  <DetailBlock eyebrow="Approach" title="Solution" body={project.solution} />
                  <DetailBlock eyebrow="Value" title="Outcome" body={project.impact} />
                </div>
              </div>

              <div className="space-y-5">
                <div className="rounded-[1.6rem] border border-[var(--border-subtle)] bg-[var(--surface)] p-5 backdrop-blur-md">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`rounded-full border px-3 py-1 text-xs font-medium ${accent.badge}`}>
                      {project.accentColor}
                    </span>
                    {project.featured && (
                      <span className="rounded-full border border-[var(--border-subtle)] bg-[var(--surface)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]">
                        Featured Work
                      </span>
                    )}
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">{project.description}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-[var(--border-subtle)] bg-[var(--surface)] px-3 py-1 text-xs text-[var(--text-secondary)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-300 to-sky-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:brightness-110"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] transition hover:bg-[var(--surface-hover)]"
                      >
                        <FaGithub className="h-4 w-4" />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>

                <div className="rounded-[1.6rem] border border-[var(--border-subtle)] bg-[var(--surface)] p-5 backdrop-blur-md">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-primary)]/65">Highlights</p>
                  <ul className="mt-4 space-y-3">
                    {project.highlights.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                        <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.6)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
