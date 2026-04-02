import { Home, FolderKanban, User, Mail, LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'About', href: '/about', icon: User },
  { label: 'Projects', href: '/projects', icon: FolderKanban },
  { label: 'Contact', href: '/contact', icon: Mail },
];
