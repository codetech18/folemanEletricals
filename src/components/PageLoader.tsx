import { motion } from 'framer-motion';
import { LogoMark } from '../utils/brand';

export function PageLoader() {
  return (
    <motion.div
      className="fixed inset-0 z-[80] grid place-items-center bg-foleman-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, pointerEvents: 'none' }}
      transition={{ delay: 1.2, duration: 0.7, ease: 'easeInOut' }}
    >
      <motion.div
        className="text-foleman-yellow"
        initial={{ scale: 0.82, opacity: 0 }}
        animate={{ scale: [0.82, 1.08, 1], opacity: [0, 1, 1] }}
        transition={{ duration: 1.05, ease: 'easeOut' }}
      >
        <LogoMark className="h-24 w-24 drop-shadow-[0_0_34px_rgba(255,209,0,0.35)]" />
      </motion.div>
    </motion.div>
  );
}
