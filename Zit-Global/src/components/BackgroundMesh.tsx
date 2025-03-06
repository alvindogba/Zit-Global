import { motion } from 'framer-motion';

interface BackgroundMeshProps {
  className?: string;
  animate?: boolean;
}

export const BackgroundMesh = ({ className = '', animate = true }: BackgroundMeshProps) => {
  return (
    <motion.div
      className={`absolute inset-0 bg-gradient-mesh bg-mesh opacity-30 ${className}`}
      initial={animate ? { opacity: 0 } : undefined}
      animate={animate ? { opacity: 0.3 } : undefined}
      transition={{ duration: 1 }}
    />
  );
};
