import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const x = useSpring(cursorX, { stiffness: 260, damping: 28, mass: 0.4 });
  const y = useSpring(cursorY, { stiffness: 260, damping: 28, mass: 0.4 });

  useEffect(() => {
    const move = (event: PointerEvent) => {
      cursorX.set(event.clientX - 5);
      cursorY.set(event.clientY - 5);
    };

    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="custom-cursor pointer-events-none fixed left-0 top-0 z-[90] h-2.5 w-2.5 rounded-full bg-foleman-yellow shadow-[0_0_24px_rgba(255,209,0,0.8)] mix-blend-difference"
      style={{ x, y }}
    />
  );
}
