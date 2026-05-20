import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import type { Project } from '../../types/works';
import type { WorkFilter } from './FilterBar';
import { ProjectCard } from './ProjectCard';

gsap.registerPlugin(ScrollTrigger);

const layout = [
  'md:col-span-4 md:min-h-[520px]',
  'md:col-span-2 md:min-h-[520px]',
  'md:col-span-2 md:min-h-[400px]',
  'md:col-span-2 md:min-h-[400px]',
  'md:col-span-2 md:min-h-[400px]',
  'md:col-span-6 md:min-h-[480px]',
  'md:col-span-2 md:min-h-[520px]',
  'md:col-span-4 md:min-h-[520px]',
  'md:col-span-2 md:min-h-[400px]',
  'md:col-span-2 md:min-h-[400px]',
  'md:col-span-2 md:min-h-[400px]',
  'md:col-span-6 md:min-h-[440px]',
];

type WorksGridProps = {
  projects: Project[];
  activeFilter: WorkFilter;
};

export function WorksGrid({ projects, activeFilter }: WorksGridProps) {
  const scope = useRef<HTMLElement>(null);
  const visibleIds = useMemo(
    () => new Set(projects.filter((project) => activeFilter === 'all' || project.category === activeFilter).map((project) => project.id)),
    [activeFilter, projects],
  );

  useGSAP(
    () => {
      gsap.fromTo(
        '.project-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: scope.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      );
    },
    { scope },
  );

  useEffect(() => {
    projects.forEach((project) => {
      const elements = gsap.utils.toArray<HTMLElement>(`.project-card[data-category="${project.category}"]`);
      const isVisible = activeFilter === 'all' || visibleIds.has(project.id);
      elements.forEach((element) => {
        if (element.textContent?.includes(project.title)) {
          gsap.to(element, { opacity: isVisible ? 1 : 0.15, scale: isVisible ? 1 : 0.96, duration: 0.3, ease: 'power2.out' });
        }
      });
    });
  }, [activeFilter, projects, visibleIds]);

  return (
    <section ref={scope} className="overflow-hidden bg-[#f2f1ed] px-4 py-10 sm:px-5 sm:py-16 md:px-20 md:py-20 md:pb-32">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} className={`min-h-[320px] sm:min-h-[420px] ${layout[index] ?? 'md:col-span-2 md:min-h-[400px]'}`} />
        ))}
      </div>
    </section>
  );
}
