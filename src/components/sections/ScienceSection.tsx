"use client";

import React, { useState } from "react";
import { ScrollVideo } from "@/components/media/ScrollVideo";
import { ASSETS } from "@/lib/assets";
import { Sparkles, Layers, ShieldCheck, Zap } from "lucide-react";

export function ScienceSection() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const annotations = [
    {
      id: "micro-milled",
      title: "Micro-Milled Powder Texture",
      subtitle: "Instantaneous Dissolution",
      description:
        "Engineered through fine micronization to dissolve effortlessly in under 15 seconds without clump formation, wire balls, or electric blenders.",
      icon: Sparkles,
      metric: "< 45 Microns",
    },
    {
      id: "cold-filtered",
      title: "Low-Temperature Native Filtration",
      subtitle: "Intact Bioactive Peptides",
      description:
        "Cold cross-flow microfiltration preserves native immunoglobulins, lactoferrin, and glycomacropeptides without heat-induced structural degradation.",
      icon: Layers,
      metric: "Below 10°C",
    },
    {
      id: "precision-scoop",
      title: "Calibrated 32g Ergonomic Scoop",
      subtitle: "Accurate Dosing Every Time",
      description:
        "Each canister includes a dedicated, reinforced scoop calibrated to deliver precisely 26g of pure active protein per single level measure.",
      icon: ShieldCheck,
      metric: "32g Serving",
    },
    {
      id: "zero-foaming",
      title: "Zero Anti-Foaming Chemicals",
      subtitle: "Clean Physical Settling",
      description:
        "Without synthetic dimethicone or silicones, our shake produces a gentle natural froth that settles within seconds into a silky, velvety liquid.",
      icon: Zap,
      metric: "0 Synthetic Gums",
    },
  ];

  return (
    <section id="science" className="py-24 lg:py-32 bg-[#E9E4DB] border-b border-[#DCD9D1] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6D795B]">
            Formulation Engineering
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl font-medium tracking-tight text-[#20211F]">
            The Science of Physical Texture
          </h2>
          <p className="text-sm text-[#6E706A] leading-relaxed">
            High performance without compromise. Experience how micro-milled native proteins and whole stone-ground ingredients behave in physical suspension.
          </p>
        </div>

        {/* Video & Interactive Annotations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Video Presentation */}
          <div className="lg:col-span-7 relative">
            <div className="rounded-sm overflow-hidden border border-[#DCD9D1] shadow-natural-lg bg-[#F5F3EE]">
              <ScrollVideo
                src={ASSETS.videos.powderMacro.src}
                poster={ASSETS.images.studioTub.src}
                alt={ASSETS.videos.powderMacro.title}
                className="w-full"
                overlayOpacity={0.08}
                initialMode="scrub"
                onProgressChange={(p) => {
                  const stepIndex = Math.min(3, Math.floor(p * 4));
                  setActiveTab(stepIndex);
                }}
              />
            </div>
            <p className="text-[11px] text-[#6E706A] mt-3 italic text-center">
              * High-speed macro footage of Natural Protein powder rising from scoop. Zero clumping agents.
            </p>
          </div>

          {/* Annotations & Feature Highlights */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-3">
              {annotations.map((item, index) => {
                const IconComponent = item.icon;
                const isSelected = activeTab === index;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveTab(index)}
                    className={`p-5 rounded-sm border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#FFFFFF] border-[#6D795B] shadow-natural"
                        : "bg-[#F5F3EE]/80 border-[#DCD9D1] hover:bg-[#FFFFFF]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                            isSelected ? "bg-[#6D795B] text-[#FFFFFF]" : "bg-[#E9E4DB] text-[#20211F]"
                          }`}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-[#20211F]">
                            {item.title}
                          </h3>
                          <p className="text-[11px] text-[#6D795B] font-medium">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-xs bg-[#E9E4DB] text-[#20211F] shrink-0">
                        {item.metric}
                      </span>
                    </div>

                    {isSelected && (
                      <p className="text-xs text-[#6E706A] leading-relaxed mt-3 pt-3 border-t border-[#DCD9D1]/60 animate-in fade-in-50 duration-200">
                        {item.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
