"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface ScrollVideoProps {
  src: string;
  poster: string;
  alt?: string;
  className?: string;
  overlayOpacity?: number;
  priority?: boolean;
}

export function ScrollVideo({
  src,
  poster,
  alt = "Natural Protein Video",
  className = "",
  overlayOpacity = 0.15,
  priority = false,
}: ScrollVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasPlayedFirstFrame, setHasPlayedFirstFrame] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // IntersectionObserver: Only activate video when in view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: "150px 0px 150px 0px", threshold: [0, 0.25, 0.5] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Manage Play / Pause based on viewport visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion || hasError) return;

    if (isInView) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay prevented by browser policy; poster remains cleanly visible
          });
      }
    } else {
      if (!video.paused) {
        video.pause();
        setIsPlaying(false);
      }
    }
  }, [isInView, prefersReducedMotion, hasError]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  const handlePlaying = useCallback(() => {
    setHasPlayedFirstFrame(true);
    setIsPlaying(true);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-sm bg-[#E9E4DB] group ${className}`}
      style={{ aspectRatio: "16/9" }}
    >
      {/* High-Resolution Poster (Never flashes blank; remains visible until video actually starts playing) */}
      <Image
        src={poster}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 1200px"
        className={`object-cover transition-opacity duration-700 ${
          hasPlayedFirstFrame && !hasError && !prefersReducedMotion ? "opacity-0" : "opacity-100"
        }`}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
      />

      {/* HTML5 Video Element (Muted, looping, playsInline) */}
      {!prefersReducedMotion && !hasError && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted={isMuted}
          playsInline
          loop
          preload="metadata"
          onPlaying={handlePlaying}
          onError={() => setHasError(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            hasPlayedFirstFrame ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        />
      )}

      {/* Subtle Warm Tone Tint */}
      {overlayOpacity > 0 && (
        <div
          className="pointer-events-none absolute inset-0 bg-[#20211F]"
          style={{ opacity: overlayOpacity }}
          aria-hidden="true"
        />
      )}

      {/* Minimalist Floating Controls Pill (Unobtrusive & Luxury Standard) */}
      {hasPlayedFirstFrame && !hasError && !prefersReducedMotion && (
        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 flex items-center gap-1.5 bg-[#20211F]/70 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/15 text-white/90 opacity-75 hover:opacity-100 transition-opacity">
          <button
            onClick={togglePlay}
            className="p-1 hover:text-white transition-colors cursor-pointer"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={toggleMute}
            className="p-1 hover:text-white transition-colors cursor-pointer"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      )}
    </div>
  );
}
