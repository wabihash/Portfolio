'use client';

import { Clapperboard, PenTool, Video, WandSparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

type FutureSkill = {
  id: string;
  title: string;
  description: string;
  status: string;
  icon: React.ComponentType<{ className?: string }>;
};

type ExpansionCard = {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

type GrowthSkill = {
  id: string;
  title: string;
  level: number;
  caption: string;
};

const FUTURE_SKILLS: FutureSkill[] = [
  {
    id: 'advanced-video-editing',
    title: 'Advanced Video Editing',
    description: 'Building strong storytelling workflows for short-form edits, transitions, and polished delivery.',
    status: 'Learning in Progress',
    icon: Clapperboard,
  },
  {
    id: 'pro-graphic-design',
    title: 'Pro Graphic Design',
    description: 'Expanding visual systems, typography direction, and brand-ready design execution.',
    status: 'Learning in Progress',
    icon: PenTool,
  },
];

const FUTURE_EXPANSION: ExpansionCard[] = [
  {
    id: 'video-motion',
    title: 'Video & Motion',
    description: 'Future service direction focused on motion-first storytelling and dynamic branded edits.',
    icon: Video,
  },
  {
    id: 'creative-direction',
    title: 'Creative Direction',
    description: 'Future expansion into concept framing, design consistency, and visual experience leadership.',
    icon: WandSparkles,
  },
];

const GROWTH_SKILLS: GrowthSkill[] = [
  {
    id: 'motion-design',
    title: 'Motion Design',
    level: 46,
    caption: 'Currently mastering Premiere Pro',
  },
  {
    id: 'visual-identity',
    title: 'Visual Identity',
    level: 43,
    caption: 'Currently mastering Adobe Illustrator',
  },
];

export function FutureStackSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="future-skills" aria-labelledby="future-skills-heading" className="mx-auto w-full max-w-6xl px-4 pt-8 md:px-8 md:pt-10">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-lg md:p-8"
      >
        <div className="flex flex-wrap items-center gap-3">
          <h2 id="future-skills-heading" className="text-2xl font-bold text-white md:text-3xl">
            Future <span className="text-cyan-300">Skills</span>
          </h2>
          <span className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-cyan-200">
            Coming Soon
          </span>
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#c8d8f7] md:text-base">
          Focused on growth areas currently in progress and upcoming expansion tracks.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {FUTURE_SKILLS.map((skill) => {
            const Icon = skill.icon;

            return (
              <article
                key={skill.id}
                className="group rounded-xl border border-white/10 bg-black/40 p-4 shadow-[0_14px_30px_rgba(0,0,0,0.25)] backdrop-blur-md transition duration-300 hover:border-cyan-300/35 hover:shadow-[0_16px_34px_rgba(56,189,248,0.16)]"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-cyan-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="animate-pulse rounded-full border border-purple-300/35 bg-purple-400/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-purple-200">
                    {skill.status}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-white md:text-lg">{skill.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{skill.description}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {FUTURE_EXPANSION.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.id}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-md transition duration-300 hover:scale-[1.01] hover:border-purple-300/30"
              >
                <span className="absolute top-3 right-3 rounded-full bg-linear-to-r from-purple-500 to-blue-500 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                  Coming Soon
                </span>
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-purple-200">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-3 text-base font-semibold text-white md:text-lg">{item.title}</h3>
                <p className="mt-2 pr-20 text-sm leading-relaxed text-white/70">{item.description}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {GROWTH_SKILLS.map((skill) => (
            <article key={skill.id} className="rounded-xl border border-white/10 bg-black/30 p-4 backdrop-blur-md">
              <div className="mb-2 flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-white md:text-base">{skill.title}</h3>
                <span className="text-xs font-semibold text-cyan-200">{skill.level}%</span>
              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-[#0c1a3f]" aria-hidden="true">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.85, ease: 'easeOut' }}
                  className="h-full rounded-full bg-linear-to-r from-cyan-400 to-purple-400"
                />
              </div>

              <p className="mt-2 text-xs text-white/60">{skill.caption}</p>
            </article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}