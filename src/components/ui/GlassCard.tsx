'use client';

import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
  onClick?: () => void;
}

export default function GlassCard({ children, className = '', hover = true, delay = 0, onClick }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay }}
      whileHover={hover ? { y: -5, scale: 1.02 } : undefined}
      onClick={onClick}
      className={`glass rounded-2xl p-6 relative overflow-hidden group ${className}`}
    >
      {/* Hover glow border */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(79,140,255,0.1), rgba(200,169,106,0.1))',
          border: '1px solid rgba(79,140,255,0.15)',
          borderRadius: 'inherit',
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
