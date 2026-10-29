"use client";

import React, { useRef, useEffect } from "react";

interface PowderParticlesProps {
  className?: string;
  particleCount?: number;
  color?: string;
}

export function PowderParticles({
  className = "",
  particleCount = 40,
  color = "rgba(201, 154, 101, 0.4)", // warm amber / oat tone
}: PowderParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Check reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let lastFrameTime = 0;
    const FRAME_INTERVAL = 1000 / 30; // Cap particles at 30fps to save budget for video scrubbing

    // Resize canvas
    const handleResize = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    // Track intersection — fully stop the RAF loop when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        // Restart the loop if it stopped while invisible
        if (!wasVisible && isVisible) {
          lastFrameTime = 0;
          animationFrameId = requestAnimationFrame(render);
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    // Particles array
    interface Particle {
      x: number;
      y: number;
      radius: number;
      speedX: number;
      speedY: number;
      opacity: number;
      fadeSpeed: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2.5 + 0.8,
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: -Math.random() * 0.45 - 0.1,
        opacity: Math.random() * 0.5 + 0.15,
        fadeSpeed: (Math.random() * 0.008 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
      });
    }

    // Gentle mouse influence
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Animation Loop — throttled to 30fps and paused when off-screen
    const render = (timestamp: number) => {
      if (!isVisible) {
        // Don't schedule next frame — observer will restart when visible
        return;
      }

      // Throttle to ~30fps
      if (timestamp - lastFrameTime < FRAME_INTERVAL) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      lastFrameTime = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move particle
        p.x += p.speedX;
        p.y += p.speedY;

        // Subtle attraction/deflection to mouse
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180 && dist > 1) {
          p.x += (dx / dist) * 0.15;
          p.y += (dy / dist) * 0.15;
        }

        // Pulse opacity
        p.opacity += p.fadeSpeed;
        if (p.opacity > 0.65 || p.opacity < 0.1) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        // Wrap around bounds
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = color.replace(/[\d.]+\)$/g, `${p.opacity})`);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [particleCount, color]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
