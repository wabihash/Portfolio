import type { Metadata } from 'next';
import Image from 'next/image';
import { buildPageMetadata } from '@/lib/metadata';
import { HeroSection } from '../components/home/HeroSection';
import { ProofSection } from '../components/home/ProofSection';
import { AboutSection } from '../components/shared/AboutSection';
import { CoreExpertiseSection } from '../components/home/CoreExpertiseSection';
import { ServicesSection } from '../components/home/ServicesSection';
import { WorkSkillsSection } from '../components/home/WorkSkillsSection';
import { FutureStackSection } from '../components/home/FutureStackSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { ContactSection } from '../components/home/ContactSection';
import { ProjectsHeader } from '../components/shared/ProjectsHeader';
import { ProjectGrid } from '../features/dashboard/ProjectGrid';
import { CodeEditorHero } from '../features/hero/CodeEditorHero';
import { ProjectStorySection } from '../features/scrollytelling/ProjectStorySection';

export const metadata: Metadata = buildPageMetadata({
  title: 'Wabi Dagim | Fullstack Developer & AI Enthusiast',
  description:
    "Explore Wabi's portfolio of full-stack products, modern UI systems, AI-powered experiences, and polished case-study work.",
  path: '/',
});

const HERO_IMAGE_SRC = '/images/ChatGPT Image Apr 11, 2026, 01_32_26 PM.png';
const HERO_IMAGE_ALT = 'Fiery coding hero banner';

export default function Home() {
  return (
    <main id="home" className="min-h-screen bg-transparent" style={{ color: 'var(--text-primary)' }}>
      <section className="w-full pt-0">
        <div className="relative w-full overflow-hidden border-y border-(--border-subtle) bg-black/60 shadow-[0_18px_50px_rgba(0,0,0,0.45)]">
          <Image
            src={HERO_IMAGE_SRC}
            alt={HERO_IMAGE_ALT}
            width={1536}
            height={1024}
            priority
            className="h-136 w-full object-cover saturate-90 contrast-90 opacity-60 sm:h-auto"
            style={{ zIndex: 0 }}
          />
          {/* Strong dark overlay for readability */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/30 z-10"
          />
          {/* Subtle color overlays for accent */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(251,146,60,0.18),transparent_42%),radial-gradient(circle_at_50%_72%,rgba(220,38,38,0.12),transparent_45%)] mix-blend-screen z-20"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-linear-to-b from-amber-300/10 to-transparent z-20"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-44 w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-3xl z-20"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-[#020a1f]/90 via-[#020a1f]/45 to-transparent z-20" />
          <HeroSection />
        </div>
      </section>
      <section className="mx-auto w-full max-w-6xl px-4 pb-6 pt-6 md:px-8 md:pb-8 md:pt-8">
        <CodeEditorHero />
      </section>
      <ProofSection />
      <AboutSection />
      <CoreExpertiseSection />
      <ServicesSection />
      <WorkSkillsSection />
      <FutureStackSection />
      <TestimonialsSection />
      <ProjectStorySection />
      <section id="projects" className="relative z-20 mx-auto w-full max-w-6xl px-4 pt-10 pb-8 md:px-8 md:pt-12 md:pb-12">
        <ProjectsHeader />
        <ProjectGrid />
      </section>
      <ContactSection />
    </main>
  );
}
