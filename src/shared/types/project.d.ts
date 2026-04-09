export type AccentColor = 'blue' | 'emerald' | 'orange' | 'violet' | 'pink' | 'cyan';

export interface Project {
  id: string;
  title: string;
  tagline?: string;
  description: string;
  challenge: string;
  solution: string;
  impact: string;
  highlights: string[];
  techStack: string[];
  accentColor: AccentColor;
  liveUrl: string;
  githubUrl?: string;
  featured: boolean;
  image: string;
  imageAlt: string;
}
