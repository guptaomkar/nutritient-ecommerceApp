"use client";

import React, { useEffect } from "react";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Global scroll progress indicator (GPU accelerated transform: scaleX)
    const progressBar = document.getElementById("global-scroll-progress");
    if (!progressBar) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (docHeight > 0) {
            const progress = window.scrollY / docHeight;
            progressBar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
