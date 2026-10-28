"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { ASSETS } from "@/lib/assets";

export function ConversionCtaSection() {
  return (
    <section className="relative py-28 lg:py-36 bg-[#20211F] text-[#F5F3EE] overflow-hidden">
      {/* Background Subtle Imagery with Dark Editorial Wash */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src={ASSETS.images.explodedTub.src}
          alt={ASSETS.images.explodedTub.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="inline-flex items-center gap-2 bg-[#343532] px-3.5 py-1.5 rounded-full text-xs text-[#A7B39A]">
          <Sparkles className="w-3.5 h-3.5 text-[#C99A65]" />
          <span className="uppercase tracking-widest font-semibold text-[10px]">
            Uncompromising Daily Performance
          </span>
        </div>

        <div className="space-y-4">
          <h2 className="font-editorial text-4xl sm:text-6xl font-medium tracking-tight text-[#FFFFFF] leading-[1.12]">
            Find Your Everyday Protein.
          </h2>
          <p className="text-base sm:text-lg text-[#E9E4DB]/80 max-w-xl mx-auto leading-relaxed">
            Explore the range and choose the formulation that fits your training, routine, and taste preferences. Zero artificial gums, fillers, or synthetic sweeteners.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href="#collection"
            className="w-full sm:w-auto px-8 py-4 bg-[#F5F3EE] hover:bg-[#FFFFFF] text-[#20211F] rounded-sm text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all shadow-natural cursor-pointer"
          >
            <span>Shop All Products</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#ingredients"
            className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-[#343532] text-[#F5F3EE] border border-[#E9E4DB]/30 rounded-sm text-xs uppercase tracking-widest font-semibold flex items-center justify-center transition-colors cursor-pointer"
          >
            <span>Explore The Ingredients</span>
          </a>
        </div>
      </div>
    </section>
  );
}
