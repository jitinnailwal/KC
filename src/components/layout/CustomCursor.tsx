'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const rafId = useRef(0);
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  useEffect(() => {
    // Use direct DOM manipulation via refs — no React re-renders
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    // Throttle DOM updates to RAF
    const updateCursor = () => {
      rafId.current = requestAnimationFrame(updateCursor);
      if (cursorRef.current) {
        cursorRef.current.style.left = `${mouseX.current}px`;
        cursorRef.current.style.top = `${mouseY.current}px`;
      }
      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX.current}px`;
        dotRef.current.style.top = `${mouseY.current}px`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.dataset.cursor === 'pointer'
      ) {
        cursorRef.current?.classList.add('hovering');
      }
    };

    const handleMouseOut = () => {
      cursorRef.current?.classList.remove('hovering');
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    rafId.current = requestAnimationFrame(updateCursor);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor hidden md:block"
      />
      <div
        ref={dotRef}
        className="custom-cursor-dot hidden md:block"
      />
    </>
  );
}
