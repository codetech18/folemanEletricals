import { useEffect, useMemo, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FilterBar, type WorkFilter } from '../components/works/FilterBar';
import { TestimonialsStrip } from '../components/works/TestimonialsStrip';
import { VideoShowcase } from '../components/works/VideoShowcase';
import { WorksCTA } from '../components/works/WorksCTA';
import { WorksGrid } from '../components/works/WorksGrid';
import { WorksHeader } from '../components/works/WorksHeader';
import { projects } from '../data/projects';
import { useCustomCursor } from '../hooks/useCustomCursor';

export function Works() {
  const [activeFilter, setActiveFilter] = useState<WorkFilter>('all');
  useCustomCursor();

  const visibleCount = useMemo(
    () => projects.filter((project) => activeFilter === 'all' || project.category === activeFilter).length,
    [activeFilter],
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <main className="works-page overflow-x-hidden bg-[#0d0d0d] text-[#111]">
      <WorksHeader />
      <FilterBar active={activeFilter} count={visibleCount} onChange={setActiveFilter} />
      <WorksGrid projects={projects} activeFilter={activeFilter} />
      <VideoShowcase />
      <TestimonialsStrip />
      <WorksCTA />
    </main>
  );
}
