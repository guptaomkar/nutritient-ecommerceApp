"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollVideo } from "@/components/media/ScrollVideo";
import { ASSETS } from "@/lib/assets";
import { VARIANTS } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import { Plus, Star, Check } from "lucide-react";

interface ProductCollectionSectionProps {
  onSelectProductForDetail?: (variantId: string) => void;
}

export function ProductCollectionSection({
  onSelectProductForDetail,
}: ProductCollectionSectionProps) {
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const { addItem } = useCart();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = videoSectionRef.current;
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

  return (
    <section id="collection" className="bg-[#E9E4DB] border-b border-[#DCD9D1]">
      {/* 1. Pinned Scroll-Controlled Collection Reveal (video-6.mp4) */}
      <div ref={videoSectionRef} className="relative h-[200vh]">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Header Bar */}
          <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6D795B]">
                Section 07 • Range Reveal Film
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#20211F]">
                The Natural Protein Collection
              </h2>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono bg-[#FFFFFF]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#DCD9D1]">
              <span>Collection Scrub: {Math.round(progress * 100)}%</span>
            </div>
          </div>

          {/* Video Presentation with Scroll Scrub */}
          <div className="max-w-5xl mx-auto w-full rounded-sm overflow-hidden border border-[#DCD9D1] shadow-2xl bg-[#F5F3EE] my-auto">
            <ScrollVideo
              src={ASSETS.videos.collection.src}
              poster={ASSETS.images.studioTub.src}
              alt={ASSETS.videos.collection.title}
              className="w-full"
              overlayOpacity={0.06}
              progress={progress}
            />
          </div>

          {/* Prompt */}
          <div className="max-w-7xl mx-auto w-full text-center text-xs text-[#6E706A]">
            <span>Scroll down to explore the active product catalog below ↓</span>
          </div>
        </div>
      </div>

      {/* 2. Full Ecommerce Product Catalog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 space-y-10">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-[#DCD9D1] pb-5">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#6D795B]">
              Verified Inventory
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#20211F] mt-1">
              Shop Formulations & Bundles
            </h3>
            <p className="text-xs text-[#6E706A] mt-1">
              Every product yields 26g native protein per serving with zero synthetic gums or artificial sweeteners.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#20211F]">
            <Star className="w-4 h-4 fill-[#C99A65] text-[#C99A65]" />
            <span>4.94 ★ Average Rating (382 Reviews)</span>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {VARIANTS.map((variant) => (
            <div
              key={variant.id}
              className="group bg-[#FFFFFF] rounded-sm border border-[#DCD9D1] overflow-hidden shadow-natural hover:shadow-natural-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image Container with Badges */}
                <div className="relative aspect-[4/3] bg-[#F5F3EE] overflow-hidden border-b border-[#DCD9D1]">
                  <Image
                    src={variant.image}
                    alt={variant.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
                  />

                  {/* Stock badge */}
                  <div className="absolute top-3 left-3 bg-[#FFFFFF]/90 backdrop-blur-md px-2.5 py-1 rounded-xs border border-[#DCD9D1] text-[10px] uppercase font-semibold text-[#6D795B] flex items-center gap-1">
                    <Check className="w-3 h-3 text-[#6D795B]" />
                    <span>In Stock</span>
                  </div>

                  {/* Weight / Servings */}
                  <div className="absolute bottom-3 right-3 bg-[#20211F]/80 backdrop-blur-md px-2.5 py-1 rounded-xs text-[10px] uppercase font-medium text-[#F5F3EE]">
                    {variant.weight}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="font-editorial text-lg font-semibold text-[#20211F]">
                        {variant.name}
                      </h4>
                      <p className="text-xs text-[#6E706A]">{variant.flavor}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-bold text-[#20211F]">
                        ${variant.price.toFixed(2)}
                      </span>
                      {variant.compareAtPrice && (
                        <span className="block text-xs text-[#6E706A] line-through">
                          ${variant.compareAtPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#DCD9D1]/60 flex items-center justify-between text-xs text-[#6E706A]">
                    <span>Serving: 32g scoop</span>
                    <span>26g Native Protein</span>
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div className="p-6 pt-0 flex gap-2">
                <button
                  onClick={() => {
                    addItem({
                      productId: "natural-protein-blend",
                      variantId: variant.id,
                      productName: "Natural Protein",
                      flavor: variant.flavor,
                      weight: variant.weight,
                      price: variant.price,
                      image: variant.image,
                    });
                  }}
                  className="flex-1 py-2.5 px-4 bg-[#20211F] hover:bg-[#343532] text-[#F5F3EE] rounded-sm text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Quick Add</span>
                </button>

                <a
                  href="#product-detail"
                  onClick={() => onSelectProductForDetail && onSelectProductForDetail(variant.id)}
                  className="py-2.5 px-4 bg-[#E9E4DB] hover:bg-[#DCD9D1] text-[#20211F] rounded-sm text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center cursor-pointer"
                >
                  Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
