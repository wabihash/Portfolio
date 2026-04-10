'use client';

import type { MouseEvent, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { queueSectionScroll, setPendingSectionScroll } from '@/lib/sectionScroll';

type SectionLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
};

function getSectionId(href: string): string | null {
  const hashIndex = href.indexOf('#');
  if (hashIndex === -1) {
    return null;
  }

  const sectionId = href.slice(hashIndex + 1).trim();
  return sectionId.length > 0 ? sectionId : null;
}

export function SectionLink({ href, className, children, onNavigate }: SectionLinkProps) {
  const router = useRouter();
  const pathname = usePathname();
  const sectionId = getSectionId(href);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!sectionId) {
      onNavigate?.();
      return;
    }

    event.preventDefault();
    onNavigate?.();

    if (pathname !== '/') {
      setPendingSectionScroll(sectionId);
      router.push(`/#${sectionId}`);
      return;
    }

    window.history.replaceState(null, '', `/#${sectionId}`);
    queueSectionScroll(sectionId);
  }

  return (
    <Link href={href} onClick={handleClick} scroll={false} className={className}>
      {children}
    </Link>
  );
}
