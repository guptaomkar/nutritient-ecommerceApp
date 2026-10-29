"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollVideo } from "@/components/media/ScrollVideo";
import { ASSETS } from "@/lib/assets";
import { VARIANTS } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import { Check, ShoppingBag, Sparkles } from "lucide-react";

export function TextureFlavorsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [selectedVariant, setSelectedVariant] = useState(VARIANTS[0]);
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
      scrub: 0.1,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        if (rafRef.current === null) {
          rafRef.current = requestAnimationFrame(() => {
            setProgress(progressRef.current);
            rafRef.current = null;
          });
        }
      },
    });

    return () => {
      st.kill();
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  const handleAddToCart = () => {
    addItem({
      productId: "natural-protein-blend",
      variantId: selectedVariant.id,
      productName: "Natural Protein",
      flavor: selectedVariant.flavor,
      weight: selectedVariant.weight,
      price: selectedVariant.price,
      image: selectedVariant.image,
    });
  };

  const percent = Math.min(100, Math.round((progress / 0.85) * 100));

  return (
    <section ref={sectionRef} id="flavors" className="relative h-[280vh] bg-[#F5F3EE] border-b border-[#DCD9D1]">
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Header Bar */}
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6D795B]">
              Section 06 • Swirling Liquid Texture
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#20211F]">
              Naturally Silky. Unadulterated Taste.
            </h2>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono bg-[#FFFFFF]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#DCD9D1]">
            <span>Swirl Dynamics: {percent}%</span>
          </div>
        </div>

        {/* Video Canvas & Interactive Flavor Swatches */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
          {/* Swirling Shake Video with Scroll Scrub */}
          <div className="lg:col-span-7 relative">
            <div className="rounded-sm overflow-hidden border border-[#DCD9D1] shadow-2xl bg-[#E9E4DB]">
              <ScrollVideo
                src={ASSETS.videos.texture.src}
                poster={ASSETS.images.lifestyleShake.src}
                alt={ASSETS.videos.texture.title}
                className="w-full"
                overlayOpacity={0.06}
                progress={progress}
                completionThreshold={0.85}
              />
            </div>
            <p className="text-[11px] text-[#6E706A] mt-2 italic text-center">
              * Natural swirl in frosted glassware. Achieved without xanthan, guar, or carrageenan.
            </p>
          </div>

          {/* Flavor Selection Panel */}
          <div className="lg:col-span-5 bg-[#FFFFFF] p-6 sm:p-8 rounded-sm border border-[#DCD9D1] shadow-natural-lg space-y-5">
            <div className="flex items-center justify-between border-b border-[#DCD9D1] pb-3.5">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#6D795B]">
                  Currently Selected Formulation
                </span>
                <h3 className="font-editorial text-2xl font-semibold text-[#20211F] mt-0.5">
                  {selectedVariant.name}
                </h3>
                <p className="text-xs text-[#6E706A]">{selectedVariant.weight}</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-[#20211F]">
                  ${selectedVariant.price.toFixed(2)}
                </span>
                {selectedVariant.compareAtPrice && (
                  <span className="block text-xs text-[#6E706A] line-through">
                    ${selectedVariant.compareAtPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Flavor Swatches */}
            <div className="space-y-2.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#20211F]">
                Select Formulation Flavor:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {VARIANTS.slice(0, 4).map((variant) => {
                  const isCurrent = selectedVariant.id === variant.id;
                  return (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`p-2.5 rounded-sm border text-left transition-all flex items-center gap-2.5 cursor-pointer ${
                        isCurrent
                          ? "border-[#20211F] bg-[#F5F3EE] shadow-xs ring-1 ring-[#20211F]"
                          : "border-[#DCD9D1] hover:border-[#6E706A] bg-[#FFFFFF]"
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: variant.colorHex }}
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-[#20211F] truncate">
                          {variant.name}
                        </p>
                        <p className="text-[10px] text-[#6E706A]">
                          ${variant.price.toFixed(2)}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tasting Notes */}
            <div className="p-3 bg-[#F5F3EE] rounded-sm border border-[#DCD9D1] space-y-1 text-xs">
              <p className="font-semibold text-[#20211F] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C99A65]" />
                Tasting Notes:
              </p>
              <p className="text-[#6E706A] leading-relaxed">
                {selectedVariant.flavor.includes("Chocolate")
                  ? "Rich organic cocoa front with a silky, rounded Madagascar vanilla finish. Subtle warmth from California sweet almond."
                  : selectedVariant.flavor.includes("Vanilla")
                  ? "Pure floral sweetness from cured vanilla orchids. Soft, cream-like mouthfeel with hints of stone-ground oat."
                  : selectedVariant.flavor.includes("Cacao")
                  ? "Deep, unalkalized dark cocoa with natural bittersweet complexity. 0g added sugar."
                  : "Completely unflavored and unsweetened. Ideal for custom fruit smoothies and savory baking recipes."}
              </p>
            </div>

            {/* Purchase CTA */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 px-6 bg-[#20211F] hover:bg-[#343532] text-[#F5F3EE] rounded-sm text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all shadow-natural cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add {selectedVariant.name} • ${selectedVariant.price.toFixed(2)}</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#6E706A]">
                <Check className="w-3.5 h-3.5 text-[#6D795B]" />
                <span>In Stock • Ready for Carbon-Neutral Dispatch</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="max-w-7xl mx-auto w-full text-center text-xs text-[#6E706A]">
          <span>Continue scrolling to view the Full Product Range Reveal ↓</span>
        </div>
      </div>
    </section>
  );
}
