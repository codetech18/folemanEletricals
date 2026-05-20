import { useRef, useState } from 'react';
import gsap from 'gsap';
import type { Project } from '../../types/works';
import { resolveWorkImage } from '../../utils/workAssets';

type ProjectCardProps = {
  project: Project;
  className?: string;
};

export function ProjectCard({ project, className = '' }: ProjectCardProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const src = resolveWorkImage(project.asset);

  const show = () => {
    gsap.to(imageRef.current, { scale: 1.07, duration: 0.55, ease: 'power2.out' });
    gsap.to(overlayRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out' });
    gsap.to(contentRef.current, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' });
  };

  const hide = () => {
    gsap.to(imageRef.current, { scale: 1, duration: 0.55, ease: 'power2.out' });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.4, ease: 'power2.out' });
    gsap.to(contentRef.current, { y: 20, opacity: 0, duration: 0.3, ease: 'power2.out' });
  };

  return (
    <article
      data-category={project.category}
      data-cursor="view"
      onMouseEnter={show}
      onMouseLeave={hide}
      className={`project-card relative overflow-hidden bg-[#1a1a1a] md:cursor-none ${className}`}
    >
      {src && !failed ? (
        <img
          ref={imageRef}
          src={src}
          alt={project.title}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover will-change-transform"
        />
      ) : (
        <div className="grid h-full w-full place-items-center bg-[#1a1a1a] px-8 text-center font-display text-3xl leading-none text-[#333]">
          {project.title}
        </div>
      )}
      <div
        ref={overlayRef}
        className="absolute inset-0 opacity-100 md:opacity-0"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0) 55%)' }}
      />
      <div ref={contentRef} className="absolute bottom-0 left-0 translate-y-0 p-5 opacity-100 sm:p-8 md:translate-y-5 md:opacity-0">
        <p className="font-mono text-[10px] uppercase tracking-[3px] text-foleman-yellow">{project.category}</p>
        <h3 className="mt-2 max-w-[15rem] font-display text-3xl leading-none text-white sm:max-w-none sm:text-4xl">{project.title}</h3>
        <p className="mt-1.5 text-[13px] text-white/60">
          {project.location} · {project.year}
        </p>
      </div>
      <svg className="absolute bottom-5 right-5 h-5 w-5 text-white/80 sm:bottom-7 sm:right-7" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      </svg>
    </article>
  );
}
