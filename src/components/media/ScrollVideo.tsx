"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

interface ScrollVideoProps {
  src: string;
  poster: string;
  alt?: string;
  className?: string;
  overlayOpacity?: number;
  priority?: boolean;
  progress?: number; // 0.0 to 1.0 from ScrollTrigger
  aspectRatio?: string; // e.g. "16/9", or "none" for full bleed background
}

export function ScrollVideo({
  src,
  poster,
  alt = "Natural Protein Video",
  className = "",
  overlayOpacity = 0.2,
  priority = false,
  progress = 0,
  aspectRatio = "none",
}: ScrollVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [hasError, setHasError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Default to 10.01 seconds (verified duration of the supplied MP4s) so seeking works immediately
  const durationRef = useRef<number>(10.01);
  const targetTimeRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  // Check reduced motion preference
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Initialize and attach video lifecycle listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Guarantee the video is paused so it only moves on scroll
    video.pause();

    const updateDuration = () => {
      if (isFinite(video.duration) && video.duration > 0) {
        durationRef.current = video.duration;
      }
    };

    if (isFinite(video.duration) && video.duration > 0) {
      updateDuration();
    }

    video.addEventListener("loadedmetadata", updateDuration);
    video.addEventListener("durationchange", updateDuration);
    video.addEventListener("canplay", updateDuration);

    // Prompt browser to fetch metadata
    try {
      video.load();
    } catch {
      // ignore
    }

    return () => {
      video.removeEventListener("loadedmetadata", updateDuration);
      video.removeEventListener("durationchange", updateDuration);
      video.removeEventListener("canplay", updateDuration);
    };
  }, [src]);

  // Synchronize video currentTime with scroll progress via requestAnimationFrame
  useEffect(() => {
    if (prefersReducedMotion || hasError) return;

    const dur = durationRef.current > 0 ? durationRef.current : 10.01;
    const clampedProgress = Math.max(0, Math.min(1, progress));
    targetTimeRef.current = clampedProgress * dur;

    if (rafIdRef.current === null) {
      rafIdRef.current = requestAnimationFrame(() => {
        const video = videoRef.current;
        if (video) {
          const target = targetTimeRef.current;
          // Apply currentTime directly
          try {
            if (Math.abs(video.currentTime - target) > 0.005) {
              video.currentTime = target;
            }
          } catch {
            // ignore seek interruptions
          }
        }
        rafIdRef.current = null;
      });
    }
  }, [progress, prefersReducedMotion, hasError]);

  // Clean up any pending RAF on unmount
  useEffect(() => {
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, []);

  const containerStyle: React.CSSProperties =
    aspectRatio && aspectRatio !== "none" ? { aspectRatio } : {};

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-[#E9E4DB] ${className}`}
      style={containerStyle}
    >
      {/* Fallback Poster: displayed only if reduced motion is requested or video errors */}
      {(hasError || prefersReducedMotion) && (
        <Image
          src={poster}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 1920px"
          className="object-cover z-10"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        />
      )}

      {/* HTML5 Video Element: Always visible, strictly paused, scrubbed by currentTime */}
      {!prefersReducedMotion && !hasError && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          preload="auto"
          onError={() => setHasError(true)}
          className="absolute inset-0 h-full w-full object-cover z-0"
          aria-hidden="true"
        />
      )}

      {/* Editorial Atmosphere Tint */}
      {overlayOpacity > 0 && (
        <div
          className="pointer-events-none absolute inset-0 bg-[#20211F] z-20"
          style={{ opacity: overlayOpacity }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
