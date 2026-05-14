'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface ToastData extends FormData {
  visible: boolean;
}

// Generate shard positions for the glass assembly effect
function generateShards(count: number) {
  const shards: { x: number; y: number; w: number; h: number; clip: string }[] = [];
  const cols = Math.ceil(Math.sqrt(count * 1.5));
  const rows = Math.ceil(count / cols);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (shards.length >= count) break;
      const x1 = (c / cols) * 100;
      const y1 = (r / rows) * 100;
      const x2 = ((c + 1) / cols) * 100;
      const y2 = ((r + 1) / rows) * 100;

      const j = 1.5;
      const p1x = Math.max(0, x1 - j + Math.random() * j * 2);
      const p1y = Math.max(0, y1 - j + Math.random() * j * 2);
      const p2x = Math.min(100, x2 - j + Math.random() * j * 2);
      const p2y = Math.max(0, y1 - j + Math.random() * j * 2);
      const p3x = Math.min(100, x2 - j + Math.random() * j * 2);
      const p3y = Math.min(100, y2 - j + Math.random() * j * 2);
      const p4x = Math.max(0, x1 - j + Math.random() * j * 2);
      const p4y = Math.min(100, y2 - j + Math.random() * j * 2);

      shards.push({
        x: (x1 + x2) / 2 - 50,
        y: (y1 + y2) / 2 - 50,
        w: x2 - x1,
        h: y2 - y1,
        clip: `polygon(${p1x}% ${p1y}%, ${p2x}% ${p2y}%, ${p3x}% ${p3y}%, ${p4x}% ${p4y}%)`,
      });
    }
  }
  return shards;
}

const SHARD_DATA = generateShards(24);

// Lightweight confetti/spark celebration
function spawnConfetti(container: HTMLElement) {
  const colors = ['#4F8CFF', '#C8A96A', '#FFFFFF', '#34D399', '#A78BFA'];
  const count = 30;

  for (let i = 0; i < count; i++) {
    const spark = document.createElement('div');
    const size = 3 + Math.random() * 4;
    const isCircle = Math.random() > 0.5;
    spark.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${isCircle ? size : size * 2.5}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${isCircle ? '50%' : '1px'};
      top: 50%;
      left: 50%;
      pointer-events: none;
      z-index: 10;
    `;
    container.appendChild(spark);

    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
    const dist = 80 + Math.random() * 200;
    const duration = 0.6 + Math.random() * 0.4;

    gsap.to(spark, {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist - 40 - Math.random() * 60,
      rotation: (Math.random() - 0.5) * 360,
      scale: 0,
      opacity: 0,
      duration,
      ease: 'power2.out',
      onComplete: () => spark.remove(),
    });
  }
}

export default function ShatteredGlassPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending'>('idle');
  const [toast, setToast] = useState<ToastData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    visible: false,
  });

  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const shardsContainerRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const lastFocusableRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const toastRef = useRef<HTMLDivElement>(null);

  // Show popup after delay on first visit
  useEffect(() => {
    if (hasShown) return;
    const shown = sessionStorage.getItem('kc_popup');
    if (shown) {
      setHasShown(true);
      return;
    }
    const timer = setTimeout(() => {
      previousFocusRef.current = document.activeElement as HTMLElement;
      setIsOpen(true);
      setHasShown(true);
      sessionStorage.setItem('kc_popup', '1');
    }, 4000);
    return () => clearTimeout(timer);
  }, [hasShown]);

  // Open animation
  useEffect(() => {
    if (!isOpen) return;
    setAnimating(true);

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      if (overlayRef.current) gsap.set(overlayRef.current, { opacity: 1 });
      if (contentRef.current) gsap.set(contentRef.current, { opacity: 1, scale: 1 });
      setAnimating(false);
      setTimeout(() => firstInputRef.current?.focus(), 50);
      return;
    }

    // Overlay
    if (overlayRef.current) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' });
    }

    // Hide main content initially, show shards
    if (contentRef.current) gsap.set(contentRef.current, { opacity: 0, scale: 0.95 });
    if (shardsContainerRef.current) gsap.set(shardsContainerRef.current, { opacity: 1 });

    // Animate shards assembling
    const shardEls = shardsContainerRef.current?.children;
    if (shardEls) {
      const tl = gsap.timeline({
        onComplete: () => {
          // Crossfade: hide shards, show real content
          if (shardsContainerRef.current) gsap.to(shardsContainerRef.current, { opacity: 0, duration: 0.15 });
          if (contentRef.current) {
            gsap.to(contentRef.current, { opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out' });
          }
          setAnimating(false);
          setTimeout(() => firstInputRef.current?.focus(), 100);
        },
      });

      Array.from(shardEls).forEach((shard) => {
        const el = shard as HTMLElement;
        const angle = Math.random() * Math.PI * 2;
        const dist = 300 + Math.random() * 400;
        gsap.set(el, {
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          rotation: (Math.random() - 0.5) * 180,
          scale: 0.05 + Math.random() * 0.1,
          opacity: 0,
        });

        tl.to(
          el,
          {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            duration: 0.4 + Math.random() * 0.15,
            ease: 'power3.out',
          },
          Math.random() * 0.12
        );
      });
    }
  }, [isOpen]);

  // ESC close
  useEffect(() => {
    if (!isOpen || animating) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  });

  // Focus trap
  useEffect(() => {
    if (!isOpen || animating) return;
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const first = firstInputRef.current;
      const last = lastFocusableRef.current;
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', handleTab);
    return () => window.removeEventListener('keydown', handleTab);
  });

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const closeModal = useCallback(() => {
    if (animating) return;
    setAnimating(true);

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setIsOpen(false);
      setAnimating(false);
      previousFocusRef.current?.focus();
      return;
    }

    // Fade content, show shards, shatter out
    if (contentRef.current) gsap.to(contentRef.current, { opacity: 0, scale: 0.95, duration: 0.15 });
    if (shardsContainerRef.current) gsap.set(shardsContainerRef.current, { opacity: 1 });

    const shardEls = shardsContainerRef.current?.children;
    if (shardEls) {
      // Reset shards to assembled position first
      Array.from(shardEls).forEach((shard) => {
        gsap.set(shard, { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 });
      });

      // Shatter outward
      setTimeout(() => {
        Array.from(shardEls).forEach((shard) => {
          const angle = Math.random() * Math.PI * 2;
          const dist = 150 + Math.random() * 350;
          gsap.to(shard, {
            x: Math.cos(angle) * dist,
            y: Math.sin(angle) * dist,
            rotation: (Math.random() - 0.5) * 90,
            scale: 0.3 + Math.random() * 0.3,
            opacity: 0,
            duration: 0.45 + Math.random() * 0.25,
            delay: Math.random() * 0.08,
            ease: 'power2.in',
          });
        });
      }, 50);
    }

    if (overlayRef.current) gsap.to(overlayRef.current, { opacity: 0, duration: 0.4, delay: 0.15 });

    setTimeout(() => {
      setIsOpen(false);
      setAnimating(false);
      previousFocusRef.current?.focus();
    }, 650);
  }, [animating]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || animating) return;

    setStatus('sending');
    const submittedData = { ...formData };

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: 'popup' }),
      });
    } catch {
      // Continue with close animation even if email fails
    }

    setStatus('idle');
    setAnimating(true);

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Shatter out on submit
    if (prefersReduced) {
      setIsOpen(false);
      setAnimating(false);
    } else {
      if (contentRef.current) gsap.to(contentRef.current, { opacity: 0, scale: 0.95, duration: 0.15 });
      if (shardsContainerRef.current) gsap.set(shardsContainerRef.current, { opacity: 1 });

      const shardEls = shardsContainerRef.current?.children;
      if (shardEls) {
        Array.from(shardEls).forEach((shard) => {
          gsap.set(shard, { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 });
        });
        setTimeout(() => {
          Array.from(shardEls).forEach((shard) => {
            const angle = Math.random() * Math.PI * 2;
            const dist = 200 + Math.random() * 400;
            gsap.to(shard, {
              x: Math.cos(angle) * dist,
              y: Math.sin(angle) * dist,
              rotation: (Math.random() - 0.5) * 120,
              scale: 0.2 + Math.random() * 0.3,
              opacity: 0,
              duration: 0.5 + Math.random() * 0.3,
              delay: Math.random() * 0.1,
              ease: 'power3.in',
            });
          });
        }, 50);
      }
      if (overlayRef.current) gsap.to(overlayRef.current, { opacity: 0, duration: 0.4, delay: 0.2 });

      // Spawn confetti celebration
      setTimeout(() => {
        const modalWrapper = contentRef.current?.parentElement;
        if (modalWrapper) spawnConfetti(modalWrapper);
      }, 100);

      setTimeout(() => {
        setIsOpen(false);
        setAnimating(false);
      }, 750);
    }

    // Show toast after modal closes
    setTimeout(
      () => {
        setToast({ ...submittedData, visible: true });
        requestAnimationFrame(() => {
          if (toastRef.current) {
            gsap.fromTo(
              toastRef.current,
              { y: 60, opacity: 0, scale: 0.95 },
              { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.5)' }
            );
          }
        });

        // Auto dismiss
        setTimeout(() => {
          if (toastRef.current) {
            gsap.to(toastRef.current, {
              y: 60,
              opacity: 0,
              scale: 0.95,
              duration: 0.35,
              ease: 'power2.in',
              onComplete: () => setToast((prev) => ({ ...prev, visible: false })),
            });
          }
        }, 5000);
      },
      prefersReduced ? 200 : 850
    );

    setFormData({ name: '', email: '', phone: '', message: '' });
    previousFocusRef.current?.focus();
  };

  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!isOpen && !toast.visible) return null;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-[9998] flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Get a free consultation"
        >
          {/* Overlay */}
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-black/60"
            onClick={animating ? undefined : closeModal}
            style={{ opacity: 0 }}
          />

          {/* Modal wrapper */}
          <div className="relative z-10 w-full max-w-md">
            {/* Shards layer (visual effect only) */}
            {!prefersReduced && (
              <div
                ref={shardsContainerRef}
                className="absolute inset-0 pointer-events-none"
                aria-hidden="true"
                style={{ opacity: 0 }}
              >
                {SHARD_DATA.map((shard, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 will-change-transform"
                    style={{ clipPath: shard.clip, WebkitClipPath: shard.clip }}
                  >
                    <div className="w-full h-full rounded-2xl border border-white/[0.08] bg-dark-800/95" />
                  </div>
                ))}
              </div>
            )}

            {/* Actual interactive content */}
            <div
              ref={contentRef}
              className="relative rounded-2xl border border-white/[0.08] bg-dark-800/95 p-6 sm:p-8 shadow-2xl shadow-black/40"
              style={{ opacity: prefersReduced ? 1 : 0 }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3 className="font-heading font-bold text-lg text-light">
                    Get a Free <span className="text-gradient">Consultation</span>
                  </h3>
                  <p className="text-xs text-light-300/50 mt-1">
                    Tell us about your project and we&apos;ll get back within 24 hours.
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-light-300/40 hover:text-light transition-colors p-1 -mr-1 -mt-1"
                  aria-label="Close popup"
                  disabled={animating}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  ref={firstInputRef}
                  type="text"
                  placeholder="Your Name *"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-lg bg-dark-900 border border-dark-700/50 text-sm text-light placeholder:text-light-300/30 focus:outline-none focus:border-accent-blue/40 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email Address *"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-lg bg-dark-900 border border-dark-700/50 text-sm text-light placeholder:text-light-300/30 focus:outline-none focus:border-accent-blue/40 transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-lg bg-dark-900 border border-dark-700/50 text-sm text-light placeholder:text-light-300/30 focus:outline-none focus:border-accent-blue/40 transition-colors"
                />
                <textarea
                  placeholder="Tell us about your project..."
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-lg bg-dark-900 border border-dark-700/50 text-sm text-light placeholder:text-light-300/30 focus:outline-none focus:border-accent-blue/40 transition-colors resize-none"
                />
                <button
                  ref={lastFocusableRef}
                  type="submit"
                  disabled={status === 'sending' || animating}
                  className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-accent-blue to-accent-gold text-dark-900 font-semibold text-sm hover:shadow-lg hover:shadow-accent-blue/20 transition-all duration-300 disabled:opacity-50"
                >
                  {status === 'sending' ? 'Sending...' : 'Get Free Consultation'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {toast.visible && (
        <div
          ref={toastRef}
          className="fixed bottom-6 right-6 z-[9999] w-full max-w-sm rounded-xl border border-white/[0.08] bg-dark-800/95 p-5 shadow-2xl shadow-black/40"
          style={{ opacity: 0 }}
          role="alert"
          aria-live="polite"
        >
          <div className="flex items-center gap-2 mb-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400 shrink-0">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span className="text-sm font-heading font-semibold text-emerald-400">
              Submitted Successfully
            </span>
          </div>
          <div className="space-y-1.5 text-xs text-light-300/70">
            <div className="flex gap-2">
              <span className="text-light-300/40 w-14 shrink-0">Name</span>
              <span className="text-light-300">{toast.name}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-light-300/40 w-14 shrink-0">Email</span>
              <span className="text-light-300">{toast.email}</span>
            </div>
            {toast.phone && (
              <div className="flex gap-2">
                <span className="text-light-300/40 w-14 shrink-0">Phone</span>
                <span className="text-light-300">{toast.phone}</span>
              </div>
            )}
            {toast.message && (
              <div className="flex gap-2">
                <span className="text-light-300/40 w-14 shrink-0">Query</span>
                <span className="text-light-300 line-clamp-2">{toast.message}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
