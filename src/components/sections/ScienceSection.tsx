"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollVideo } from "@/components/media/ScrollVideo";
import { ASSETS } from "@/lib/assets";
import { Sparkles, Layers, ShieldCheck, Zap } from "lucide-react";

export function ScienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = sectionRef.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  const annotations = [
    {
      id: "micro-milled",
      title: "Micro-Milled Powder Texture",
      subtitle: "Instantaneous Dissolution",
      description:
        "Engineered through fine micronization to dissolve effortlessly in under 15 seconds without clump formation, wire balls, or electric blenders.",
      icon: Sparkles,
      metric: "< 45 Microns",
      threshold: 0.25,
    },
    {
      id: "cold-filtered",
      title: "Low-Temperature Native Filtration",
      subtitle: "Intact Bioactive Peptides",
      description:
        "Cold cross-flow microfiltration preserves native immunoglobulins, lactoferrin, and glycomacropeptides without heat-induced structural degradation.",
      icon: Layers,
      metric: "Below 10°C",
      threshold: 0.5,
    },
    {
      id: "precision-scoop",
      title: "Calibrated 32g Ergonomic Scoop",
      subtitle: "Accurate Dosing Every Time",
      description:
        "Each canister includes a dedicated, reinforced scoop calibrated to deliver precisely 26g of pure active protein per single level measure.",
      icon: ShieldCheck,
      metric: "32g Serving",
      threshold: 0.75,
    },
    {
      id: "zero-foaming",
      title: "Zero Anti-Foaming Chemicals",
      subtitle: "Clean Physical Settling",
      description:
        "Without synthetic dimethicone or silicones, our shake produces a gentle natural froth that settles within seconds into a silky, velvety liquid.",
      icon: Zap,
      metric: "0 Synthetic Gums",
      threshold: 1.0,
    },
  ];

  // Active annotation based on scroll progress
  const activeIndex = Math.min(3, Math.floor(progress * 4));

  return (
    <section ref={sectionRef} id="science" className="relative h-[250vh] bg-[#E9E4DB] border-b border-[#DCD9D1]">
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Header Bar */}
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6D795B]">
              Section 03 • Scroll-Controlled Science
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#20211F]">
              The Science of Physical Texture
            </h2>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono bg-[#FFFFFF]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#DCD9D1]">
            <span>Micro-Texture Progress: {Math.round(progress * 100)}%</span>
          </div>
        </div>

        {/* Video Canvas & Synchronized Annotation Callout */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
          {/* Macro Video with Scroll-Driven Seeking */}
          <div className="lg:col-span-7 relative">
            <div className="rounded-sm overflow-hidden border border-[#DCD9D1] shadow-2xl bg-[#F5F3EE]">
              <ScrollVideo
                src={ASSETS.videos.powderMacro.src}
                poster={ASSETS.images.studioTub.src}
                alt={ASSETS.videos.powderMacro.title}
                className="w-full"
                overlayOpacity={0.06}
                progress={progress}
              />
            </div>
            <p className="text-[11px] text-[#6E706A] mt-2 italic text-center">
              * Powder macro scrubbing synchronized directly to your scroll position.
            </p>
          </div>

          {/* Interactive Annotation Cards Driven by Scroll Milestone */}
          <div className="lg:col-span-5 space-y-3">
            {annotations.map((item, index) => {
              const IconComponent = item.icon;
              const isActive = activeIndex === index;
              return (
                <div
                  key={item.id}
                  className={`p-4 sm:p-5 rounded-sm border transition-all duration-300 ${
                    isActive
                      ? "bg-[#FFFFFF] border-[#6D795B] shadow-natural-lg scale-[1.02] ring-1 ring-[#6D795B]"
                      : "bg-[#F5F3EE]/60 border-[#DCD9D1] opacity-60 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                          isActive ? "bg-[#6D795B] text-[#FFFFFF]" : "bg-[#E9E4DB] text-[#20211F]"
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-[#20211F]">{item.title}</h3>
                        <p className="text-[11px] text-[#6D795B] font-medium">{item.subtitle}</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-xs bg-[#E9E4DB] text-[#20211F] shrink-0">
                      {item.metric}
                    </span>
                  </div>

                  {isActive && (
                    <p className="text-xs text-[#6E706A] leading-relaxed mt-3 pt-3 border-t border-[#DCD9D1]/60 animate-in fade-in duration-200">
                      {item.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Note */}
        <div className="max-w-7xl mx-auto w-full text-center text-xs text-[#6E706A]">
          <span>Scroll down to continue to the Ingredient Constellation ↓</span>
        </div>
      </div>
    </section>
  );
}
