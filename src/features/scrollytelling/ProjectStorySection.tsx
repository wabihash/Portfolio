'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { PROJECTS } from '@/shared/data/projects';
import type { Project } from '@/shared/types/project';

const STORY_PROJECTS = PROJECTS.filter((project) => project.featured).slice(0, 3);

function KineticWords({ text, active }: { text: string; active: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const words = useMemo(() => text.split(' '), [text]);

  return (
    <span className="inline">
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 8, rotateX: -22 }}
          animate={
            shouldReduceMotion
              ? undefined
              : active
                ? { opacity: 1, y: 0, rotateX: 0 }
                : { opacity: 0.65, y: 2, rotateX: -10 }
          }
          transition={{ duration: 0.35, delay: shouldReduceMotion ? 0 : index * 0.015, ease: 'easeOut' }}
          className="inline-block"
        >
          {word}
          {index < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </span>
  );
}

function StoryStep({
  project,
  index,
  isActive,
  onActive,
}: {
  project: Project;
  index: number;
  isActive: boolean;
  onActive: (index: number) => void;
}) {
  const stepRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(stepRef, { amount: 0.6, margin: '-10% 0px -30% 0px' });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (inView) {
      onActive(index);
    }
  }, [index, inView, onActive]);

  return (
    <motion.article
      ref={stepRef}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.42, ease: 'easeOut' }}
      className={`rounded-2xl border p-4 backdrop-blur-md transition-colors duration-300 sm:p-5 md:p-6 ${
        isActive
          ? 'border-cyan-300/40 bg-cyan-300/10 shadow-[0_20px_48px_rgba(34,211,238,0.14)]'
          : 'border-[var(--border-subtle)] bg-[var(--surface)]'
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-secondary)]">
        Step {index + 1}
      </p>
      <h3 className="mt-3 text-xl font-semibold text-[var(--text-primary)] sm:text-2xl">
        <KineticWords text={project.title} active={isActive} />
      </h3>
      {project.tagline && <p className="mt-2 text-sm text-[var(--text-secondary)]">{project.tagline}</p>}

      <div className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-[0.95rem]">
        <p>
          <span className="font-semibold text-[var(--text-primary)]">Challenge:</span> {project.challenge}
        </p>
        <p>
          <span className="font-semibold text-[var(--text-primary)]">Solution:</span> {project.solution}
        </p>
        <p>
          <span className="font-semibold text-[var(--text-primary)]">Outcome:</span> {project.impact}
        </p>
      </div>
    </motion.article>
  );
}

export function ProjectStorySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = STORY_PROJECTS[activeIndex] ?? STORY_PROJECTS[0];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const maskRight = useTransform(scrollYProgress, [0, 1], ['85%', '0%']);
  const liveClipPath = useTransform(maskRight, (right) => `inset(0 ${right} 0 0 round 0)`);

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const nextIndex = Math.min(STORY_PROJECTS.length - 1, Math.floor(value * STORY_PROJECTS.length));
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  if (!activeProject) {
    return null;
  }

  return (
    <section
      id="project-story"
      ref={sectionRef}
      aria-labelledby="project-story-heading"
      className="relative z-0 mx-auto mb-4 w-full max-w-6xl px-4 py-8 md:mb-8 md:px-8 md:py-12"
    >
      <div className="mb-6 text-center md:mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--text-primary)]/75">Scrollytelling</p>
        <h2 id="project-story-heading" className="mt-3 text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
          From Code View to Live Impact
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">
          Scroll through featured project stories to see how each build moves from technical decisions to user-facing outcomes.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_1.05fr] lg:gap-8">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] backdrop-blur-md">
            <div className="border-b border-[var(--border-subtle)] px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-secondary)]">
              {activeProject.title} Preview
            </div>

            <div className="relative h-60 w-full sm:h-72 md:h-96">
              <div className="absolute inset-0 grayscale">
                <Image
                  src={activeProject.image}
                  alt={`${activeProject.imageAlt} in code view`}
                  fill
                  className="object-cover opacity-55"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>

              <motion.div
                style={shouldReduceMotion ? undefined : { clipPath: liveClipPath }}
                className="absolute inset-0"
              >
                <Image
                  src={activeProject.image}
                  alt={activeProject.imageAlt}
                  fill
                  className="object-cover saturate-125"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </motion.div>

              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#020814]/85 via-transparent to-[#020814]/20" />

              <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4">
                <div className="rounded-xl border border-cyan-200/20 bg-[var(--bg-subtle)] p-2.5 font-mono text-[10px] leading-5 text-[var(--text-primary)] backdrop-blur-sm sm:p-3 sm:text-xs sm:leading-6">
                  <p className="text-[var(--text-secondary)]">{`//`} Code View</p>
                  <p className="mt-0.5 sm:mt-1">
                    const outcome = &quot;{activeProject.impact}&quot;;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {STORY_PROJECTS.map((project, index) => (
            <StoryStep
              key={project.id}
              project={project}
              index={index}
              isActive={activeIndex === index}
              onActive={setActiveIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
