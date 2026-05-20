import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';

type LightboxProps = {
  src: string;
  poster?: string;
  onClose: () => void;
};

export function Lightbox({ src, poster, onClose }: LightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo(containerRef.current, { scale: 0.88, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.4)' });

    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setClosing(true);
    };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, []);

  useEffect(() => {
    if (!closing) return;
    const timeline = gsap.timeline({ onComplete: onClose });
    timeline.to(containerRef.current, { scale: 0.9, opacity: 0, duration: 0.2, ease: 'power2.in' }).to(overlayRef.current, { opacity: 0, duration: 0.2 }, '-=0.08');
  }, [closing, onClose]);

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] grid place-items-center bg-black/[0.96] p-4 md:cursor-none"
      onClick={(event) => {
        if (event.target === event.currentTarget) setClosing(true);
      }}
    >
      <button
        type="button"
        data-cursor="hover"
        onClick={() => setClosing(true)}
        className="fixed right-5 top-5 font-mono text-2xl text-white/70 transition hover:text-white md:right-8 md:top-6"
        aria-label="Close video"
      >
        ×
      </button>
      <div ref={containerRef} className="aspect-video w-full max-w-[900px] overflow-hidden bg-[#111]">
        <video className="h-full w-full" controls autoPlay preload="metadata" src={src} poster={poster} />
      </div>
    </div>,
    document.body,
  );
}
