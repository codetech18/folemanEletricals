import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const headlineWords = ["EVERY", "JOB", "TELLS", "A", "STORY"];
const ticker =
  "INSTALLATION · MAINTENANCE · REWIRING · PANEL UPGRADE · FAULT DIAGNOSIS · LIGHTING SYSTEMS · TESTING · COMMERCIAL · RESIDENTIAL ·";

export function WorksHeader() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        ".works-headline-word span",
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 1,
          stagger: 0.1,
          delay: 0.3,
          ease: "power4.out",
        },
      );
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      className="relative min-h-[58vh] overflow-hidden bg-[#0d0d0d] px-5 pb-0 pt-28 sm:min-h-[50vh] md:px-20 md:pt-32"
    >
      <p className="font-mono text-[11px] uppercase tracking-[4px] text-foleman-yellow">
        Our Work / A closer look
      </p>
      <h1
        className="works-headline mt-8 font-display text-white"
        aria-label={headlineWords.join(" ")}
      >
        {headlineWords.map((word) => (
          <span
            key={word}
            className="works-headline-word mr-[0.22em] inline-block overflow-hidden"
          >
            <span className="inline-block">{word}</span>
          </span>
        ))}
      </h1>
      <p className="mb-14 mt-8 max-w-xl text-base leading-7 text-[#888] md:mb-20">
        A closer look at our electrical and lighting work. Explore the
        photographs, or watch our team in action.
      </p>
      <div className="works-marquee -mx-5 border-y border-white/10 py-5 md:-mx-20">
        <div className="works-marquee-track font-mono text-xs uppercase tracking-[0.22em] text-white md:text-sm">
          <span>{ticker}</span>
          <span>{ticker}</span>
        </div>
      </div>
    </section>
  );
}
