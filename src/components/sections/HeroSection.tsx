"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight, ShieldCheck, CheckCircle2, ShoppingBag } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ASSETS } from "@/lib/assets";
import { ScrollVideo } from "@/components/media/ScrollVideo";
import { PowderParticles } from "@/components/effects/PowderParticles";
import { useCart } from "@/context/CartContext";
import { VARIANTS } from "@/lib/data";

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const { addItem } = useCart();

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

  const handleQuickAdd = () => {
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
    <section ref={sectionRef} className="relative h-[250vh] bg-[#F5F3EE]">
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Full-Bleed Video Background with Scroll-Controlled Seeking */}
        <div className="absolute inset-0 z-0">
          <ScrollVideo
            src={ASSETS.videos.hero.src}
            poster={ASSETS.images.explodedTub.src}
            alt={ASSETS.videos.hero.title}
            className="h-full w-full"
            overlayOpacity={0.35}
            priority={true}
            progress={progress}
            aspectRatio="none"
          />
          {/* Subtle Ambient Micro-Particles */}
          <PowderParticles particleCount={30} />
        </div>

        {/* Foreground Editorial UI */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 w-full flex flex-col justify-between h-full pointer-events-none">
          {/* Top Bar Badges */}
          <div className="flex items-center justify-between pointer-events-auto">
            <div className="inline-flex items-center gap-2 bg-[#F5F3EE]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#DCD9D1] text-[#20211F] text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#6D795B] animate-pulse" />
              <span>Scroll-Controlled Product Story</span>
            </div>

            <div className="hidden sm:flex items-center gap-3 bg-[#20211F]/80 backdrop-blur-md px-3 py-1 rounded-full text-xs text-[#F5F3EE] font-mono">
              <span>Scrub Progress: {Math.round(progress * 100)}%</span>
            </div>
          </div>

          {/* Dynamic Editorial Narrative Driven by Scroll Progress */}
          <div className="max-w-3xl my-auto space-y-6 pointer-events-auto transition-all duration-300">
            {progress < 0.4 ? (
              /* Phase 01: Hero Intro */
              <div className="space-y-4 animate-in fade-in duration-300">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#E9E4DB] drop-shadow-xs">
                  Natural Protein • Batch No. 04
                </span>
                <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#FFFFFF] leading-[1.05] drop-shadow-md">
                  Precision in Every Scoop.
                </h1>
                <p className="text-base sm:text-lg text-[#F5F3EE] max-w-xl leading-relaxed drop-shadow-xs">
                  Explore protein products designed around clear ingredients, thoughtful formulation, and everyday routines. Zero artificial gums, fillers, or synthetic sweeteners.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="#collection"
                    className="px-8 py-4 bg-[#F5F3EE] hover:bg-[#FFFFFF] text-[#20211F] rounded-sm text-xs uppercase tracking-widest font-semibold flex items-center gap-2 transition-all shadow-natural cursor-pointer"
                  >
                    <span>Shop Protein</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <button
                    onClick={handleQuickAdd}
                    className="px-8 py-4 bg-[#20211F]/85 hover:bg-[#20211F] text-[#F5F3EE] backdrop-blur-md border border-[#F5F3EE]/30 rounded-sm text-xs uppercase tracking-widest font-semibold flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Quick Add Signature • $54</span>
                  </button>
                </div>
              </div>
            ) : progress < 0.75 ? (
              /* Phase 02: Exploded Anatomy */
              <div className="space-y-4 animate-in fade-in duration-300">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A7B39A] drop-shadow-xs">
                  Physical Product Disassembly
                </span>
                <h2 className="font-editorial text-4xl sm:text-6xl font-bold tracking-tight text-[#FFFFFF] leading-[1.05] drop-shadow-md">
                  Airtight Seal. Calibrated Scoop.
                </h2>
                <p className="text-base sm:text-lg text-[#F5F3EE] max-w-xl leading-relaxed drop-shadow-xs">
                  Engineered with an aluminum hermetic barrier and a dedicated 32g precision scoop seated right at the surface for hygienic, repeatable measuring.
                </p>
                <div className="inline-flex items-center gap-2 bg-[#FFFFFF]/90 backdrop-blur-md px-4 py-2 rounded-sm text-xs font-semibold text-[#20211F]">
                  <CheckCircle2 className="w-4 h-4 text-[#6D795B]" />
                  <span>32g Measured Dose Yields Exactly 26g Pure Protein</span>
                </div>
              </div>
            ) : (
              /* Phase 03: Native Micro-Milled Protein */
              <div className="space-y-4 animate-in fade-in duration-300">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C99A65] drop-shadow-xs">
                  Cold Microfiltration
                </span>
                <h2 className="font-editorial text-4xl sm:text-6xl font-bold tracking-tight text-[#FFFFFF] leading-[1.05] drop-shadow-md">
                  Native Peptides Intact.
                </h2>
                <p className="text-base sm:text-lg text-[#F5F3EE] max-w-xl leading-relaxed drop-shadow-xs">
                  Cross-flow filtered below 10°C to preserve bioactive peptide structures, guaranteeing effortless cold-water dissolution without xanthan gum or lecithin.
                </p>
                <div className="pt-2">
                  <a
                    href="#philosophy"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#F5F3EE] text-[#20211F] rounded-sm text-xs uppercase tracking-widest font-semibold hover:bg-[#FFFFFF] transition-colors"
                  >
                    <span>Read Our Philosophy</span>
                    <ArrowDown className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-[#F5F3EE]/25 text-[#F5F3EE] pointer-events-auto">
            <div className="space-y-0.5">
              <span className="text-2xl sm:text-3xl font-editorial font-bold">26g</span>
              <p className="text-xs uppercase tracking-wider text-[#E9E4DB]">Native Pure Protein</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-2xl sm:text-3xl font-editorial font-bold">5</span>
              <p className="text-xs uppercase tracking-wider text-[#E9E4DB]">Whole Food Ingredients</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-2xl sm:text-3xl font-editorial font-bold">0g</span>
              <p className="text-xs uppercase tracking-wider text-[#E9E4DB]">Added Gums or Sugar</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-2xl sm:text-3xl font-editorial font-bold">100%</span>
              <p className="text-xs uppercase tracking-wider text-[#E9E4DB]">Label Transparency</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
