"use client";

import React from "react";
import Image from "next/image";
import { ArrowDown, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { ASSETS } from "@/lib/assets";
import { ScrollVideo } from "@/components/media/ScrollVideo";
import { PowderParticles } from "@/components/effects/PowderParticles";
import { useCart } from "@/context/CartContext";
import { VARIANTS } from "@/lib/data";

export function HeroSection() {
  const { addItem } = useCart();

  const handleQuickAddSignature = () => {
    const signature = VARIANTS[0];
    addItem({
      productId: "natural-protein-blend",
      variantId: signature.id,
      productName: "Natural Protein",
      flavor: signature.flavor,
      weight: signature.weight,
      price: signature.price,
      image: signature.image,
    });
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center bg-[#F5F3EE] overflow-hidden border-b border-[#DCD9D1]">
      {/* Background Media with Poster Fallback */}
      <div className="absolute inset-0 z-0">
        <ScrollVideo
          src={ASSETS.videos.hero.src}
          poster={ASSETS.images.explodedTub.src}
          alt={ASSETS.videos.hero.title}
          className="h-full w-full object-cover"
          overlayOpacity={0.35}
          priority={true}
        />
        {/* Ambient Subtle Powder Particles */}
        <PowderParticles particleCount={35} />
      </div>

      {/* Editorial Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full flex flex-col justify-between min-h-[82vh]">
        {/* Top Tagline */}
        <div className="flex items-center gap-2 self-start bg-[#F5F3EE]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#DCD9D1]/80 text-[#20211F]">
          <span className="w-2 h-2 rounded-full bg-[#6D795B] animate-pulse" />
          <span className="text-[11px] uppercase tracking-widest font-semibold">
            Fresh Harvest Small Batch • Pure Formulation
          </span>
        </div>

        {/* Center Hero Typography */}
        <div className="max-w-3xl my-auto space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#E9E4DB] drop-shadow-xs">
              Natural Nutrition Reimagined
            </span>
            <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#FFFFFF] leading-[1.08] drop-shadow-md">
              Precision in Every Scoop.
            </h1>
          </div>

          <p className="text-base sm:text-lg text-[#F5F3EE] font-normal leading-relaxed max-w-xl drop-shadow-xs">
            Explore protein products designed around clear ingredients, thoughtful formulation, and everyday routines. Zero artificial gums, fillers, or synthetic sweeteners.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
            <a
              href="#collection"
              className="px-8 py-4 bg-[#F5F3EE] hover:bg-[#FFFFFF] text-[#20211F] rounded-sm text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all shadow-natural group cursor-pointer"
            >
              <span>Shop Protein</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <button
              onClick={handleQuickAddSignature}
              className="px-8 py-4 bg-[#20211F]/80 hover:bg-[#20211F] text-[#F5F3EE] backdrop-blur-md border border-[#F5F3EE]/40 rounded-sm text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Quick Add Signature Blend • $54</span>
            </button>

            <a
              href="#philosophy"
              className="px-6 py-4 text-[#F5F3EE] hover:text-[#FFFFFF] text-xs uppercase tracking-widest font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Explore Formula</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-[#F5F3EE]/20 text-[#F5F3EE]">
          <div className="space-y-0.5">
            <div className="text-2xl sm:text-3xl font-editorial font-bold">26g</div>
            <div className="text-[11px] uppercase tracking-wider text-[#E9E4DB]">Native Pure Protein</div>
          </div>
          <div className="space-y-0.5">
            <div className="text-2xl sm:text-3xl font-editorial font-bold">5</div>
            <div className="text-[11px] uppercase tracking-wider text-[#E9E4DB]">Whole Ingredients</div>
          </div>
          <div className="space-y-0.5">
            <div className="text-2xl sm:text-3xl font-editorial font-bold">0g</div>
            <div className="text-[11px] uppercase tracking-wider text-[#E9E4DB]">Added Sugars & Gums</div>
          </div>
          <div className="space-y-0.5">
            <div className="text-2xl sm:text-3xl font-editorial font-bold">100%</div>
            <div className="text-[11px] uppercase tracking-wider text-[#E9E4DB]">Label Transparency</div>
          </div>
        </div>
      </div>
    </section>
  );
}
