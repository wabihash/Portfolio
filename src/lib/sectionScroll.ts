const NAVBAR_OFFSET_PX = 96;
const RETRY_INTERVAL_MS = 120;
const MAX_SCROLL_RETRIES = 30;

function decodeSectionId(sectionId: string): string {
  try {
    return decodeURIComponent(sectionId);
  } catch {
    return sectionId;
  }
}

function scrollToSection(sectionId: string, behavior: ScrollBehavior): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const decodedId = decodeSectionId(sectionId.replace(/^#/, ''));
  const element = document.getElementById(decodedId);
  if (!element) {
    return false;
  }

  const y = Math.max(0, window.scrollY + element.getBoundingClientRect().top - NAVBAR_OFFSET_PX);
  window.scrollTo({ top: y, behavior });
  return true;
}

export function queueSectionScroll(sectionId: string, behavior: ScrollBehavior = 'smooth'): void {
  const id = sectionId.replace(/^#/, '');
  let attempts = 0;

  const tryScroll = () => {
    const didScroll = scrollToSection(id, behavior);
    if (didScroll || attempts >= MAX_SCROLL_RETRIES) {
      return;
    }

    attempts += 1;
    window.setTimeout(tryScroll, RETRY_INTERVAL_MS);
  };

  window.requestAnimationFrame(tryScroll);
}

export function setPendingSectionScroll(sectionId: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.sessionStorage.setItem('pending-section-scroll', sectionId.replace(/^#/, ''));
}

export function popPendingSectionScroll(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const sectionId = window.sessionStorage.getItem('pending-section-scroll');
  if (!sectionId) {
    return null;
  }

  window.sessionStorage.removeItem('pending-section-scroll');
  return sectionId;
}
