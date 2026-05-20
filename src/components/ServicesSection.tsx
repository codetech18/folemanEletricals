import { useRef } from 'react';
import type { CSSProperties } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { TiltCard } from '../three/ServiceCardScene';

gsap.registerPlugin(ScrollTrigger);

type ServiceIconProps = {
  className?: string;
};

function BoltIcon({ className = '' }: ServiceIconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M27 3 10 27h13l-2 18 17-25H25l2-17Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  );
}

function WrenchIcon({ className = '' }: ServiceIconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M30 7a12 12 0 0 0-9 16L8 36a4 4 0 1 0 6 6l13-13A12 12 0 0 0 41 15l-8 8-8-8 8-8a13 13 0 0 0-3 0Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  );
}

function GaugeIcon({ className = '' }: ServiceIconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M8 36a18 18 0 1 1 32 0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="m24 31 10-13" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M14 36h20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

const services = [
  {
    title: 'Installation Setup',
    body: 'Wiring, sockets, switches, lighting systems, and circuit breakers installed with clean routing and safety-first planning.',
    icon: BoltIcon,
  },
  {
    title: 'Maintenance & Repairs',
    body: 'Electrical inspections, fault detection, repairs, and hazard assessment for homes, offices, shops, and facilities.',
    icon: WrenchIcon,
  },
  {
    title: 'Testing & Troubleshooting',
    body: 'Power failure diagnosis, circuit testing, voltage checks, and electrical load analysis before small issues become shutdowns.',
    icon: GaugeIcon,
  },
];

const sparks = Array.from({ length: 10 }, (_, index) => ({
  x: `${18 + ((index * 19) % 64)}%`,
  y: `${16 + ((index * 31) % 64)}%`,
  tx: `${-42 + ((index * 17) % 84)}px`,
  ty: `${-50 + ((index * 23) % 100)}px`,
  delay: `${index * 38}ms`,
}));

export function ServicesSection() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.to('.electric-underline', {
        strokeDashoffset: 0,
        duration: 1.35,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.services-title', start: 'top 72%' },
      });

      gsap.from('.service-card', {
        y: 70,
        opacity: 0,
        duration: 0.9,
        stagger: 0.16,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.services-grid', start: 'top 72%' },
      });
    },
    { scope },
  );

  return (
    <section id="services" ref={scope} className="section-shell relative max-w-full bg-foleman-black px-5 py-28 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="services-title max-w-3xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.34em] text-foleman-yellow">What We Do</p>
          <h2 className="font-display text-6xl leading-none text-white md:text-8xl">Electrical work that looks as sharp as it performs.</h2>
          <svg className="mt-7 h-8 w-full max-w-xl" viewBox="0 0 620 40" fill="none">
            <path className="electric-underline" d="M4 22h168l18-14 16 26 22-22h388" stroke="#FFD100" strokeWidth="5" strokeLinecap="round" />
          </svg>
        </div>
        <div className="services-grid mt-16 grid w-full max-w-full gap-5 md:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <TiltCard key={service.title} className="service-card group relative min-h-[28rem] rounded-lg border border-white/10 bg-white/[0.045] p-7 shadow-inner-line backdrop-blur-xl">
                <div className="spark-field">
                  {sparks.map((spark) => (
                    <span
                      key={`${spark.x}-${spark.y}`}
                      style={{
                        '--x': spark.x,
                        '--y': spark.y,
                        '--tx': spark.tx,
                        '--ty': spark.ty,
                        '--delay': spark.delay,
                      } as CSSProperties}
                    />
                  ))}
                </div>
                <Icon className="h-10 w-10 text-foleman-yellow" />
                <h3 className="mt-16 font-display text-5xl leading-none text-white">{service.title}</h3>
                <p className="mt-6 leading-8 text-white/68">{service.body}</p>
                <div className="absolute bottom-7 left-7 right-7 h-px bg-gradient-to-r from-foleman-yellow via-white/15 to-transparent" />
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
