"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Check reduced motion
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) {
      return;
    }

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      syncTouch: false, // Never hijack mobile touch gestures
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
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

    // Ensure ScrollTrigger measures the layout after initial mount
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      window.removeEventListener("scroll", handleScroll);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {/* GPU Accelerated Scroll Indicator */}
      <div
        id="global-scroll-progress"
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-[#6D795B] origin-left z-50 pointer-events-none scale-x-0 transition-transform duration-75 ease-out"
      />
      {children}
    </>
  );
}
