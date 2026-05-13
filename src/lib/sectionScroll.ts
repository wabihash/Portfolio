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

  element.scrollIntoView({ behavior, block: 'start', inline: 'nearest' });
  return true;
}

export function queueSectionScroll(sectionId: string, behavior: ScrollBehavior = 'smooth'): void {
  const id = sectionId.replace(/^#/, '');
  window.requestAnimationFrame(() => {
    scrollToSection(id, behavior);
  });
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
