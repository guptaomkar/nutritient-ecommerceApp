"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ASSETS } from "@/lib/assets";
import { PHILOSOPHY_PILLARS } from "@/lib/data";

export function PhilosophySection() {
  return (
    <section id="philosophy" className="py-24 lg:py-32 bg-[#F5F3EE] border-b border-[#DCD9D1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 lg:mb-24 items-end">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6D795B]">
              Our Foundation
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#20211F] leading-[1.12]">
              Less Noise. More Clarity.
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-sm text-[#6E706A] leading-relaxed">
              Most protein supplements are engineered with artificial emulsifiers, synthetic flavor masks, and ambiguous proprietary blends. We chose radical restraint: five purposeful whole-food ingredients, verified nutrition, and zero filler.
            </p>
          </div>
        </div>

        {/* Asymmetrical Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Dominant Studio Image */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-[#E9E4DB] border border-[#DCD9D1] shadow-natural-lg group">
              <Image
                src={ASSETS.images.studioTub.src}
                alt={ASSETS.images.studioTub.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 700px"
                className="object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-[#FFFFFF]/90 backdrop-blur-md p-4 rounded-xs border border-[#DCD9D1] flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#20211F]">Matte Monolithic Canister</p>
                  <p className="text-[11px] text-[#6E706A]">Precision 32g scoop with airtight aluminum freshness barrier</p>
                </div>
                <span className="text-xs font-medium text-[#6D795B]">Verified Spec</span>
              </div>
            </div>
          </div>

          {/* Right: The 4 Pillars */}
          <div className="lg:col-span-5 space-y-8">
            <div className="divide-y divide-[#DCD9D1]">
              {PHILOSOPHY_PILLARS.map((pillar) => (
                <div key={pillar.number} className="py-6 first:pt-0 last:pb-0 space-y-2 group">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-semibold text-[#C99A65]">
                      [{pillar.number}]
                    </span>
                    <h3 className="text-base font-semibold text-[#20211F] group-hover:text-[#6D795B] transition-colors">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#6E706A] leading-relaxed pl-7">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a
                href="#ingredients"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#20211F] hover:text-[#6D795B] transition-colors group"
              >
                <span>Inspect The Complete Ingredient Atlas</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
