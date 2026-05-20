import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 200, suffix: '+', label: 'Projects Completed' },
  { value: 5, suffix: '+', label: 'Years Experience' },
  { value: 0, suffix: '', label: 'Lagos to Abuja - Nationwide', text: 'Lagos to Abuja' },
  { value: 100, suffix: '%', label: 'Safety Compliant' },
];

export function StatsSection() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const counters = gsap.utils.toArray<HTMLElement>('.stat-value');
      counters.forEach((counter) => {
        const target = Number(counter.dataset.target ?? 0);
        const suffix = counter.dataset.suffix ?? '';
        const text = counter.dataset.text;

        if (text) return;

        gsap.fromTo(
          counter,
          { textContent: 0 },
          {
            textContent: target,
            duration: 1.4,
            ease: 'power2.out',
            snap: { textContent: 1 },
            onUpdate: () => {
              counter.textContent = `${Math.round(Number(counter.textContent))}${suffix}`;
            },
            scrollTrigger: { trigger: scope.current, start: 'top 65%', once: true },
          },
        );
      });

      gsap.from('.stat-item, .stats-quote', {
        y: 38,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: scope.current, start: 'top 70%' },
      });
    },
    { scope },
  );

  return (
    <section ref={scope} className="section-shell grain relative bg-[#0d0d0d] px-5 py-28 md:py-36">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={stat.label} className="stat-item">
              <div
                className="stat-value font-display text-6xl leading-none text-foleman-yellow md:text-7xl"
                data-target={stat.value}
                data-suffix={stat.suffix}
                data-text={stat.text}
              >
                {stat.text ?? `0${stat.suffix}`}
              </div>
              <div className="mt-5 h-1 w-full bg-foleman-yellow" />
              <p className="mt-5 max-w-[13rem] text-sm font-bold uppercase tracking-[0.2em] text-white/70">
                {index === 2 ? 'Nationwide Service' : stat.label}
              </p>
            </div>
          ))}
        </div>
        <blockquote className="stats-quote mt-20 max-w-4xl font-display text-5xl leading-none text-white md:text-7xl">
          &quot;We don&apos;t cut corners. We trace every wire.&quot;
          <cite className="mt-7 block font-body text-base not-italic tracking-normal text-white/62">
            Israel Emmanuel O., Managing Director
          </cite>
        </blockquote>
      </div>
    </section>
  );
}
