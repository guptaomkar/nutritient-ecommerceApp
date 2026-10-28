"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Play, Pause, Sliders, Volume2, VolumeX, Eye } from "lucide-react";

interface ScrollVideoProps {
  src: string;
  poster: string;
  alt?: string;
  className?: string;
  overlayOpacity?: number;
  initialMode?: "scrub" | "play";
  priority?: boolean;
  onProgressChange?: (progress: number) => void;
}

export function ScrollVideo({
  src,
  poster,
  alt = "Natural Protein Video",
  className = "",
  overlayOpacity = 0.2,
  initialMode = "scrub",
  priority = false,
  onProgressChange,
}: ScrollVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [mode, setMode] = useState<"scrub" | "play">(initialMode);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Target progress for smooth LERP seeking
  const targetProgressRef = useRef(0);
  const smoothProgressRef = useRef(0);
  const isSeekingRef = useRef(false);

  // Check reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Handle metadata
  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      setDuration(video.duration || 0);
      setIsLoaded(true);
      // Pre-seek to start frame
      video.currentTime = 0.001;
    }
  }, []);

  // Scroll Scrub Calculation
  useEffect(() => {
    if (prefersReducedMotion || hasError || mode !== "scrub") return;

    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    let rafId: number;

    const calculateScrollProgress = () => {
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate progress as the element moves through viewport
      const totalDistance = viewportHeight + rect.height;
      const currentDistance = viewportHeight - rect.top;
      const rawProgress = currentDistance / totalDistance;
      const clamped = Math.max(0, Math.min(1, rawProgress));

      targetProgressRef.current = clamped;
    };

    // Smooth RAF loop with LERP interpolation
    const updateVideoFrame = () => {
      if (mode === "scrub" && video && video.readyState >= 2 && !video.paused) {
        // Pause if it was somehow playing
        video.pause();
      }

      // Smooth interpolation
      const diff = targetProgressRef.current - smoothProgressRef.current;
      smoothProgressRef.current += diff * 0.12;

      const p = smoothProgressRef.current;
      setProgress(p);
      if (onProgressChange) onProgressChange(p);

      if (video && video.duration && !isSeekingRef.current && Math.abs(diff) > 0.002) {
        const targetTime = p * video.duration;
        if (Math.abs(video.currentTime - targetTime) > 0.03) {
          isSeekingRef.current = true;
          video.currentTime = targetTime;
          setCurrentTime(targetTime);
          isSeekingRef.current = false;
        }
      }

      rafId = requestAnimationFrame(updateVideoFrame);
    };

    window.addEventListener("scroll", calculateScrollProgress, { passive: true });
    calculateScrollProgress();
    rafId = requestAnimationFrame(updateVideoFrame);

    return () => {
      window.removeEventListener("scroll", calculateScrollProgress);
      cancelAnimationFrame(rafId);
    };
  }, [mode, prefersReducedMotion, hasError, onProgressChange]);

  // Continuous playback mode
  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion || hasError) return;

    if (mode === "play") {
      video.loop = true;
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [mode, prefersReducedMotion, hasError]);

  // Update time when playing continuously
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || mode !== "play") return;
    setCurrentTime(video.currentTime);
    const p = video.duration ? video.currentTime / video.duration : 0;
    setProgress(p);
    if (onProgressChange) onProgressChange(p);
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "scrub" ? "play" : "scrub"));
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleManualSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    const video = videoRef.current;
    if (!video || !video.duration) return;

    targetProgressRef.current = val;
    smoothProgressRef.current = val;
    video.currentTime = val * video.duration;
    setProgress(val);
    setCurrentTime(video.currentTime);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = (secs % 60).toFixed(1);
    return `${m.toString().padStart(2, "0")}:${s.padStart(4, "0")}`;
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-sm bg-[#E9E4DB] group ${className}`}
      style={{ aspectRatio: "16/9" }}
    >
      {/* High-Resolution Poster Fallback */}
      <Image
        src={poster}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 1200px"
        className={`object-cover transition-opacity duration-700 ${
          isLoaded && !hasError && !prefersReducedMotion ? "opacity-0" : "opacity-100"
        }`}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
      />

      {/* HTML5 Video Element */}
      {!prefersReducedMotion && !hasError && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted={isMuted}
          playsInline
          preload="auto"
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          onError={() => setHasError(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        />
      )}

      {/* Editorial Ambient Overlay */}
      {overlayOpacity > 0 && (
        <div
          className="pointer-events-none absolute inset-0 bg-[#20211F]"
          style={{ opacity: overlayOpacity }}
          aria-hidden="true"
        />
      )}

      {/* Interactive Floating Video HUD (Modern Luxury Aesthetic) */}
      <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-20 flex items-center justify-between gap-3 bg-[#20211F]/70 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/10 text-[#F5F3EE] opacity-90 group-hover:opacity-100 transition-opacity">
        {/* Left: Mode Badge & Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMode}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[10px] uppercase font-semibold tracking-wider transition-colors cursor-pointer"
            title={mode === "scrub" ? "Switch to Autoplay" : "Switch to Scroll Scrub"}
          >
            {mode === "scrub" ? (
              <>
                <Sliders className="w-3 h-3 text-[#A7B39A]" />
                <span className="hidden xs:inline">Scroll Scrub</span>
              </>
            ) : (
              <>
                {isPlaying ? <Pause className="w-3 h-3 text-[#C99A65]" /> : <Play className="w-3 h-3 text-[#C99A65]" />}
                <span className="hidden xs:inline">Playing</span>
              </>
            )}
          </button>

          <span className="text-[10px] text-[#A7B39A] font-mono hidden sm:inline">
            {formatTime(currentTime)} / {formatTime(duration || 0)}
          </span>
        </div>

        {/* Center: Interactive Scrubber Slider */}
        <div className="flex-1 max-w-xs mx-2 flex items-center">
          <input
            type="range"
            min="0"
            max="1"
            step="0.001"
            value={progress}
            onChange={handleManualSeek}
            className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-[#A7B39A]"
            aria-label="Video scrubber"
          />
        </div>

        {/* Right: Audio and State Indicator */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          <span className="w-2 h-2 rounded-full bg-[#A7B39A] animate-pulse" title="Active Frame Sync" />
        </div>
      </div>
    </div>
  );
}
