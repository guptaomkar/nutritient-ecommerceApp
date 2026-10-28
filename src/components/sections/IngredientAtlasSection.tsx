"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check, Info, ShieldAlert } from "lucide-react";
import { ASSETS } from "@/lib/assets";
import { PRIMARY_PRODUCT } from "@/lib/data";
import { ScrollVideo } from "@/components/media/ScrollVideo";

export function IngredientAtlasSection() {
  const [selectedIngredient, setSelectedIngredient] = useState(PRIMARY_PRODUCT.ingredients[0]);

  return (
    <section id="ingredients" className="py-24 lg:py-32 bg-[#F5F3EE] border-b border-[#DCD9D1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6D795B]">
            Section 04 • The Ingredient Atlas
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#20211F]">
            Every Component Accounted For.
          </h2>
          <p className="text-sm text-[#6E706A] leading-relaxed">
            No proprietary formulas or obscure laboratory trade secrets. Click any ingredient below to inspect its source, exact functional role, and verified nutritional purpose.
          </p>
        </div>

        {/* Studio Ingredient Still & Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Visual Showcase (image-3.jpg with video-3 complement) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-sm overflow-hidden border border-[#DCD9D1] shadow-natural-lg bg-[#E9E4DB]">
              <ScrollVideo
                src={ASSETS.videos.ingredients.src}
                poster={ASSETS.images.ingredientStill.src}
                alt={ASSETS.videos.ingredients.title}
                className="w-full"
                overlayOpacity={0.06}
              />
            </div>

            {/* Allergen & Testing Disclosure Banner */}
            <div className="p-4 bg-[#FFFFFF] border border-[#DCD9D1] rounded-sm flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-[#C99A65] shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <p className="font-semibold text-[#20211F]">Allergen & Quality Statement</p>
                <p className="text-[#6E706A] leading-relaxed">
                  {PRIMARY_PRODUCT.allergens[0]} Rigorously tested for heavy metals, pesticides, and banned substances under strict cGMP protocols.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Ingredient Explorer Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {PRIMARY_PRODUCT.ingredients.map((ing) => {
                const isActive = selectedIngredient.id === ing.id;
                return (
                  <button
                    key={ing.id}
                    onClick={() => setSelectedIngredient(ing)}
                    className={`p-3 text-left rounded-sm border transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#FFFFFF] border-[#6D795B] shadow-natural ring-1 ring-[#6D795B]"
                        : "bg-[#E9E4DB]/60 border-[#DCD9D1] hover:bg-[#FFFFFF]"
                    }`}
                  >
                    <span className="text-[10px] uppercase font-semibold text-[#6D795B] block truncate">
                      {ing.tag}
                    </span>
                    <h3 className="text-xs font-semibold text-[#20211F] truncate mt-0.5">
                      {ing.name}
                    </h3>
                  </button>
                );
              })}
            </div>

            {/* Active Ingredient Deep-Dive Card */}
            <div className="p-6 bg-[#FFFFFF] rounded-sm border border-[#DCD9D1] shadow-natural space-y-4 animate-in fade-in-50 duration-200">
              <div className="flex items-start justify-between gap-4 border-b border-[#DCD9D1] pb-4">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C99A65]">
                    {selectedIngredient.role}
                  </span>
                  <h3 className="font-editorial text-2xl font-semibold text-[#20211F] mt-1">
                    {selectedIngredient.name}
                  </h3>
                  <p className="text-xs text-[#6E706A] mt-0.5">
                    Origin: <strong className="text-[#20211F] font-medium">{selectedIngredient.source}</strong>
                  </p>
                </div>
              </div>

              <p className="text-xs text-[#20211F] leading-relaxed">
                {selectedIngredient.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-[#DCD9D1]/60">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#6E706A]">
                  Key Nutritional Properties:
                </p>
                <div className="space-y-1.5">
                  {selectedIngredient.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#20211F]">
                      <Check className="w-3.5 h-3.5 text-[#6D795B] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
