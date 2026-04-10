'use client';

import Link from 'next/link';
import { Download, Mail } from 'lucide-react';

export function ResumeActions() {
  return (
    <div className="flex flex-wrap gap-3 print:hidden">
      <a
        href="/resume/download"
        className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-cyan-300 to-sky-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:brightness-110"
      >
        <Download className="h-4 w-4" />
        Download PDF Resume
      </a>

      <Link
        href={{
          pathname: '/',
          query: {
            source: 'resume',
            subject: 'Resume Inquiry',
          },
          hash: 'contact',
        }}
        className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
      >
        <Mail className="h-4 w-4" />
        Contact Me
      </Link>
    </div>
  );
}
