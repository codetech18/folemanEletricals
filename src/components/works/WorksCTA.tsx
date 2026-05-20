import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { contact } from '../../utils/brand';

gsap.registerPlugin(ScrollTrigger);

export function WorksCTA() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(max-width: 767px)', () => {
        gsap.fromTo('.works-cta-left, .works-cta-right', { y: 42, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: scope.current, start: 'top 80%' } });
      });
      mm.add('(min-width: 768px)', () => {
        gsap.fromTo('.works-cta-left', { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: scope.current, start: 'top 80%' } });
        gsap.fromTo('.works-cta-right', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: scope.current, start: 'top 80%' } });
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section ref={scope} className="grid overflow-hidden bg-[#0d0d0d] px-5 py-20 md:grid-cols-[minmax(0,60%)_minmax(0,40%)] md:items-center md:gap-10 md:px-20 md:py-32">
      <div className="works-cta-left">
        <p className="font-mono text-[11px] uppercase tracking-[4px] text-foleman-yellow">Start Your Project</p>
        <h2 className="mt-5 max-w-4xl font-display text-[clamp(3.8rem,16vw,7rem)] leading-[0.95] text-white md:text-[5vw]">Ready To Add Your Project To This List?</h2>
      </div>
      <div className="works-cta-right mt-8 flex flex-col items-stretch gap-3 sm:items-start md:mt-0">
        <a
          href="/#contact"
          data-cursor="hover"
          className="bg-foleman-yellow px-8 py-[18px] text-center text-xs font-medium uppercase tracking-[2px] text-black transition hover:-translate-y-0.5 hover:opacity-90 sm:px-10"
        >
          Get a Quote
        </a>
        <a
          href={`tel:${contact.phone}`}
          data-cursor="hover"
          className="border border-[#333] bg-transparent px-8 py-[18px] text-center text-xs font-medium uppercase tracking-[2px] text-white transition hover:border-white sm:px-10"
        >
          {contact.phoneDisplay}
        </a>
      </div>
    </section>
  );
}
