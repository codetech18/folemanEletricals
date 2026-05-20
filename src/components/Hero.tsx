import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ElectricArcs } from "../three/ElectricArcs";
import { LogoMark } from "../utils/brand";

gsap.registerPlugin(ScrollTrigger);

const headline = "We Keep The Lights On";
const words = headline.split(" ");

function HeroWord({ word }: { word: string }) {
  if (word !== "Lights") {
    return <>{word}</>;
  }

  return (
    <>
      L
      <span className="light-i" aria-hidden="true">
        <span className="light-bulb" />
        <span className="light-i-stem" />
      </span>
      ghts
    </>
  );
}

export function Hero() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.set(".hero-word", {
        yPercent: 80,
        opacity: 0,
        filter: "blur(14px) brightness(0.45)",
        textShadow: "0 0 0 rgba(255,209,0,0)",
      });
      gsap.set(".light-bulb", { scale: 0.35, opacity: 0 });
      gsap.set(".logo-draw path, .logo-draw circle", {
        strokeDasharray: 380,
        strokeDashoffset: 380,
      });

      const intro = gsap.timeline({ delay: 1.22 });
      intro
        .to(".logo-draw path, .logo-draw circle", {
          strokeDashoffset: 0,
          duration: 1.2,
          stagger: 0.08,
          ease: "power3.out",
        })
        .to(
          ".hero-word",
          {
            yPercent: 0,
            opacity: 1,
            filter: "blur(0px) brightness(1.55)",
            textShadow: "0 0 34px rgba(255,209,0,0.36)",
            duration: 0.82,
            stagger: 0.09,
            ease: "expo.out",
          },
          "-=0.54",
        )
        .to(
          ".light-bulb",
          { scale: 1, opacity: 1, duration: 0.28, ease: "back.out(2.4)" },
          "-=0.22",
        )
        .to(
          ".hero-word",
          {
            filter: "blur(0px) brightness(1)",
            textShadow: "0 0 0 rgba(255,209,0,0)",
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.16",
        )
        .from(
          ".hero-copy, .hero-actions",
          { y: 24, opacity: 0, duration: 0.8, stagger: 0.14 },
          "-=0.45",
        );

      gsap.to(".hero-inner", {
        scale: 0.9,
        opacity: 0.18,
        ease: "none",
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope },
  );

  return (
    <section
      id="hero"
      ref={scope}
      className="section-shell grain noise min-h-screen bg-foleman-black"
    >
      <div className="absolute inset-0 z-0">
        <ElectricArcs />
      </div>
      <div className="hero-inner relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-5 pt-24 text-center">
        <LogoMark className="logo-draw mb-8 h-24 w-24 text-foleman-yellow drop-shadow-[0_0_34px_rgba(255,209,0,0.4)] md:h-28 md:w-28" />
        <div className="relative">
          <h1
            className="hero-headline max-w-6xl overflow-hidden font-hero text-[3.35rem] font-extrabold leading-[0.92] tracking-normal text-white sm:text-[5.2rem] md:text-[8rem]"
            aria-label={headline}
          >
            {words.map((word) => (
              <span key={word} className="hero-word mr-3 md:mr-5">
                <HeroWord word={word} />
              </span>
            ))}
          </h1>
        </div>
        <p className="hero-copy mt-7 max-w-2xl text-base leading-8 text-white/72 md:text-xl">
          Lagos&apos; most trusted electrical engineers. Residential.
          Commercial. Industrial.
        </p>
        <div className="hero-actions mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#contact"
            className="rounded-full bg-foleman-yellow px-8 py-4 font-bold text-black shadow-glow transition hover:scale-[1.03]"
          >
            Get a Quote
          </a>
          <a
            href="/works"
            className="rounded-full border border-white/20 px-8 py-4 font-bold text-white transition hover:border-foleman-yellow hover:text-foleman-yellow"
          >
            Our Work
          </a>
        </div>
      </div>
    </section>
  );
}
