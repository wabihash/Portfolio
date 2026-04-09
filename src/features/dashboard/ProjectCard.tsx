"use client";

import { useState, type KeyboardEvent, type ReactElement } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import type { Project } from '@/shared/types/project';

const FALLBACK_IMAGE = '/window.svg';

type ProjectCardProps = {
  onOpenDetails: (project: Project) => void;
  project: Project;
};

const ACCENT_THEME: Record<Project['accentColor'], { ring: string; badge: string; primaryButton: string }> = {
  blue: {
    ring: 'from-blue-400/40 to-transparent',
    badge: 'text-blue-200 border-blue-300/40 bg-blue-500/20',
    primaryButton: 'bg-linear-to-r from-yellow-400 to-orange-500 hover:brightness-110',
  },
  emerald: {
    ring: 'from-emerald-400/40 to-transparent',
    badge: 'text-emerald-200 border-emerald-300/40 bg-emerald-500/20',
    primaryButton: 'bg-linear-to-r from-yellow-400 to-orange-500 hover:brightness-110',
  },
  orange: {
    ring: 'from-orange-400/40 to-transparent',
    badge: 'text-orange-200 border-orange-300/40 bg-orange-500/20',
    primaryButton: 'bg-linear-to-r from-yellow-400 to-orange-500 hover:brightness-110',
  },
  violet: {
    ring: 'from-violet-400/40 to-transparent',
    badge: 'text-violet-200 border-violet-300/40 bg-violet-500/20',
    primaryButton: 'bg-linear-to-r from-yellow-400 to-orange-500 hover:brightness-110',
  },
  pink: {
    ring: 'from-pink-400/40 to-transparent',
    badge: 'text-pink-200 border-pink-300/40 bg-pink-500/20',
    primaryButton: 'bg-linear-to-r from-yellow-400 to-orange-500 hover:brightness-110',
  },
  cyan: {
    ring: 'from-cyan-400/40 to-transparent',
    badge: 'text-cyan-200 border-cyan-300/40 bg-cyan-500/20',
    primaryButton: 'bg-linear-to-r from-yellow-400 to-orange-500 hover:brightness-110',
  },
};

export function ProjectCard({ onOpenDetails, project }: ProjectCardProps): ReactElement {
  const accent = ACCENT_THEME[project.accentColor];
  const [imageSrc, setImageSrc] = useState<string>(project.image || FALLBACK_IMAGE);
  const shouldReduceMotion = useReducedMotion();

  const openDetails = () => onOpenDetails(project);

  const handleCardKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.currentTarget !== event.target) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openDetails();
    }
  };

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_14px_36px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_44px_rgba(0,0,0,0.45)] focus-within:ring-2 focus-within:ring-white/30"
    >
      <div className={`pointer-events-none absolute -top-20 -right-16 w-64 h-64 bg-linear-to-b ${accent.ring} blur-3xl`} />

      <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl">
        <Image
          src={imageSrc}
          alt={project.imageAlt}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
          decoding="async"
          onError={() => setImageSrc(FALLBACK_IMAGE)}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-end justify-end p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            type="button"
            onClick={openDetails}
            onKeyDown={handleCardKeyDown}
            aria-label={`Open the ${project.title} case study`}
            className="cursor-pointer rounded-full border border-cyan-300/25 bg-[#03101d]/75 px-3 py-1 text-[11px] font-medium tracking-wide text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.18)] backdrop-blur-sm transition hover:border-cyan-200/40 hover:bg-[#071726]/90 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/50"
          >
            View Case Study
          </button>
        </div>
        {project.featured && (
          <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold border ${accent.badge}`}>
            Featured
          </span>
        )}
      </div>

      <h3 className="text-lg font-semibold text-white">{project.title}</h3>
      {project.tagline && <p className="mt-1 text-sm text-gray-400">{project.tagline}</p>}
      <p className="mt-2 text-sm text-white/70 leading-relaxed">{project.description}</p>

      <div className="flex flex-wrap gap-2 mt-3">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-3 mt-4">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`rounded-md px-4 py-2 text-sm font-medium text-black shadow-[0_10px_24px_rgba(251,146,60,0.28)] transition duration-300 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${accent.primaryButton}`}
        >
          Live Demo
        </a>

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition duration-300 hover:scale-[1.03] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            GitHub
          </a>
        )}
      </div>
    </motion.article>
  );
}
