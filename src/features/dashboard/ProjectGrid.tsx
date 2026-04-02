import type { ReactElement } from 'react';
import { ProjectCard } from '@/features/dashboard/ProjectCard';
import { PROJECTS } from '@/shared/data/projects';

export function ProjectGrid(): ReactElement {
  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {PROJECTS.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </section>
  );
}
