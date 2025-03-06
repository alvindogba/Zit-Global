import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  variant?: 'default' | 'strong' | 'light';
  hover?: boolean;
  animate?: boolean;
}

export const GlassCard = ({
  children,
  className = '',
  glowColor = 'from-primary-500/20',
  variant = 'default',
  hover = true,
  animate = true,
}: GlassCardProps) => {
  const baseClasses = 'relative overflow-hidden rounded-2xl backdrop-blur-lg';
  const variantClasses = {
    default: 'bg-white/30 shadow-glass',
    strong: 'bg-white/40 shadow-glass-strong',
    light: 'bg-white/20 shadow-glass-light',
  };
  const hoverClasses = hover
    ? 'hover:shadow-glass-strong hover:-translate-y-1 transition-all duration-300'
    : '';

  return (
    <motion.div
      className={`border border-1 border-gray-500 ${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`}
      initial={animate ? { opacity: 0, y: 20 } : undefined}
      whileInView={animate ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Glass shine effect */}
      <div className=" absolute inset-0 bg-glass-shine opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Gradient glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${glowColor} to-transparent opacity-20`} />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
