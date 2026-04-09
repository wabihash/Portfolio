'use client';

import { useState, type ReactElement } from 'react';
import { ProjectCard } from '@/features/dashboard/ProjectCard';
import { ProjectDetailsModal } from '@/features/dashboard/ProjectDetailsModal';
import { PROJECTS } from '@/shared/data/projects';
import type { Project } from '@/shared/types/project';

export function ProjectGrid(): ReactElement {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpenDetails={setSelectedProject}
          />
        ))}
      </section>
      <ProjectDetailsModal
        key={selectedProject?.id ?? 'project-modal'}
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
