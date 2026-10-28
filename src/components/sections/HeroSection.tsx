"use client";

import React, { useState } from "react";
import { ArrowDown, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, ShoppingBag } from "lucide-react";
import { ASSETS } from "@/lib/assets";
import { ScrollVideo } from "@/components/media/ScrollVideo";
import { PowderParticles } from "@/components/effects/PowderParticles";
import { useCart } from "@/context/CartContext";
import { VARIANTS } from "@/lib/data";

export function HeroSection() {
  const { addItem } = useCart();
  const [scrollProgress, setScrollProgress] = useState(0);

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
    <section className="relative bg-[#F5F3EE] border-b border-[#DCD9D1] overflow-hidden">
      {/* Editorial Hero Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 lg:pt-14 lg:pb-28 space-y-12">
        {/* Top Floating Badge Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2.5 bg-[#FFFFFF] px-4 py-2 rounded-full border border-[#DCD9D1] shadow-xs text-[#20211F]">
            <span className="w-2 h-2 rounded-full bg-[#6D795B] animate-pulse" />
            <span className="text-xs uppercase tracking-widest font-semibold">
              Cold-Filtered Native Formulation • 2026 Batch No. 04
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs text-[#6E706A]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#6D795B]" />
              Informed Choice Tested
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#6D795B]" />
              Zero Synthetic Gums
            </span>
          </div>
        </div>

        {/* Hero Title & Value Proposition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#6D795B]">
              Scientific Supplement Design
            </span>
            <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#20211F] leading-[1.05]">
              Built Around Better Nutrition.
            </h1>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <p className="text-sm sm:text-base text-[#6E706A] leading-relaxed">
              Explore protein products designed around clear ingredients, thoughtful formulation, and everyday routines. Zero artificial gums, fillers, or synthetic sweeteners.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={handleQuickAddSignature}
                className="px-6 py-3.5 bg-[#20211F] hover:bg-[#343532] text-[#F5F3EE] rounded-sm text-xs uppercase tracking-widest font-semibold flex items-center gap-2 transition-all shadow-natural cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Quick Add • $54</span>
              </button>
              <a
                href="#collection"
                className="px-6 py-3.5 bg-[#FFFFFF] hover:bg-[#E9E4DB] text-[#20211F] border border-[#DCD9D1] rounded-sm text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Shop All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Cinematic Video Showcase */}
        <div className="relative rounded-sm overflow-hidden border border-[#DCD9D1] shadow-2xl bg-[#E9E4DB]">
          <ScrollVideo
            src={ASSETS.videos.hero.src}
            poster={ASSETS.images.explodedTub.src}
            alt={ASSETS.videos.hero.title}
            className="w-full"
            overlayOpacity={0.08}
            priority={true}
          />

          {/* Micro Particles Layer */}
          <PowderParticles particleCount={30} />

          {/* Studio Badge */}
          <div className="absolute top-4 left-4 z-20 pointer-events-none">
            <div className="bg-[#FFFFFF]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#DCD9D1] text-[11px] font-medium text-[#20211F] shadow-xs">
              Natural Protein Canister & Scoop Anatomy
            </div>
          </div>
        </div>

        {/* Key Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-[#DCD9D1]">
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-editorial font-bold text-[#20211F]">26g</span>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6D795B]">Native Protein Yield</p>
            <p className="text-[11px] text-[#6E706A]">Cold cross-flow micro-isolate</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-editorial font-bold text-[#20211F]">5</span>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6D795B]">Whole Ingredients</p>
            <p className="text-[11px] text-[#6E706A]">Zero gums or chemical fillers</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-editorial font-bold text-[#20211F]">0g</span>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6D795B]">Added Cane Sugars</p>
            <p className="text-[11px] text-[#6E706A]">Naturally flavored with cacao & vanilla</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-editorial font-bold text-[#20211F]">100%</span>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6D795B]">Label Transparency</p>
            <p className="text-[11px] text-[#6E706A]">Third-party cGMP batch certified</p>
          </div>
        </div>
      </div>
    </section>
  );
}
