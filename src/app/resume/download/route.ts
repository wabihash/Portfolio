import { buildResumePdf, RESUME_FILENAME } from '@/lib/resumePdf';

export const runtime = 'nodejs';

export async function GET() {
  const pdf = buildResumePdf();

  return new Response(pdf, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${RESUME_FILENAME}"`,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
