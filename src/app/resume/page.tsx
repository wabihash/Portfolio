import type { Metadata } from 'next';
import { ResumeActions } from '@/components/ui/ResumeActions';
import { buildPageMetadata } from '@/lib/metadata';
import { RESUME_FILENAME } from '@/lib/resumePdf';

export const metadata: Metadata = buildPageMetadata({
  title: 'Resume',
  description: 'Resume of Wabi Dagim — view or download the latest CV.',
  path: '/resume',
});

const RESUME_PDF_URL = `/${RESUME_FILENAME}`;

export default function ResumePage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 md:px-8 md:py-12">
      <section className="section-card overflow-hidden p-4 sm:p-6 md:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl" style={{ color: 'var(--text-primary)' }}>
              Resume
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed md:text-base" style={{ color: 'var(--text-secondary)' }}>
              View my latest CV below or download it as a PDF.
            </p>
          </div>

          <ResumeActions />
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border" style={{ borderColor: 'var(--border-subtle)' }}>
          <iframe
            src={RESUME_PDF_URL}
            title="Wabi Dagim Resume"
            className="h-[min(82vh,1100px)] w-full bg-white"
          />
        </div>

        <p className="mt-4 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
          If the preview does not load,{' '}
          <a
            href={RESUME_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-cyan-600 underline-offset-2 hover:underline dark:text-cyan-400"
          >
            open the PDF in a new tab
          </a>{' '}
          or use the download button above.
        </p>
      </section>
    </main>
  );
}
