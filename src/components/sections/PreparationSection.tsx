"use client";

import React, { useState } from "react";
import { ScrollVideo } from "@/components/media/ScrollVideo";
import { ASSETS } from "@/lib/assets";
import { PRIMARY_PRODUCT } from "@/lib/data";
import { Clock, Droplet, RotateCw, Sparkles } from "lucide-react";

export function PreparationSection() {
  const [activeStep, setActiveStep] = useState(0);

  const stepIcons = [Droplet, Clock, RotateCw, Sparkles];

  return (
    <section id="preparation" className="py-24 lg:py-32 bg-[#E9E4DB] border-b border-[#DCD9D1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6D795B]">
            Section 05 • The Daily Ritual
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#20211F]">
            Effortless Daily Preparation.
          </h2>
          <p className="text-sm text-[#6E706A] leading-relaxed">
            Formulated to integrate seamlessly into your morning routine or post-workout window. Zero clumps, zero chalky grit, and no electric blender needed.
          </p>
        </div>

        {/* Video & Step Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Preparation Video Player */}
          <div className="lg:col-span-7">
            <div className="rounded-sm overflow-hidden border border-[#DCD9D1] shadow-natural-lg bg-[#F5F3EE]">
              <ScrollVideo
                src={ASSETS.videos.preparation.src}
                poster={ASSETS.images.lifestyleShake.src}
                alt={ASSETS.videos.preparation.title}
                className="w-full"
                overlayOpacity={0.08}
                initialMode="scrub"
                onProgressChange={(p) => {
                  const stepIndex = Math.min(3, Math.floor(p * 4));
                  setActiveStep(stepIndex);
                }}
              />
            </div>
            <p className="text-[11px] text-[#6E706A] mt-3 italic text-center">
              * Actual preparation demonstration. Dissolves cleanly in chilled liquids in 15 seconds.
            </p>
          </div>

          {/* Steps Timeline (Vertical on Mobile, Interactive on Desktop) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-3">
              {PRIMARY_PRODUCT.preparationSteps.map((step, idx) => {
                const Icon = stepIcons[idx] || Sparkles;
                const isCurrent = activeStep === idx;
                return (
                  <div
                    key={step.step}
                    onClick={() => setActiveStep(idx)}
                    className={`p-5 rounded-sm border transition-all cursor-pointer ${
                      isCurrent
                        ? "bg-[#FFFFFF] border-[#6D795B] shadow-natural ring-1 ring-[#6D795B]"
                        : "bg-[#F5F3EE]/80 border-[#DCD9D1] hover:bg-[#FFFFFF]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#20211F] text-[#F5F3EE] text-xs font-semibold flex items-center justify-center">
                          {step.step}
                        </span>
                        <h3 className="text-sm font-semibold text-[#20211F]">
                          {step.title}
                        </h3>
                      </div>
                      <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-xs bg-[#E9E4DB] text-[#20211F]">
                        {step.metric}
                      </span>
                    </div>

                    <p className="text-xs text-[#20211F] font-medium mt-2">
                      {step.instruction}
                    </p>
                    <p className="text-[11px] text-[#6E706A] mt-1">
                      {step.detail}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="p-4 bg-[#FFFFFF] rounded-sm border border-[#DCD9D1] text-xs text-[#6E706A]">
              <p>
                <strong>Pro Tip:</strong> For the most luxurious mouthfeel, combine with cold unsweetened oat milk or almond milk. Always refer to the canister label for specific batch instructions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
