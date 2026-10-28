"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ScrollVideoProps {
  src: string;
  poster: string;
  alt?: string;
  className?: string;
  overlayOpacity?: number;
  priority?: boolean;
  progress?: number; // Controlled external progress (0 to 1) from parent ScrollTrigger
  triggerPin?: boolean; // Autonomous mode: whether ScrollVideo should pin its container
  pinDistance?: string; // e.g. "+=200%"
  onProgress?: (p: number) => void;
}

export function ScrollVideo({
  src,
  poster,
  alt = "Natural Protein Video",
  className = "",
  overlayOpacity = 0.15,
  priority = false,
  progress: externalProgress,
  triggerPin = false,
  pinDistance = "+=200%",
  onProgress,
}: ScrollVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [firstFrameRendered, setFirstFrameRendered] = useState(false);

  const targetTimeRef = useRef(0);
  const isSeekingRef = useRef(false);
  const durationRef = useRef(0);
  const internalProgressRef = useRef(0);

  // Check reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Viewport IntersectionObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: "200px 0px 200px 0px", threshold: [0, 0.1, 0.5] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Handle video metadata loaded
  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isFinite(video.duration) && video.duration > 0) {
      durationRef.current = video.duration;
      setIsLoaded(true);
      // Pre-seek to first frame so it is buffered and decoded
      try {
        video.currentTime = 0.001;
      } catch {
        // Ignored
      }
    }
  }, []);

  const handleSeeked = useCallback(() => {
    isSeekingRef.current = false;
    setFirstFrameRendered(true);

    // If target changed while seeking, seek again
    const video = videoRef.current;
    if (video && durationRef.current > 0) {
      const delta = Math.abs(video.currentTime - targetTimeRef.current);
      if (delta > 0.04) {
        isSeekingRef.current = true;
        try {
          if ("fastSeek" in video && typeof (video as unknown as { fastSeek: (t: number) => void }).fastSeek === "function") {
            (video as unknown as { fastSeek: (t: number) => void }).fastSeek(targetTimeRef.current);
          } else {
            video.currentTime = targetTimeRef.current;
          }
        } catch {
          isSeekingRef.current = false;
        }
      }
    }
  }, []);

  // Coalesced seek function
  const seekToProgress = useCallback((p: number) => {
    const video = videoRef.current;
    const dur = durationRef.current;
    if (!video || dur <= 0) return;

    const clampedProgress = Math.max(0, Math.min(1, p));
    const target = clampedProgress * dur;
    targetTimeRef.current = target;

    if (!isSeekingRef.current && video.readyState >= 2) {
      const delta = Math.abs(video.currentTime - target);
      if (delta > 0.03) {
        isSeekingRef.current = true;
        try {
          if ("fastSeek" in video && typeof (video as unknown as { fastSeek: (t: number) => void }).fastSeek === "function") {
            (video as unknown as { fastSeek: (t: number) => void }).fastSeek(target);
          } else {
            video.currentTime = target;
          }
        } catch {
          isSeekingRef.current = false;
        }
      }
    }
  }, []);

  // Controlled mode: when externalProgress is provided
  useEffect(() => {
    if (typeof externalProgress === "number" && !prefersReducedMotion && isInView) {
      seekToProgress(externalProgress);
    }
  }, [externalProgress, prefersReducedMotion, isInView, seekToProgress]);

  // Autonomous mode: when triggerPin is true and no externalProgress
  useEffect(() => {
    if (typeof externalProgress === "number" || !triggerPin || prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    gsap.registerPlugin(ScrollTrigger);

    const st = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: pinDistance,
      pin: true,
      scrub: 0.3,
      onUpdate: (self) => {
        internalProgressRef.current = self.progress;
        seekToProgress(self.progress);
        if (onProgress) onProgress(self.progress);
      },
    });

    return () => {
      st.kill();
    };
  }, [triggerPin, pinDistance, externalProgress, prefersReducedMotion, onProgress, seekToProgress]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-sm bg-[#E9E4DB] ${className}`}
      style={{ aspectRatio: "16/9" }}
    >
      {/* High-Resolution Poster Image (Guaranteed fallback, visible until first frame is rendered) */}
      <Image
        src={poster}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 1200px"
        className={`object-cover transition-opacity duration-500 ${
          firstFrameRendered && !hasError && !prefersReducedMotion ? "opacity-0" : "opacity-100"
        }`}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
      />

      {/* HTML5 Video Element (Muted, playsInline, NO autoplay attribute for scrubbed videos) */}
      {!prefersReducedMotion && !hasError && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={handleLoadedMetadata}
          onSeeked={handleSeeked}
          onError={() => setHasError(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            firstFrameRendered ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        />
      )}

      {/* Editorial Atmosphere Overlay */}
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
