import { CONTACT_ITEMS } from '@/shared/data/contact';
import { CORE_EXPERTISE_BADGES } from '@/shared/data/homeSections';
import { PROJECTS } from '@/shared/data/projects';
import { RESUME_FOCUS_AREAS, RESUME_SUMMARY } from '@/shared/data/resume';

const PAGE_WIDTH = 612;
const PAGE_HEIGHT = 792;
const PAGE_TOP = 742;
const PAGE_BOTTOM = 56;
const PAGE_LEFT = 50;
const PAGE_RIGHT = 50;
const FEATURED_PROJECTS = PROJECTS.slice(0, 3);

type PdfFont = 'F1' | 'F2';

type PdfLine = {
  font: PdfFont;
  size: number;
  text: string;
  x: number;
  y: number;
};

type PageState = {
  lines: PdfLine[];
  y: number;
};

type TextBlockOptions = {
  font?: PdfFont;
  size?: number;
  x?: number;
  maxWidth?: number;
  lineHeight?: number;
  spacingBefore?: number;
  spacingAfter?: number;
};

export const RESUME_FILENAME = 'Wabi-Resume.pdf';

function sanitizeText(value: string) {
  return value
    .replace(/’/g, "'")
    .replace(/“|”/g, '"')
    .replace(/–|—/g, '-')
    .replace(/∞/g, 'infinity')
    .replace(/[^\x20-\x7E]/g, '')
    .trim();
}

function escapePdfText(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

function estimateTextWidth(text: string, fontSize: number) {
  return text.length * fontSize * 0.52;
}

function wrapText(text: string, maxWidth: number, fontSize: number) {
  const words = sanitizeText(text).split(/\s+/).filter(Boolean);

  if (words.length === 0) {
    return [''];
  }

  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const nextLine = currentLine ? `${currentLine} ${word}` : word;

    if (estimateTextWidth(nextLine, fontSize) <= maxWidth || !currentLine) {
      currentLine = nextLine;
      continue;
    }

    lines.push(currentLine);
    currentLine = word;
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

function createPage(): PageState {
  return {
    lines: [],
    y: PAGE_TOP,
  };
}

function ensureSpace(pages: PageState[], height: number) {
  const currentPage = pages[pages.length - 1];

  if (currentPage.y - height >= PAGE_BOTTOM) {
    return currentPage;
  }

  const nextPage = createPage();
  pages.push(nextPage);
  return nextPage;
}

function addTextBlock(pages: PageState[], text: string, options: TextBlockOptions = {}) {
  const {
    font = 'F1',
    size = 11,
    x = PAGE_LEFT,
    maxWidth = PAGE_WIDTH - PAGE_LEFT - PAGE_RIGHT,
    lineHeight = size * 1.45,
    spacingBefore = 0,
    spacingAfter = 0,
  } = options;

  const lines = wrapText(text, maxWidth, size);
  const currentPage = ensureSpace(pages, spacingBefore + lines.length * lineHeight + spacingAfter);
  currentPage.y -= spacingBefore;

  for (const line of lines) {
    currentPage.lines.push({
      font,
      size,
      text: line,
      x,
      y: currentPage.y,
    });
    currentPage.y -= lineHeight;
  }

  currentPage.y -= spacingAfter;
}

function addSectionTitle(pages: PageState[], title: string) {
  addTextBlock(pages, title, {
    font: 'F2',
    size: 13,
    spacingBefore: 8,
    spacingAfter: 4,
  });
}

function addBulletList(pages: PageState[], items: string[], indent = PAGE_LEFT + 16) {
  for (const item of items) {
    addTextBlock(pages, `- ${item}`, {
      x: indent,
      maxWidth: PAGE_WIDTH - indent - PAGE_RIGHT,
      spacingAfter: 2,
    });
  }
}

function buildResumePages() {
  const pages = [createPage()];
  const publicContactItems = CONTACT_ITEMS.filter((item) => item.id !== 'whatsapp');

  addTextBlock(pages, 'Wabi', {
    font: 'F2',
    size: 24,
  });
  addTextBlock(pages, 'Fullstack Developer', {
    font: 'F2',
    size: 15,
    spacingAfter: 6,
  });
  addTextBlock(pages, RESUME_SUMMARY, {
    size: 11,
    spacingAfter: 10,
  });

  addSectionTitle(pages, 'Contact');
  addBulletList(
    pages,
    publicContactItems.map((item) => `${item.label}: ${item.value}`)
  );

  addSectionTitle(pages, 'Core Skills');
  addTextBlock(pages, CORE_EXPERTISE_BADGES.join(' | '), {
    size: 11,
    spacingAfter: 6,
  });

  addSectionTitle(pages, 'Focus');
  addBulletList(pages, [...RESUME_FOCUS_AREAS]);

  addSectionTitle(pages, 'Selected Projects');

  for (const project of FEATURED_PROJECTS) {
    addTextBlock(pages, project.title, {
      font: 'F2',
      size: 12,
      spacingBefore: 4,
      spacingAfter: 2,
    });

    if (project.tagline) {
      addTextBlock(pages, project.tagline, {
        font: 'F1',
        size: 10,
        spacingAfter: 2,
      });
    }

    addTextBlock(pages, project.impact, {
      size: 10.5,
      spacingAfter: 2,
    });

    addBulletList(pages, project.highlights.slice(0, 2), PAGE_LEFT + 16);

    addTextBlock(pages, `Tech: ${project.techStack.slice(0, 4).join(', ')}`, {
      size: 10,
      spacingAfter: 4,
    });
  }

  return pages;
}

function buildContentStream(lines: PdfLine[]) {
  return lines
    .map(
      ({ font, size, text, x, y }) =>
        `BT\n/${font} ${size} Tf\n1 0 0 1 ${x} ${y} Tm\n(${escapePdfText(text)}) Tj\nET`
    )
    .join('\n');
}

export function buildResumePdf() {
  const pages = buildResumePages();
  const totalPages = pages.length;
  const pageObjectNumbers = pages.map((_, index) => 3 + index * 2);
  const contentObjectNumbers = pages.map((_, index) => 4 + index * 2);
  const fontRegularObjectNumber = 3 + totalPages * 2;
  const fontBoldObjectNumber = fontRegularObjectNumber + 1;

  const objects: string[] = [];

  objects[1] = `<< /Type /Catalog /Pages 2 0 R >>`;
  objects[2] = `<< /Type /Pages /Count ${totalPages} /Kids [${pageObjectNumbers.map((id) => `${id} 0 R`).join(' ')}] >>`;

  pages.forEach((page, index) => {
    const pageObjectNumber = pageObjectNumbers[index];
    const contentObjectNumber = contentObjectNumbers[index];
    const contentStream = buildContentStream(page.lines);

    objects[pageObjectNumber] = [
      '<<',
      '/Type /Page',
      '/Parent 2 0 R',
      `/MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}]`,
      `/Resources << /Font << /F1 ${fontRegularObjectNumber} 0 R /F2 ${fontBoldObjectNumber} 0 R >> >>`,
      `/Contents ${contentObjectNumber} 0 R`,
      '>>',
    ].join('\n');

    objects[contentObjectNumber] = `<< /Length ${Buffer.byteLength(contentStream, 'utf8')} >>\nstream\n${contentStream}\nendstream`;
  });

  objects[fontRegularObjectNumber] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>';
  objects[fontBoldObjectNumber] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>';

  const objectCount = fontBoldObjectNumber;
  let pdf = '%PDF-1.4\n';
  const offsets: number[] = [0];

  for (let objectNumber = 1; objectNumber <= objectCount; objectNumber += 1) {
    offsets[objectNumber] = Buffer.byteLength(pdf, 'utf8');
    pdf += `${objectNumber} 0 obj\n${objects[objectNumber]}\nendobj\n`;
  }

  const xrefOffset = Buffer.byteLength(pdf, 'utf8');
  pdf += `xref\n0 ${objectCount + 1}\n`;
  pdf += '0000000000 65535 f \n';

  for (let objectNumber = 1; objectNumber <= objectCount; objectNumber += 1) {
    pdf += `${offsets[objectNumber].toString().padStart(10, '0')} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${objectCount + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return Buffer.from(pdf, 'utf8');
}
