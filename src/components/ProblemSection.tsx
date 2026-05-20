import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const lines = [
  'A spark at 3am.',
  'A tripped breaker.',
  "Wiring that's decades old.",
  "These aren't inconveniences - they're dangers.",
  'Foleman is who Lagos calls.',
];

export function ProblemSection() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from('.problem-line', {
        y: 50,
        opacity: 0,
        stagger: 0.18,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: scope.current,
          start: 'top 58%',
          end: 'bottom 56%',
          scrub: 0.8,
        },
      });

      gsap.to('.circuit-layer', {
        yPercent: -16,
        ease: 'none',
        scrollTrigger: {
          trigger: scope.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    },
    { scope },
  );

  return (
    <section ref={scope} className="section-shell noise relative min-h-screen bg-[#070707] px-5 py-28 md:py-36">
      <div className="absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-foleman-yellow/14 blur-3xl flicker-light" />
      <svg className="circuit-layer absolute inset-0 h-[120%] w-full opacity-[0.13]" viewBox="0 0 1200 900" preserveAspectRatio="none">
        <path d="M70 130H300v130h180v180h220v120h430" fill="none" stroke="#FFD100" strokeWidth="2" />
        <path d="M80 590h210V450h140V280h260v120h230" fill="none" stroke="#ffffff" strokeWidth="1.5" />
        <path d="M180 760h240V640h180V500h390" fill="none" stroke="#FFD100" strokeWidth="2" />
        {Array.from({ length: 18 }, (_, index) => (
          <circle key={index} cx={90 + index * 62} cy={130 + (index % 5) * 130} r="5" fill="#FFD100" />
        ))}
      </svg>
      <div className="relative z-10 mx-auto flex min-h-[68vh] max-w-6xl items-center">
        <div className="max-w-4xl">
          <p className="mb-8 text-sm font-bold uppercase tracking-[0.34em] text-foleman-yellow">The Problem</p>
          <div className="space-y-4 font-display text-5xl leading-[0.92] text-white sm:text-6xl md:text-8xl">
            {lines.map((line) => (
              <p key={line} className="problem-line">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
