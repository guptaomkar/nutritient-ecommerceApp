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
  completionThreshold?: number; // Normalized threshold where video reaches 100% (default 0.85)
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
  completionThreshold = 0.85,
}: ScrollVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [hasError, setHasError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Default to 10.01 seconds (verified duration of the supplied MP4s)
  const durationRef = useRef<number>(10.01);
  const targetTimeRef = useRef<number>(0);
  const currentTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);
  const pendingTimeRef = useRef<number | null>(null);
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

  // Perform seek safely without dropping target updates or locking the decoder
  const performSeek = (time: number, video: HTMLVideoElement) => {
    if (isSeekingRef.current) {
      pendingTimeRef.current = time;
      return;
    }

    if (Math.abs(video.currentTime - time) < 0.015) {
      return;
    }

    isSeekingRef.current = true;
    try {
      if ("fastSeek" in video && typeof (video as unknown as { fastSeek: (t: number) => void }).fastSeek === "function") {
        (video as unknown as { fastSeek: (t: number) => void }).fastSeek(time);
      } else {
        video.currentTime = time;
      }
    } catch {
      isSeekingRef.current = false;
    }
  };

  // Video lifecycle listeners & metadata
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();

    const updateDuration = () => {
      if (isFinite(video.duration) && video.duration > 0) {
        durationRef.current = video.duration;
      }
    };

    if (isFinite(video.duration) && video.duration > 0) {
      updateDuration();
    }

    const onSeeked = () => {
      isSeekingRef.current = false;
      const v = videoRef.current;
      if (!v) return;

      if (pendingTimeRef.current !== null) {
        const next = pendingTimeRef.current;
        pendingTimeRef.current = null;
        performSeek(next, v);
      }
    };

    video.addEventListener("loadedmetadata", updateDuration);
    video.addEventListener("durationchange", updateDuration);
    video.addEventListener("canplay", updateDuration);
    video.addEventListener("seeked", onSeeked);

    try {
      video.load();
    } catch {
      // ignore
    }

    return () => {
      video.removeEventListener("loadedmetadata", updateDuration);
      video.removeEventListener("durationchange", updateDuration);
      video.removeEventListener("canplay", updateDuration);
      video.removeEventListener("seeked", onSeeked);
    };
  }, [src]);

  // Map incoming scroll progress to targetTime:
  // Completes 100% of the video before the section unpins at completionThreshold (e.g. 0.85).
  useEffect(() => {
    if (prefersReducedMotion || hasError) return;
    const dur = durationRef.current > 0 ? durationRef.current : 10.01;

    // Normalizing: 0.0 to completionThreshold maps smoothly to 0.0 to 1.0 (full video).
    // Above completionThreshold, it stays cleanly at 100% (the completed state).
    const normalized = Math.min(1, Math.max(0, progress / completionThreshold));

    // Cap slightly before exact EOF (dur - 0.04) to prevent EOF freeze/stall
    targetTimeRef.current = Math.min(dur - 0.04, normalized * dur);
  }, [progress, completionThreshold, prefersReducedMotion, hasError]);

  // High-performance RAF seeking loop with responsive interpolation
  useEffect(() => {
    if (prefersReducedMotion || hasError) return;

    let running = true;
    const LERP = 0.22; // Responsive catch-up (~4 frames / 60ms) without lag

    const tick = () => {
      if (!running) return;

      const video = videoRef.current;
      if (video && video.readyState >= 2) {
        const target = targetTimeRef.current;
        const current = currentTimeRef.current;
        const delta = target - current;

        if (Math.abs(delta) > 0.01) {
          const next = current + delta * LERP;
          currentTimeRef.current = next;
          performSeek(next, video);
        } else if (Math.abs(delta) > 0.001) {
          currentTimeRef.current = target;
          performSeek(target, video);
        }
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    const video = videoRef.current;
    if (video && isFinite(video.currentTime)) {
      currentTimeRef.current = video.currentTime;
    }

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      running = false;
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [prefersReducedMotion, hasError]);

  const hasExplicitHeight =
    /\bh-\[|h-full|h-screen|h-dvh|h-svh|h-lvh|min-h-/.test(className);

  const containerStyle: React.CSSProperties =
    aspectRatio && aspectRatio !== "none"
      ? { aspectRatio }
      : !hasExplicitHeight
        ? { aspectRatio: "16/9" }
        : {};

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

      {/* HTML5 Video Element: Always visible, strictly scroll-driven */}
      {!prefersReducedMotion && !hasError && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          preload="auto"
          onError={() => setHasError(true)}
          className="absolute inset-0 h-full w-full object-cover z-0 pointer-events-none"
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
