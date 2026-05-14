'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

export default function AnimatedText({ text, className = '', delay = 0, once = true }: AnimatedTextProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(
      window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window
    );
  }, []);

  // On mobile, render plain text to avoid per-word IntersectionObservers
  if (isMobile) {
    return <span className={`inline-block ${className}`}>{text}</span>;
  }

  const words = text.split(' ');

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-50px' }}
      className={`inline-block ${className}`}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '120%', rotate: 5 },
              visible: {
                y: 0,
                rotate: 0,
                transition: {
                  duration: 0.6,
                  delay: delay + i * 0.05,
                  ease: [0.215, 0.61, 0.355, 1],
                },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
