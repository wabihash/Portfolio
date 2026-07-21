import { readFile } from 'fs/promises';
import path from 'path';
import { RESUME_FILENAME } from '@/lib/resumePdf';

export const runtime = 'nodejs';

export async function GET() {
  const pdfPath = path.join(process.cwd(), 'public', RESUME_FILENAME);
  const pdf = await readFile(pdfPath);

  return new Response(pdf, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${RESUME_FILENAME}"`,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
