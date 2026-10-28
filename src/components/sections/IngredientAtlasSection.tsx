"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, ShieldAlert } from "lucide-react";
import { ASSETS } from "@/lib/assets";
import { PRIMARY_PRODUCT } from "@/lib/data";
import { ScrollVideo } from "@/components/media/ScrollVideo";

export function IngredientAtlasSection() {
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

  // Map progress (0 to 1) to one of the 5 whole food ingredients
  const activeIngredientIndex = Math.min(
    PRIMARY_PRODUCT.ingredients.length - 1,
    Math.floor(progress * PRIMARY_PRODUCT.ingredients.length)
  );
  const activeIngredient = PRIMARY_PRODUCT.ingredients[activeIngredientIndex];

  return (
    <section ref={sectionRef} id="ingredients" className="relative h-[250vh] bg-[#F5F3EE] border-b border-[#DCD9D1]">
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Header Bar */}
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6D795B]">
              Section 04 • Ingredient Constellation
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#20211F]">
              Five Ingredients. Total Transparency.
            </h2>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono bg-[#FFFFFF]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#DCD9D1]">
            <span>Constellation Progress: {Math.round(progress * 100)}%</span>
          </div>
        </div>

        {/* Video Canvas & Dynamic Ingredient Reveal */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
          {/* Constellation Video Scrubbing */}
          <div className="lg:col-span-7 relative">
            <div className="rounded-sm overflow-hidden border border-[#DCD9D1] shadow-2xl bg-[#E9E4DB]">
              <ScrollVideo
                src={ASSETS.videos.ingredients.src}
                poster={ASSETS.images.ingredientStill.src}
                alt={ASSETS.videos.ingredients.title}
                className="w-full"
                overlayOpacity={0.06}
                progress={progress}
              />
            </div>
            <p className="text-[11px] text-[#6E706A] mt-2 italic text-center">
              * Scroll down to disperse and inspect the five authentic whole-food components.
            </p>
          </div>

          {/* Dynamic Active Ingredient Card Synchronized with Scroll */}
          <div className="lg:col-span-5 space-y-4">
            {/* Quick Pill Selector to view which ingredient is currently highlighted */}
            <div className="flex flex-wrap gap-1.5">
              {PRIMARY_PRODUCT.ingredients.map((ing, i) => (
                <span
                  key={ing.id}
                  className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-xs transition-colors ${
                    activeIngredientIndex === i
                      ? "bg-[#6D795B] text-[#FFFFFF]"
                      : "bg-[#E9E4DB] text-[#6E706A]"
                  }`}
                >
                  0{i + 1}. {ing.name.split(" ")[0]}
                </span>
              ))}
            </div>

            {/* Main Card */}
            <div className="p-6 sm:p-7 bg-[#FFFFFF] rounded-sm border border-[#DCD9D1] shadow-natural-lg space-y-4 transition-all duration-300">
              <div className="border-b border-[#DCD9D1] pb-4">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C99A65]">
                  {activeIngredient.role}
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#20211F] mt-1">
                  {activeIngredient.name}
                </h3>
                <p className="text-xs text-[#6E706A] mt-0.5">
                  Origin: <strong className="text-[#20211F] font-medium">{activeIngredient.source}</strong>
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#20211F] leading-relaxed">
                {activeIngredient.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-[#DCD9D1]/60">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#6E706A]">
                  Key Nutritional Properties:
                </p>
                <div className="space-y-1.5">
                  {activeIngredient.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#20211F]">
                      <Check className="w-3.5 h-3.5 text-[#6D795B] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Allergen & Testing Disclosure Banner */}
            <div className="p-3.5 bg-[#FFFFFF] border border-[#DCD9D1] rounded-sm flex items-start gap-2.5 text-xs text-[#6E706A]">
              <ShieldAlert className="w-4 h-4 text-[#C99A65] shrink-0 mt-0.5" />
              <span>
                {PRIMARY_PRODUCT.allergens[0]} Zero synthetic sweeteners, fillers, or artificial gums.
              </span>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="max-w-7xl mx-auto w-full text-center text-xs text-[#6E706A]">
          <span>Continue scrolling to view the Daily Preparation Sequence ↓</span>
        </div>
      </div>
    </section>
  );
}
