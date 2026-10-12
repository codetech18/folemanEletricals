import { useMemo, useState } from "react";
import { FilterBar, type WorkFilter } from "../components/works/FilterBar";
import { VideoShowcase } from "../components/works/VideoShowcase";
import { WorksCTA } from "../components/works/WorksCTA";
import { WorksGrid } from "../components/works/WorksGrid";
import { WorksHeader } from "../components/works/WorksHeader";
import { projects } from "../data/projects";

export function Works() {
  const [activeFilter, setActiveFilter] = useState<WorkFilter>("all");

  const visibleCount = useMemo(
    () =>
      projects.filter(
        (project) =>
          activeFilter === "all" || project.category === activeFilter,
      ).length,
    [activeFilter],
  );

  return (
    <main
      id="main-content"
      className="works-page overflow-x-hidden bg-[#0d0d0d] text-[#111]"
    >
      <WorksHeader />
      <FilterBar
        active={activeFilter}
        count={visibleCount}
        onChange={setActiveFilter}
      />
      <WorksGrid projects={projects} activeFilter={activeFilter} />
      <VideoShowcase />
      <WorksCTA />
    </main>
  );
}
