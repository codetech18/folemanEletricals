import { useState } from "react";
import type { Project } from "../../types/works";
import { resolveWorkImage } from "../../utils/workAssets";
import { Lightbox } from "./Lightbox";
type Props = { project: Project; className?: string };
export function ProjectCard({ project, className = "" }: Props) {
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const src = resolveWorkImage(project.asset);
  return (
    <article
      className={`project-card relative overflow-hidden bg-[#1a1a1a] ${className}`}
    >
      <button
        type="button"
        className="project-open"
        onClick={() => setOpen(true)}
        disabled={!src || failed}
        aria-label={`View ${project.title}`}
      >
        {src && !failed ? (
          <img
            data-framing={
              project.asset === "IMG_1509.JPG" ? "letterboxed" : undefined
            }
            src={src}
            alt={project.title}
            loading="lazy"
            onError={() => setFailed(true)}
          />
        ) : (
          <span>{project.title} — image unavailable</span>
        )}
        <div className="project-shade" />
        <div className="project-info">
          <p>{project.category}</p>
          <h3>{project.title}</h3>
          <span>View photograph ↗</span>
        </div>
      </button>
      {open && src && (
        <Lightbox
          src={src}
          type="image"
          title={project.title}
          onClose={() => setOpen(false)}
        />
      )}
    </article>
  );
}
