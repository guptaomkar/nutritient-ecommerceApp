"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Check reduced motion
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) {
      return;
    }

    // Initialize Lenis with smoother parameters
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      syncTouch: false, // Never hijack mobile touch gestures
      autoResize: true,
    });

    lenisRef.current = lenis;

    // Connect Lenis scroll events to ScrollTrigger for proper synchronization
    lenis.on("scroll", ScrollTrigger.update);

    // Use GSAP ticker for the Lenis RAF loop — this ensures Lenis and GSAP
    // share the same timing source, eliminating frame desync between smooth
    // scroll position and ScrollTrigger-driven animations / video seeking.
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);

    // Disable GSAP's built-in lag smoothing so scroll-linked animations
    // don't stutter after idle periods.
    gsap.ticker.lagSmoothing(0);

    // Scroll progress bar
    const progressBar = document.getElementById("global-scroll-progress");
    const handleScroll = () => {
      if (!progressBar) return;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const progress = window.scrollY / docHeight;
        progressBar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Ensure ScrollTrigger measures the layout after initial mount and fonts load
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    // Re-measure when fonts finish loading (can shift layout heights)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    return () => {
      clearTimeout(refreshTimer);
      window.removeEventListener("scroll", handleScroll);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <>
      {/* GPU Accelerated Scroll Indicator */}
      <div
        id="global-scroll-progress"
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-[#6D795B] origin-left z-50 pointer-events-none"
        style={{
          transform: "scaleX(0)",
          willChange: "transform",
        }}
      />
      {children}
    </>
  );
}
