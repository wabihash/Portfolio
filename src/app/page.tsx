import Image from 'next/image';
import { AboutSection } from '../components/shared/AboutSection';
import { CoreExpertiseSection } from '../components/home/CoreExpertiseSection';
import { ServicesSection } from '../components/home/ServicesSection';
import { WorkSkillsSection } from '../components/home/WorkSkillsSection';
import { FutureStackSection } from '../components/home/FutureStackSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { ContactSection } from '../components/home/ContactSection';
import { ProjectsHeader } from '../components/shared/ProjectsHeader';
import { ProjectGrid } from '../features/dashboard/ProjectGrid';

export default function Home() {
  return (
    <main id="home" className="min-h-screen bg-[#020a1f] text-[#dbe8ff]">
      <section className="w-full pt-0">
        <div className="relative w-full overflow-hidden border-y border-white/10 bg-black/30 shadow-[0_18px_50px_rgba(0,0,0,0.45)]">
          <Image
            src="/images/Fiery CODE SOLVE with project highlights (1).png"
            alt="Flaming CODE SOLVE hero"
            width={1536}
            height={1024}
            priority
            className="h-auto w-full object-cover saturate-125 contrast-110"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(251,146,60,0.32),transparent_42%),radial-gradient(circle_at_50%_72%,rgba(220,38,38,0.24),transparent_45%)] mix-blend-screen"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-linear-to-b from-amber-300/20 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-44 w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/18 blur-3xl"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-[#020a1f]/85 to-transparent px-4 pb-4 pt-10 md:px-8 md:pb-7">
            <p className="mx-auto w-full max-w-6xl text-xs font-semibold tracking-wide text-[#f8e7c4] md:text-sm">
              And many more to explore
            </p>
          </div>
        </div>
      </section>
      <AboutSection />
      <CoreExpertiseSection />
      <ServicesSection />
      <WorkSkillsSection />
      <FutureStackSection />
      <TestimonialsSection />
      <section id="projects" className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8 md:py-12">
        <ProjectsHeader />
        <ProjectGrid />
      </section>
      <ContactSection />
    </main>
  );
}
