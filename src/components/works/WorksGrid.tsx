import type { Project } from "../../types/works";
import type { WorkFilter } from "./FilterBar";
import { ProjectCard } from "./ProjectCard";
export function WorksGrid({
  projects,
  activeFilter,
}: {
  projects: Project[];
  activeFilter: WorkFilter;
}) {
  const visible = projects.filter(
    (p) => activeFilter === "all" || p.category === activeFilter,
  );
  return (
    <section aria-label="Project photographs" className="work-gallery">
      <div className="content-width project-grid">
        {visible.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
      {!visible.length && <p>No photographs in this category yet.</p>}
    </section>
  );
}
