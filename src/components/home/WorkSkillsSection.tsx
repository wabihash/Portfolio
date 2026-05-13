import type { ComponentType, ReactNode } from 'react';
import { Code2, Globe, PenTool } from 'lucide-react';
import { WORK_SKILLS, type WorkSkillIcon } from '@/shared/data/homeSections';

type SkillBarProps = {
  name: string;
  level: number;
  icon: ReactNode;
};

function SkillBar({ name, level, icon }: SkillBarProps) {
  return (
    <article className="inset-card p-4 md:p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-orange-500 dark:text-orange-400">{icon}</span>
          <h3 className="text-sm font-semibold md:text-base" style={{ color: 'var(--text-primary)' }}>{name}</h3>
        </div>
        <span className="text-sm font-semibold text-orange-600 dark:text-orange-300">{level}%</span>
      </div>

      <div className="h-2.5 w-full overflow-hidden rounded-full bg-[var(--track-bg)]" aria-hidden="true">
        <div className="h-full rounded-full bg-orange-500 transition-[width] duration-700 ease-out" style={{ width: `${level}%` }} />
      </div>
    </article>
  );
}

const SKILL_ICONS: Record<WorkSkillIcon, ComponentType<{ className?: string }>> = {
  figma: PenTool,
  wordpress: Globe,
  code: Code2,
};

export function WorkSkillsSection() {
  return (
    <section id="skills" aria-labelledby="work-skills-heading" className="mx-auto w-full max-w-6xl px-4 pt-8 md:px-8 md:pt-10">
      <div className="section-card p-5 md:p-8">
        <h2 id="work-skills-heading" className="text-2xl font-bold md:text-3xl" style={{ color: 'var(--text-primary)' }}>
          Work <span className="text-orange-500 dark:text-orange-400">Skills</span>
        </h2>

        <div className="mt-5 space-y-4">
          {WORK_SKILLS.map((skill) => {
            const Icon = SKILL_ICONS[skill.icon];
            return <SkillBar key={skill.id} name={skill.name} level={skill.level} icon={<Icon className="h-5 w-5" />} />;
          })}
        </div>
      </div>
    </section>
  );
}
