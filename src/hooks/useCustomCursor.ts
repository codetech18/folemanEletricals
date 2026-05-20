import { useEffect } from 'react';

type CursorState = 'default' | 'view' | 'play' | 'hover';

export function useCustomCursor() {
  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (isCoarse) return undefined;

    const dot = document.createElement('div');
    const ring = document.createElement('div');
    dot.id = 'cursor-dot';
    ring.id = 'cursor-ring';
    document.body.append(dot, ring);

    let state: CursorState = 'default';
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    const setState = (next: CursorState) => {
      state = next;
      dot.dataset.state = state;
      ring.dataset.state = state;
      ring.textContent = state === 'view' ? 'VIEW' : state === 'play' ? 'PLAY' : '';
    };

    const move = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      dot.style.transform = `translate3d(${mouseX - 5}px, ${mouseY - 5}px, 0)`;
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      const size = state === 'view' || state === 'play' ? 64 : 32;
      ring.style.transform = `translate3d(${ringX - size / 2}px, ${ringY - size / 2}px, 0)`;
      raf = window.requestAnimationFrame(tick);
    };

    const over = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-cursor]') : null;
      if (!target) return;
      const next = target.dataset.cursor as CursorState | undefined;
      setState(next ?? 'default');
    };

    const out = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-cursor]') : null;
      if (!target) return;
      const related = event.relatedTarget instanceof Element ? event.relatedTarget.closest<HTMLElement>('[data-cursor]') : null;
      if (related === target) return;
      setState('default');
    };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    setState('default');
    tick();

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
      dot.remove();
      ring.remove();
    };
  }, []);
}
