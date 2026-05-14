'use client';

import { useRef, useEffect, useState } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  brightness: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  color: [number, number, number];
}

interface Nebula {
  x: number;
  y: number;
  radius: number;
  color: [number, number, number];
  opacity: number;
  driftX: number;
  driftY: number;
  pulseSpeed: number;
  pulseOffset: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  length: number;
  brightness: number;
}

interface OrbitParticle {
  angle: number;
  orbitRadiusX: number;
  orbitRadiusY: number;
  speed: number;
  size: number;
  color: [number, number, number];
  offsetX: number;
  offsetY: number;
  currentX: number;
  currentY: number;
  // Energy pulse state
  pulseGlow: number;
  pulseDecay: number;
}

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animId = useRef<number>(0);
  const mouse = useRef({ x: -9999, y: -9999 });
  const time = useRef(0);
  const lastTime = useRef(0);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window;
    setIsMobileDevice(mobile);
    if (mobile) return; // Skip entire canvas setup on mobile
  }, []);

  useEffect(() => {
    if (isMobileDevice) return; // Skip canvas animation on mobile
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: false });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let centerX = 0;
    let centerY = 0;
    const isMobile = window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window;

    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      centerX = width / 2;
      centerY = height / 2;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    // Star colors
    const starColors: [number, number, number][] = [
      [255, 255, 255],
      [180, 210, 255],
      [255, 230, 180],
      [140, 180, 255],
      [200, 180, 255],
      [79, 140, 255],
      [200, 169, 106],
    ];

    // Create stars
    const starCount = isMobile ? 100 : 400;
    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: (Math.random() - 0.5) * width * 2.5,
      y: (Math.random() - 0.5) * height * 2.5,
      z: Math.random() * 3 + 0.3,
      size: Math.random() * 2.2 + 0.3,
      brightness: Math.random() * 0.7 + 0.3,
      twinkleSpeed: Math.random() * 2 + 1,
      twinkleOffset: Math.random() * Math.PI * 2,
      color: starColors[Math.floor(Math.random() * starColors.length)],
    }));

    // Nebula clouds (skip on mobile — 5 radial gradients per frame is expensive)
    const nebulae: Nebula[] = isMobile ? [] : [
      { x: width * 0.2, y: height * 0.3, radius: 350, color: [79, 140, 255], opacity: 0.04, driftX: 0.15, driftY: -0.08, pulseSpeed: 0.8, pulseOffset: 0 },
      { x: width * 0.75, y: height * 0.6, radius: 300, color: [200, 169, 106], opacity: 0.035, driftX: -0.1, driftY: 0.12, pulseSpeed: 0.6, pulseOffset: 2 },
      { x: width * 0.5, y: height * 0.15, radius: 250, color: [160, 100, 255], opacity: 0.025, driftX: 0.08, driftY: 0.05, pulseSpeed: 1.0, pulseOffset: 4 },
      { x: width * 0.3, y: height * 0.8, radius: 280, color: [100, 200, 255], opacity: 0.02, driftX: -0.12, driftY: -0.06, pulseSpeed: 0.7, pulseOffset: 1 },
      { x: width * 0.85, y: height * 0.2, radius: 200, color: [255, 100, 150], opacity: 0.018, driftX: 0.05, driftY: 0.1, pulseSpeed: 0.9, pulseOffset: 3 },
    ];

    // Shooting stars (skip on mobile)
    const shootingStars: ShootingStar[] = [];

    const spawnShootingStar = () => {
      if (shootingStars.length >= 3) return;
      const angle = Math.random() * 0.5 + 0.3;
      const speed = Math.random() * 8 + 6;
      shootingStars.push({
        x: Math.random() * width * 0.8,
        y: Math.random() * height * 0.3,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: Math.random() * 40 + 30,
        length: Math.random() * 80 + 60,
        brightness: Math.random() * 0.5 + 0.5,
      });
    };

    const shootingInterval = isMobile ? null : setInterval(() => {
      if (Math.random() < 0.4) spawnShootingStar();
    }, 2000);

    // --- Orbiting Particles ---
    const orbitColors: [number, number, number][] = [
      [79, 140, 255],   // accent blue
      [200, 169, 106],  // accent gold
      [255, 255, 255],  // white
      [140, 180, 255],  // light blue
    ];

    const orbitParticleCount = isMobile ? 20 : 80;
    const orbitParticles: OrbitParticle[] = Array.from({ length: orbitParticleCount }, () => {
      const radiusBase = Math.random() * 180 + 100; // 100-280px from center
      return {
        angle: Math.random() * Math.PI * 2,
        orbitRadiusX: radiusBase + (Math.random() - 0.5) * 60,
        orbitRadiusY: (radiusBase + (Math.random() - 0.5) * 60) * (0.35 + Math.random() * 0.3), // elliptical
        speed: (Math.random() * 0.0003 + 0.0001) * (Math.random() < 0.5 ? 1 : -1),
        size: Math.random() * 2 + 1,
        color: orbitColors[Math.floor(Math.random() * orbitColors.length)],
        offsetX: (Math.random() - 0.5) * 30,
        offsetY: (Math.random() - 0.5) * 20,
        currentX: 0,
        currentY: 0,
        pulseGlow: 0,
        pulseDecay: 0,
      };
    });

    // Energy pulse timer
    let nextPulseTime = 3000 + Math.random() * 2000;

    // Galaxy spiral arm dust — pre-compute positions for performance
    const arms = 3;
    const armPoints = isMobile ? 30 : 100;
    const spiralTightness = 0.4;
    const spiralDust: { armOffset: number; j: number; dist: number; spread: number; size: number; fade: number }[] = [];
    for (let arm = 0; arm < arms; arm++) {
      const armOffset = (arm / arms) * Math.PI * 2;
      for (let j = 0; j < armPoints; j++) {
        const dist = (j / armPoints) * Math.min(width, height) * 0.45;
        spiralDust.push({
          armOffset,
          j,
          dist,
          spread: (Math.random() - 0.5) * dist * 0.3,
          size: Math.random() * 1.5 + 0.3,
          fade: 1 - j / armPoints,
        });
      }
    }

    const drawGalaxySpiralDust = (t: number) => {
      const rotationSpeed = t * 0.00008;
      for (let i = 0; i < spiralDust.length; i++) {
        const d = spiralDust[i];
        const angle = d.armOffset + d.j * spiralTightness * 0.08 + rotationSpeed;
        const alpha = d.fade * 0.015 * (0.5 + 0.5 * Math.sin(t * 0.001 + d.j * 0.1));
        if (alpha < 0.003) continue;

        const sx = centerX + Math.cos(angle) * d.dist + Math.cos(angle + Math.PI / 2) * d.spread;
        const sy = centerY + Math.sin(angle) * d.dist * 0.5 + Math.sin(angle + Math.PI / 2) * d.spread * 0.5;

        ctx.beginPath();
        ctx.arc(sx, sy, d.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(140, 180, 255, ${alpha})`;
        ctx.fill();
      }
    };

    const animate = (timestamp: number) => {
      // Time-based animation
      if (lastTime.current === 0) lastTime.current = timestamp;
      const dt = Math.min(timestamp - lastTime.current, 50); // cap delta to avoid jumps
      lastTime.current = timestamp;
      time.current += dt;
      const t = time.current;

      // Clear
      ctx.fillStyle = '#050510';
      ctx.fillRect(0, 0, width, height);

      // Deep space gradient
      const bgGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(width, height) * 0.7);
      bgGrad.addColorStop(0, 'rgba(15, 10, 40, 0.6)');
      bgGrad.addColorStop(0.4, 'rgba(8, 5, 25, 0.4)');
      bgGrad.addColorStop(1, 'rgba(2, 2, 10, 0)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Galaxy spiral dust
      drawGalaxySpiralDust(t);

      // Nebula clouds
      nebulae.forEach((n) => {
        const pulse = 1 + 0.15 * Math.sin(t * 0.001 * n.pulseSpeed + n.pulseOffset);
        const nx = n.x + Math.sin(t * 0.0003 * n.driftX) * 60;
        const ny = n.y + Math.cos(t * 0.0003 * n.driftY) * 40;
        const mx = (mouse.current.x - centerX) * 0.015;
        const my = (mouse.current.y - centerY) * 0.015;

        const grad = ctx.createRadialGradient(nx + mx, ny + my, 0, nx + mx, ny + my, n.radius * pulse);
        grad.addColorStop(0, `rgba(${n.color[0]}, ${n.color[1]}, ${n.color[2]}, ${n.opacity * pulse})`);
        grad.addColorStop(0.4, `rgba(${n.color[0]}, ${n.color[1]}, ${n.color[2]}, ${n.opacity * 0.5 * pulse})`);
        grad.addColorStop(1, `rgba(${n.color[0]}, ${n.color[1]}, ${n.color[2]}, 0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      });

      // Stars
      const rotAngle = t * 0.00003;
      const cosR = Math.cos(rotAngle);
      const sinR = Math.sin(rotAngle);

      stars.forEach((star) => {
        const parallaxFactor = 0.02 / star.z;
        const mx = (mouse.current.x - centerX) * parallaxFactor;
        const my = (mouse.current.y - centerY) * parallaxFactor;

        const rx = star.x * cosR - star.y * sinR;
        const ry = star.x * sinR + star.y * cosR;

        const sx = centerX + rx / star.z + mx;
        const sy = centerY + ry / star.z + my;

        if (sx < -10 || sx > width + 10 || sy < -10 || sy > height + 10) return;

        const twinkle = 0.5 + 0.5 * Math.sin(t * 0.003 * star.twinkleSpeed + star.twinkleOffset);
        const alpha = star.brightness * twinkle;
        const drawSize = star.size / star.z;

        // Only draw glow for the brightest, largest stars (limit gradient calls)
        if (!isMobile && drawSize > 1.5 && alpha > 0.6) {
          const glowGrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, drawSize * 3);
          glowGrad.addColorStop(0, `rgba(${star.color[0]}, ${star.color[1]}, ${star.color[2]}, ${alpha * 0.25})`);
          glowGrad.addColorStop(1, `rgba(${star.color[0]}, ${star.color[1]}, ${star.color[2]}, 0)`);
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(sx, sy, drawSize * 3, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(sx, sy, drawSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color[0]}, ${star.color[1]}, ${star.color[2]}, ${alpha})`;
        ctx.fill();
      });

      // Shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.x += ss.vx;
        ss.y += ss.vy;
        ss.life++;

        const lifeRatio = ss.life / ss.maxLife;
        const fadeIn = Math.min(lifeRatio * 5, 1);
        const fadeOut = 1 - Math.max((lifeRatio - 0.6) / 0.4, 0);
        const alpha = fadeIn * fadeOut * ss.brightness;

        if (ss.life > ss.maxLife || ss.x > width + 100 || ss.y > height + 100) {
          shootingStars.splice(i, 1);
          continue;
        }

        const speed = Math.sqrt(ss.vx * ss.vx + ss.vy * ss.vy);
        const tailLen = ss.length / speed;
        const grad = ctx.createLinearGradient(ss.x, ss.y, ss.x - ss.vx * tailLen, ss.y - ss.vy * tailLen);
        grad.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
        grad.addColorStop(0.3, `rgba(180, 210, 255, ${alpha * 0.5})`);
        grad.addColorStop(1, `rgba(79, 140, 255, 0)`);

        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - ss.vx * tailLen, ss.y - ss.vy * tailLen);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }

      // Central galaxy core glow
      const coreGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 180);
      const corePulse = 0.02 + 0.008 * Math.sin(t * 0.0008);
      coreGlow.addColorStop(0, `rgba(100, 140, 255, ${corePulse})`);
      coreGlow.addColorStop(0.5, `rgba(60, 80, 200, ${corePulse * 0.4})`);
      coreGlow.addColorStop(1, 'rgba(20, 20, 80, 0)');
      ctx.fillStyle = coreGlow;
      ctx.fillRect(0, 0, width, height);

      // --- Orbiting Particles Layer ---
      // Energy pulse: trigger a random particle every 3-5s
      nextPulseTime -= dt;
      if (nextPulseTime <= 0) {
        const idx = Math.floor(Math.random() * orbitParticles.length);
        orbitParticles[idx].pulseGlow = 1;
        orbitParticles[idx].pulseDecay = 1; // 1 second fade
        nextPulseTime = 3000 + Math.random() * 2000;
      }

      const mouseX = mouse.current.x;
      const mouseY = mouse.current.y;
      const repelRadius = 150;
      const connectRadius = 200;

      // Heading attraction zone (centered on screen, covers full heading area)
      const headingBounds = {
        left: centerX - 400,
        right: centerX + 400,
        top: centerY - 120,
        bottom: centerY + 120,
      };
      const headingAttractionRadius = 250;
      const mouseInHeading = !isMobile &&
        mouseX > headingBounds.left - 80 && mouseX < headingBounds.right + 80 &&
        mouseY > headingBounds.top - 60 && mouseY < headingBounds.bottom + 60;

      // Update particle positions
      for (let i = 0; i < orbitParticles.length; i++) {
        const p = orbitParticles[i];

        // Advance orbit angle
        p.angle += p.speed * dt;

        // Base orbit position (centered on heading area)
        const baseX = centerX + Math.cos(p.angle) * p.orbitRadiusX + p.offsetX;
        const baseY = centerY + Math.sin(p.angle) * p.orbitRadiusY + p.offsetY;

        // Mouse repulsion (desktop only)
        let targetX = baseX;
        let targetY = baseY;

        if (!isMobile) {
          if (mouseInHeading) {
            // Heading attraction mode: particles near heading edges get pulled inward
            // Find closest point on heading boundary
            const clampX = Math.max(headingBounds.left, Math.min(headingBounds.right, baseX));
            const clampY = Math.max(headingBounds.top, Math.min(headingBounds.bottom, baseY));
            const dxh = baseX - clampX;
            const dyh = baseY - clampY;
            const distHeading = Math.sqrt(dxh * dxh + dyh * dyh);

            if (distHeading < headingAttractionRadius && distHeading > 10) {
              const attractStrength = (1 - distHeading / headingAttractionRadius) * 18;
              targetX -= (dxh / distHeading) * attractStrength;
              targetY -= (dyh / distHeading) * attractStrength;
            }
          } else {
            // Normal mouse repulsion
            const dxm = baseX - mouseX;
            const dym = baseY - mouseY;
            const distMouse = Math.sqrt(dxm * dxm + dym * dym);

            if (distMouse < repelRadius && distMouse > 0) {
              const repelStrength = (1 - distMouse / repelRadius) * 40;
              targetX += (dxm / distMouse) * repelStrength;
              targetY += (dym / distMouse) * repelStrength;
            }
          }
        }

        // Smooth spring-like interpolation toward target
        p.currentX += (targetX - p.currentX) * 0.08;
        p.currentY += (targetY - p.currentY) * 0.08;

        // Decay energy pulse
        if (p.pulseGlow > 0) {
          p.pulseGlow -= (dt / 1000) / p.pulseDecay;
          if (p.pulseGlow < 0) p.pulseGlow = 0;
        }
      }

      // Draw connection lines (desktop only)
      if (!isMobile) {
        // Collect particles near mouse for connection line checks
        const nearMouse: OrbitParticle[] = [];
        for (let i = 0; i < orbitParticles.length; i++) {
          const p = orbitParticles[i];
          const dxm = p.currentX - mouseX;
          const dym = p.currentY - mouseY;
          if (dxm * dxm + dym * dym < connectRadius * connectRadius) {
            nearMouse.push(p);
          }
        }

        // Draw lines between nearby particles that are both near mouse
        const lineMaxDist = 120;
        for (let i = 0; i < nearMouse.length; i++) {
          for (let j = i + 1; j < nearMouse.length; j++) {
            const a = nearMouse[i];
            const b = nearMouse[j];
            const dxp = a.currentX - b.currentX;
            const dyp = a.currentY - b.currentY;
            const distSq = dxp * dxp + dyp * dyp;
            if (distSq < lineMaxDist * lineMaxDist) {
              const dist = Math.sqrt(distSq);
              const lineAlpha = (1 - dist / lineMaxDist) * 0.25;
              ctx.beginPath();
              ctx.moveTo(a.currentX, a.currentY);
              ctx.lineTo(b.currentX, b.currentY);
              ctx.strokeStyle = `rgba(79, 140, 255, ${lineAlpha})`;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }

        // Draw faint connection lines from attracted particles to heading center when mouse is in heading
        if (mouseInHeading) {
          for (let i = 0; i < orbitParticles.length; i++) {
            const p = orbitParticles[i];
            const clampX = Math.max(headingBounds.left, Math.min(headingBounds.right, p.currentX));
            const clampY = Math.max(headingBounds.top, Math.min(headingBounds.bottom, p.currentY));
            const dxh = p.currentX - clampX;
            const dyh = p.currentY - clampY;
            const distH = Math.sqrt(dxh * dxh + dyh * dyh);

            if (distH < 80 && distH > 5) {
              const lineAlpha = (1 - distH / 80) * 0.12;
              ctx.beginPath();
              ctx.moveTo(p.currentX, p.currentY);
              ctx.lineTo(clampX, clampY);
              ctx.strokeStyle = `rgba(79, 140, 255, ${lineAlpha})`;
              ctx.lineWidth = 0.4;
              ctx.stroke();
            }
          }
        }
      }

      // Draw orbiting particles
      for (let i = 0; i < orbitParticles.length; i++) {
        const p = orbitParticles[i];
        const px = p.currentX;
        const py = p.currentY;

        // Skip if off-screen
        if (px < -20 || px > width + 20 || py < -20 || py > height + 20) continue;

        const glowExtra = p.pulseGlow;
        const totalSize = p.size + glowExtra * 3;

        // Glow halo for larger particles or pulsing ones
        if (totalSize > 1.8 || glowExtra > 0.1) {
          const haloRadius = totalSize * 4 + glowExtra * 8;
          const haloAlpha = 0.15 + glowExtra * 0.4;
          const glowGrad = ctx.createRadialGradient(px, py, 0, px, py, haloRadius);
          glowGrad.addColorStop(0, `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, ${haloAlpha})`);
          glowGrad.addColorStop(1, `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, 0)`);
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(px, py, haloRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Particle core
        const coreAlpha = 0.6 + glowExtra * 0.4;
        ctx.beginPath();
        ctx.arc(px, py, totalSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, ${coreAlpha})`;
        ctx.fill();
      }

      // Subtle vignette (drawn last)
      const vignette = ctx.createRadialGradient(centerX, centerY, height * 0.3, centerX, centerY, Math.max(width, height) * 0.8);
      vignette.addColorStop(0, 'rgba(0,0,0,0)');
      vignette.addColorStop(1, 'rgba(0,0,0,0.5)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      animId.current = requestAnimationFrame(animate);
    };

    animId.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId.current);
      if (shootingInterval) clearInterval(shootingInterval);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobileDevice]);

  // On mobile, render a lightweight static gradient instead of canvas
  if (isMobileDevice) {
    return (
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          zIndex: 0,
          background: 'radial-gradient(ellipse at center, rgba(15, 10, 40, 0.8) 0%, #050510 70%)',
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}
