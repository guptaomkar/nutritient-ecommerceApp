"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollVideo } from "@/components/media/ScrollVideo";
import { ASSETS } from "@/lib/assets";
import { PRIMARY_PRODUCT } from "@/lib/data";
import { Droplet, Clock, RotateCw, Sparkles, CheckCircle2 } from "lucide-react";

export function PreparationSection() {
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

  const stepIcons = [Droplet, Clock, RotateCw, Sparkles];
  const activeStepIndex = Math.min(3, Math.floor(progress * 4));

  return (
    <section ref={sectionRef} id="preparation" className="relative h-[250vh] bg-[#E9E4DB] border-b border-[#DCD9D1]">
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Header Bar */}
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6D795B]">
              Section 05 • Scroll-Controlled Ritual
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#20211F]">
              Effortless Daily Preparation
            </h2>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono bg-[#FFFFFF]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#DCD9D1]">
            <span>Ritual Step: 0{activeStepIndex + 1} / 04 ({Math.round(progress * 100)}%)</span>
          </div>
        </div>

        {/* Video Canvas & Synchronized Steps */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
          {/* Preparation Video Player with Scroll Scrub */}
          <div className="lg:col-span-7 relative">
            <div className="rounded-sm overflow-hidden border border-[#DCD9D1] shadow-2xl bg-[#F5F3EE]">
              <ScrollVideo
                src={ASSETS.videos.preparation.src}
                poster={ASSETS.images.lifestyleShake.src}
                alt={ASSETS.videos.preparation.title}
                className="w-full"
                overlayOpacity={0.06}
                progress={progress}
              />
            </div>
            <p className="text-[11px] text-[#6E706A] mt-2 italic text-center">
              * Scroll down to step through the 15-second dissolution sequence.
            </p>
          </div>

          {/* Steps Timeline Synchronized with Scroll */}
          <div className="lg:col-span-5 space-y-3">
            {PRIMARY_PRODUCT.preparationSteps.map((step, idx) => {
              const Icon = stepIcons[idx] || Sparkles;
              const isCurrent = activeStepIndex === idx;
              return (
                <div
                  key={step.step}
                  className={`p-4 sm:p-5 rounded-sm border transition-all duration-300 ${
                    isCurrent
                      ? "bg-[#FFFFFF] border-[#6D795B] shadow-natural-lg scale-[1.02] ring-1 ring-[#6D795B]"
                      : "bg-[#F5F3EE]/60 border-[#DCD9D1] opacity-60 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-6 h-6 rounded-full text-xs font-semibold flex items-center justify-center transition-colors ${
                          isCurrent ? "bg-[#6D795B] text-[#FFFFFF]" : "bg-[#20211F] text-[#F5F3EE]"
                        }`}
                      >
                        {step.step}
                      </span>
                      <h3 className="text-sm font-semibold text-[#20211F]">{step.title}</h3>
                    </div>
                    <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-xs bg-[#E9E4DB] text-[#20211F]">
                      {step.metric}
                    </span>
                  </div>

                  <p className="text-xs text-[#20211F] font-medium mt-2">{step.instruction}</p>
                  <p className="text-[11px] text-[#6E706A] mt-1">{step.detail}</p>
                </div>
              );
            })}

            <div className="p-3 bg-[#FFFFFF] rounded-sm border border-[#DCD9D1] flex items-center gap-2 text-xs text-[#6E706A]">
              <CheckCircle2 className="w-4 h-4 text-[#6D795B] shrink-0" />
              <span>Zero clumping wire ball needed. Dissolves cleanly in cold liquids.</span>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="max-w-7xl mx-auto w-full text-center text-xs text-[#6E706A]">
          <span>Continue scrolling to inspect the Liquid Texture & Flavors ↓</span>
        </div>
      </div>
    </section>
  );
}
