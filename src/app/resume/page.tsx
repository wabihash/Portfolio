import type { Metadata } from 'next';
import { ResumeActions } from '@/components/ui/ResumeActions';
import { buildPageMetadata } from '@/lib/metadata';
import { CORE_EXPERTISE_BADGES } from '@/shared/data/homeSections';
import { CONTACT_ITEMS } from '@/shared/data/contact';
import { PROJECTS } from '@/shared/data/projects';
import { RESUME_FOCUS_AREAS, RESUME_SUMMARY } from '@/shared/data/resume';

export const metadata: Metadata = buildPageMetadata({
  title: 'Resume',
  description:
    'Resume overview for Wabi, fullstack developer focused on modern web products and AI-ready experiences.',
  path: '/resume',
});

const FEATURED_RESUME_PROJECTS = PROJECTS.slice(0, 3);

function ResumeField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-700">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-slate-900">{value}</p>
    </div>
  );
}

export default function ResumePage() {
  const publicContactItems = CONTACT_ITEMS.filter((item) => item.id !== 'whatsapp');

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 print:max-w-none print:px-0 print:py-0 md:px-8 md:py-12">
      <section className="overflow-hidden rounded-sm border border-slate-400 bg-[#f2f2f2] shadow-[0_22px_54px_rgba(15,23,42,0.2)] print:rounded-none print:border-0 print:bg-white print:shadow-none">
        <div className="px-4 pt-4 md:px-6 md:pt-6">
          <div className="border-2 border-slate-700 px-4 py-4 text-center md:px-8 md:py-6">
            <h1 className="text-2xl font-extrabold uppercase tracking-[0.2em] text-slate-900 md:text-4xl">Wabi Dagim</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr]">
          <aside className="border-r border-slate-400 bg-[#e0e0e0] px-4 py-6 md:px-5">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-800">Personal</h2>

            <div className="mt-5 space-y-4">
              <ResumeField label="Name" value="Wabi Dagim" />
              <ResumeField label="Date of Birth" value="2004" />
              {publicContactItems.map((item) => (
                <ResumeField key={item.id} label={item.label} value={item.value} />
              ))}
              <ResumeField label="Role" value="Fullstack Developer" />
              <ResumeField label="Focus" value="UI/UX, Frontend, AI-ready products" />
            </div>

            <div className="mt-6 border-t border-slate-400 pt-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-800">Core Skills</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-800">{CORE_EXPERTISE_BADGES.slice(0, 6).join(', ')}</p>
            </div>
          </aside>

          <div className="px-4 py-6 md:px-6">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3 print:hidden">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-600">Resume View</p>
              <ResumeActions />
            </div>

            <section>
              <p className="text-sm leading-relaxed text-slate-800">{RESUME_SUMMARY}</p>
            </section>

            <section className="mt-6 border-t-2 border-slate-400 pt-5">
              <h2 className="text-base font-extrabold uppercase tracking-[0.2em] text-slate-900">Selected Projects</h2>

              <div className="mt-4 space-y-4">
                {FEATURED_RESUME_PROJECTS.map((project) => (
                  <article key={project.id}>
                    <div className="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{project.title}</h3>
                        {project.tagline && <p className="text-sm text-slate-700">{project.tagline}</p>}
                      </div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
                        {project.techStack.slice(0, 3).join(' · ')}
                      </p>
                    </div>

                    <p className="mt-2 text-sm leading-relaxed text-slate-800">{project.impact}</p>

                    <ul className="mt-2 space-y-1.5 text-sm text-slate-800">
                      {project.highlights.slice(0, 2).map((highlight) => (
                        <li key={highlight}>• {highlight}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            <section className="mt-6 border-t-2 border-slate-400 pt-5">
              <h2 className="text-base font-extrabold uppercase tracking-[0.2em] text-slate-900">Work Focus</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-800">
                {RESUME_FOCUS_AREAS.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
