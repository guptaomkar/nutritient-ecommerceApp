"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";

interface ScrollVideoProps {
  src: string;
  poster: string;
  alt?: string;
  className?: string;
  overlayOpacity?: number;
  autoPlayWhenVisible?: boolean;
  scrubWithScroll?: boolean;
  priority?: boolean;
}

export function ScrollVideo({
  src,
  poster,
  alt = "Natural Protein product video",
  className = "",
  overlayOpacity = 0.25,
  autoPlayWhenVisible = true,
  scrubWithScroll = false,
  priority = false,
}: ScrollVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // IntersectionObserver to only activate video when within 250px of viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: "250px 0px 250px 0px", threshold: [0, 0.25, 0.5, 0.75, 1.0] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Handle video playback or scroll scrub
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isInView || prefersReducedMotion || hasError) {
      if (video && !video.paused) {
        video.pause();
      }
      return;
    }

    if (!scrubWithScroll && autoPlayWhenVisible) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Auto-play was prevented; fallback to poster gracefully
        });
      }
    }
  }, [isInView, prefersReducedMotion, autoPlayWhenVisible, scrubWithScroll, hasError]);

  // Scroll scrub handler (when enabled)
  useEffect(() => {
    if (!scrubWithScroll || prefersReducedMotion || hasError) return;

    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    let rafId: number | null = null;
    let isSeeking = false;

    const handleScroll = () => {
      if (!isInView || isSeeking) return;

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const totalDistance = windowHeight + rect.height;
        const currentDistance = windowHeight - rect.top;
        const progress = Math.max(0, Math.min(1, currentDistance / totalDistance));

        if (video.duration && !isNaN(video.duration)) {
          const targetTime = progress * video.duration;
          if (Math.abs(video.currentTime - targetTime) > 0.05) {
            isSeeking = true;
            video.currentTime = targetTime;
            isSeeking = false;
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [scrubWithScroll, isInView, prefersReducedMotion, hasError]);

  const handleLoadedMetadata = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(false);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-[#E9E4DB] ${className}`}
      style={{ aspectRatio: "16/9" }}
    >
      {/* High-fidelity Poster Image */}
      <Image
        src={poster}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 1200px"
        className={`object-cover transition-opacity duration-700 ${
          isLoaded && !hasError && !prefersReducedMotion ? "opacity-0" : "opacity-100"
        }`}
        priority={priority}
      />

      {/* Video Element (loaded when near view) */}
      {!prefersReducedMotion && !hasError && isInView && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          loop={!scrubWithScroll}
          preload="metadata"
          onLoadedMetadata={handleLoadedMetadata}
          onError={handleError}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        />
      )}

      {/* Subtle Editorial Tone Tint */}
      {overlayOpacity > 0 && (
        <div
          className="pointer-events-none absolute inset-0 bg-[#20211F]"
          style={{ opacity: overlayOpacity }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
