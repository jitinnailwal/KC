'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

export default function AnimatedText({ text, className = '', delay = 0 }: AnimatedTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '-50px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = text.split(' ');

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em] py-[0.1em]">
          <span
            className="inline-block transition-transform duration-500 ease-out"
            style={{
              transform: visible ? 'translateY(0) rotate(0deg)' : 'translateY(120%) rotate(5deg)',
              transitionDelay: `${delay + i * 0.05}s`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}
