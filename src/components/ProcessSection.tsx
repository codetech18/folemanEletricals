import { useRef } from 'react';
import type { CSSProperties } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { title: 'You Call', body: 'Tell us what went wrong, what you need powered, or what has to be built cleanly from day one.' },
  { title: 'We Assess', body: 'Foleman checks the load, wiring path, breaker behavior, and safety risks before work begins.' },
  { title: 'We Execute', body: 'Installation, repairs, and testing are handled with measured routing and tidy finishes.' },
  { title: "You're Powered", body: 'You get reliable power, clear handover notes, and an electrical system ready for daily use.' },
];

export function ProcessSection() {
  const scope = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(max-width: 767px)', () => {
        gsap.set(track.current, { clearProps: 'all' });
        gsap.set('.process-step', { clearProps: 'transform,opacity' });
        gsap.from('.process-step', {
          y: 42,
          opacity: 0,
          stagger: 0.12,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: { trigger: scope.current, start: 'top 70%' },
        });

        return () => {
          gsap.set(track.current, { clearProps: 'all' });
          gsap.set('.process-step', { clearProps: 'transform,opacity' });
        };
      });

      mm.add('(min-width: 768px)', () => {
        if (!track.current) return undefined;

        gsap.set(track.current, { clearProps: 'transform' });
        const distance = Math.max(0, track.current.scrollWidth - window.innerWidth);
        const scrollLength = distance * 1.75;

        gsap.to(track.current, {
          x: -distance,
          ease: 'none',
          scrollTrigger: {
            trigger: scope.current,
            start: 'top top',
            end: `+=${scrollLength}`,
            scrub: 1.35,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.from('.process-step', {
          y: 60,
          opacity: 0,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: scope.current,
            start: 'top 40%',
            end: '+=700',
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        gsap.to('.process-line', {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: scope.current,
            start: 'top top',
            end: `+=${scrollLength}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          gsap.set(track.current, { clearProps: 'transform' });
        };
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section id="process" ref={scope} className="section-shell relative max-w-full bg-foleman-black py-20 md:h-screen md:py-0">
      <div
        ref={track}
        className="flex w-full max-w-full flex-col gap-7 px-5 md:h-screen md:w-[240vw] md:max-w-none md:flex-row md:items-center md:gap-0 md:px-[10vw]"
      >
        <div className="sticky top-24 z-10 w-full shrink-0 bg-gradient-to-b from-foleman-black via-foleman-black to-transparent pb-5 md:static md:w-[45vw] md:bg-none md:pb-0">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.34em] text-foleman-yellow">How We Work</p>
          <h2 className="font-display text-6xl leading-none text-white md:text-8xl">From first call to steady power.</h2>
        </div>
        <div className="relative grid flex-1 gap-5 pt-2 md:grid-cols-4 md:pt-0">
          <svg className="pointer-events-none absolute left-0 top-1/2 hidden h-20 w-full -translate-y-1/2 md:block" viewBox="0 0 1100 100" preserveAspectRatio="none">
            <path className="process-line" d="M20 50 H1080" stroke="#FFD100" strokeWidth="4" strokeDasharray="16 18" strokeDashoffset="1100" />
          </svg>
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="process-step sticky relative min-h-[22rem] overflow-hidden rounded-lg border border-white/10 bg-[#101010]/95 p-7 shadow-inner-line backdrop-blur-xl md:static md:min-h-[24rem] md:bg-white/[0.04]"
              style={{ top: `calc(12rem + ${index * 0.75}rem)` } as CSSProperties}
            >
              <span className="absolute -right-3 top-0 font-display text-[12rem] leading-none text-foleman-yellow/[0.08]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="relative z-10 flex h-full flex-col justify-end">
                <div className="mb-9 grid h-14 w-14 place-items-center rounded-full border border-foleman-yellow/50 text-foleman-yellow">
                  {index + 1}
                </div>
                <h3 className="font-display text-5xl leading-none text-white">{step.title}</h3>
                <p className="mt-5 leading-8 text-white/65">{step.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
