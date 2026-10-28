"use client";

import React, { useState } from "react";
import { PRIMARY_PRODUCT } from "@/lib/data";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

export function NutritionSection() {
  const [viewMode, setViewMode] = useState<"serving" | "100g">("serving");
  const facts = PRIMARY_PRODUCT.nutritionFacts;

  return (
    <section id="nutrition" className="py-24 lg:py-32 bg-[#E9E4DB] border-b border-[#DCD9D1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Context & Declarations */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6D795B]">
              Section 09 • Verified Nutritional Declaration
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl font-medium tracking-tight text-[#20211F]">
              Clear Nutritional Facts. Zero Concealed Values.
            </h2>
            <p className="text-sm text-[#6E706A] leading-relaxed">
              Every nutritional claim is laboratory-verified. We publish full per-serving and per-100g values so you have total visibility into your daily macronutrient intake.
            </p>

            {/* Core Verification Badges */}
            <div className="space-y-3 pt-2">
              <div className="p-4 bg-[#FFFFFF] rounded-sm border border-[#DCD9D1] flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#6D795B] shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-semibold text-[#20211F]">26g Native Protein Yield</p>
                  <p className="text-[#6E706A]">
                    Delivers 81.2% protein by weight in its pure unflavored state and over 80% in whole cocoa blends.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-[#FFFFFF] rounded-sm border border-[#DCD9D1] flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#6D795B] shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-semibold text-[#20211F]">Zero Added Industrial Sugars</p>
                  <p className="text-[#6E706A]">
                    Contains less than 0.5g naturally occurring sugars from stone-ground oats and almonds. Zero sucralose, acesulfame-K, or aspartame.
                  </p>
                </div>
              </div>
            </div>

            {/* Packaging and Allergen note */}
            <div className="text-xs text-[#6E706A] space-y-1 pt-2">
              <p>
                <strong>Allergen Declaration:</strong> {PRIMARY_PRODUCT.allergens[0]}
              </p>
              <p>
                <strong>Manufacturing:</strong> Formulated in accordance with cGMP FDA CFR Title 21 requirements.
              </p>
            </div>
          </div>

          {/* Right: Formal FDA-Style Nutrition Panel */}
          <div className="lg:col-span-6 bg-[#FFFFFF] p-8 rounded-sm border-2 border-[#20211F] shadow-natural-lg max-w-md mx-auto w-full">
            {/* Table Header */}
            <div className="border-b-8 border-[#20211F] pb-2">
              <h3 className="font-editorial text-3xl font-black text-[#20211F] tracking-tight">
                Nutrition Facts
              </h3>
              <p className="text-xs text-[#20211F] mt-1 font-sans">
                {facts.servingsPerContainer} servings per container
              </p>
              <div className="flex justify-between items-baseline font-bold text-sm text-[#20211F] mt-1">
                <span>Serving Size</span>
                <span>{facts.servingSize}</span>
              </div>
            </div>

            {/* Toggle: Per Serving vs Per 100g */}
            <div className="py-2 border-b border-[#20211F] flex justify-between items-center text-xs">
              <span className="font-semibold text-[#20211F]">Display Basis:</span>
              <div className="flex rounded-xs bg-[#E9E4DB] p-0.5">
                <button
                  onClick={() => setViewMode("serving")}
                  className={`px-2.5 py-1 rounded-xs text-[11px] font-semibold transition-all cursor-pointer ${
                    viewMode === "serving" ? "bg-[#20211F] text-[#F5F3EE]" : "text-[#20211F]"
                  }`}
                >
                  Per Serving (32g)
                </button>
                <button
                  onClick={() => setViewMode("100g")}
                  className={`px-2.5 py-1 rounded-xs text-[11px] font-semibold transition-all cursor-pointer ${
                    viewMode === "100g" ? "bg-[#20211F] text-[#F5F3EE]" : "text-[#20211F]"
                  }`}
                >
                  Per 100g
                </button>
              </div>
            </div>

            {/* Calories Banner */}
            <div className="border-b-4 border-[#20211F] py-2 flex justify-between items-baseline">
              <div>
                <span className="text-xs font-bold uppercase text-[#20211F]">Amount per serving</span>
                <div className="font-editorial text-3xl font-black text-[#20211F]">Calories</div>
              </div>
              <span className="font-editorial text-4xl font-black text-[#20211F]">
                {viewMode === "serving" ? "130" : "406"}
              </span>
            </div>

            {/* % Daily Value Note */}
            <div className="text-right text-[10px] font-bold py-1 border-b border-[#20211F] text-[#20211F]">
              % Daily Value*
            </div>

            {/* Nutrient Line Items */}
            <div className="divide-y divide-[#DCD9D1] text-xs text-[#20211F]">
              {facts.items.map((item, index) => {
                const amount = viewMode === "serving" ? item.amountPerServing : item.amountPer100g || item.amountPerServing;
                const isMajor = item.nutrient === "Total Fat" || item.nutrient === "Protein" || item.nutrient === "Total Carbohydrates" || item.nutrient === "Sodium";
                return (
                  <div key={index} className="py-1.5 flex justify-between items-center">
                    <span className={isMajor ? "font-bold" : "pl-3 text-[#6E706A]"}>
                      {item.nutrient} <span className="font-normal text-[#20211F]">{amount}</span>
                    </span>
                    {item.dailyValue && (
                      <span className="font-bold">{item.dailyValue}</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Footer Footnote */}
            <div className="border-t-4 border-[#20211F] pt-2 mt-2 text-[10px] text-[#6E706A] leading-tight">
              * The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
