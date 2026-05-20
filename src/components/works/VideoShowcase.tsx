import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { videos, type WorkVideo } from '../../data/videos';
import { resolveWorkImage, resolveWorkVideo } from '../../utils/workAssets';
import { Lightbox } from './Lightbox';

gsap.registerPlugin(ScrollTrigger);

type OpenVideo = {
  src: string;
  poster?: string;
};

function VideoCard({ video, onOpen }: { video: WorkVideo; onOpen: (video: OpenVideo) => void }) {
  const imageRef = useRef<HTMLImageElement>(null);
  const playRef = useRef<HTMLDivElement>(null);
  const src = resolveWorkVideo(video.asset);
  const poster = resolveWorkImage(video.poster);

  const enter = () => {
    gsap.to(imageRef.current, { opacity: 0.7, duration: 0.3 });
    gsap.to(playRef.current, { scale: 1.08, borderColor: '#ffffff', duration: 0.3 });
  };

  const leave = () => {
    gsap.to(imageRef.current, { opacity: 0.5, duration: 0.3 });
    gsap.to(playRef.current, { scale: 1, borderColor: '#FFD100', duration: 0.3 });
  };

  return (
    <button
      type="button"
      data-cursor="play"
      onMouseEnter={enter}
      onMouseLeave={leave}
      onClick={() => src && onOpen({ src, poster })}
      className="relative aspect-video w-full cursor-none overflow-hidden border border-[#2a2a2a] bg-[#1a1a1a] text-left"
    >
      {poster ? (
        <img ref={imageRef} src={poster} alt="" className="h-full w-full object-cover opacity-50" loading="lazy" />
      ) : (
        <div className="h-full w-full bg-[#151515]" />
      )}
      <div ref={playRef} className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-foleman-yellow">
        <svg className="ml-1 h-5 w-5 text-foleman-yellow" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M8 5v14l11-7Z" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-black/72 px-5 py-4 font-mono text-xs uppercase tracking-[0.14em]">
        <span className="text-white">{video.title}</span>
        <span className="text-foleman-yellow">{video.duration}</span>
      </div>
    </button>
  );
}

export function VideoShowcase() {
  const scope = useRef<HTMLElement>(null);
  const [openVideo, setOpenVideo] = useState<OpenVideo | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(max-width: 767px)', () => {
        gsap.fromTo('.video-copy, .video-stack', { y: 42, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: scope.current, start: 'top 78%' } });
      });
      mm.add('(min-width: 768px)', () => {
        gsap.fromTo('.video-copy', { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: scope.current, start: 'top 75%' } });
        gsap.fromTo('.video-stack', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: scope.current, start: 'top 75%' } });
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section ref={scope} className="grid overflow-hidden bg-[#0d0d0d] px-5 py-20 md:grid-cols-[minmax(0,45%)_minmax(0,55%)] md:items-center md:gap-20 md:px-20 md:py-32">
      <div className="video-copy">
        <p className="font-mono text-[11px] uppercase tracking-[4px] text-foleman-yellow">Behind The Work</p>
        <h2 className="mt-5 font-display text-[clamp(4.4rem,21vw,8rem)] leading-[0.85] text-white md:text-[7vw]">See Us In Action</h2>
        <p className="mt-6 max-w-sm text-[15px] leading-7 text-[#888]">Watch our team at work — from fault diagnosis to full installations. Real jobs. Real results.</p>
      </div>
      <div className="video-stack mt-10 grid min-w-0 gap-4 md:mt-0">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} onOpen={setOpenVideo} />
        ))}
      </div>
      {openVideo ? <Lightbox src={openVideo.src} poster={openVideo.poster} onClose={() => setOpenVideo(null)} /> : null}
    </section>
  );
}
