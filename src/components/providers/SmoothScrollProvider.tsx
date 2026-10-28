"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // Update global progress indicator if present
    const progressBar = document.getElementById("global-scroll-progress");
    const handleScroll = () => {
      if (progressBar) {
        const progress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        progressBar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {/* Global Scroll Progress Indicator (Accessible & GPU Accelerated) */}
      <div
        id="global-scroll-progress"
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-[#6D795B] origin-left z-50 pointer-events-none scale-x-0 transition-transform duration-75 ease-out"
      />
      {children}
    </>
  );
}
