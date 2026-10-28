"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ScrollVideo } from "@/components/media/ScrollVideo";
import { ASSETS } from "@/lib/assets";
import { VARIANTS } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import { Check, ShoppingBag, Sparkles } from "lucide-react";

export function TextureFlavorsSection() {
  const [selectedVariant, setSelectedVariant] = useState(VARIANTS[0]);
  const { addItem } = useCart();

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

  return (
    <section id="flavors" className="py-24 lg:py-32 bg-[#F5F3EE] border-b border-[#DCD9D1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-end">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6D795B]">
              Section 06 • Texture & Flavor Profiles
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#20211F]">
              Naturally Silky. Unadulterated Taste.
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-sm text-[#6E706A] leading-relaxed">
              We never use artificial flavors, chemical masking agents, or sickeningly sweet chemical additives. Experience genuine notes of sun-cured vanilla beans and single-origin raw cacao.
            </p>
          </div>
        </div>

        {/* Video & Interactive Flavor Switcher */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Swirling Shake Video (video-5) */}
          <div className="lg:col-span-7 relative">
            <div className="rounded-sm overflow-hidden border border-[#DCD9D1] shadow-natural-lg bg-[#E9E4DB]">
              <ScrollVideo
                src={ASSETS.videos.texture.src}
                poster={ASSETS.images.lifestyleShake.src}
                alt={ASSETS.videos.texture.title}
                className="w-full"
                overlayOpacity={0.12}
                autoPlayWhenVisible={true}
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] text-[#6E706A]">
              <span>Real time swirl capture • Cold almond milk base</span>
              <span className="text-[#6D795B] font-medium">Naturally Hydrophilic</span>
            </div>
          </div>

          {/* Flavor Selection Panel */}
          <div className="lg:col-span-5 bg-[#FFFFFF] p-8 rounded-sm border border-[#DCD9D1] shadow-natural space-y-6">
            <div className="flex items-center justify-between border-b border-[#DCD9D1] pb-4">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#6D795B]">
                  Currently Selected
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
            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#20211F]">
                Select Formulation Flavor:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {VARIANTS.slice(0, 4).map((variant) => {
                  const isCurrent = selectedVariant.id === variant.id;
                  return (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`p-3 rounded-sm border text-left transition-all flex items-center gap-3 cursor-pointer ${
                        isCurrent
                          ? "border-[#20211F] bg-[#F5F3EE] shadow-xs"
                          : "border-[#DCD9D1] hover:border-[#6E706A] bg-[#FFFFFF]"
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-black/10 shrink-0"
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

            {/* Dynamic Flavor Profile Notes */}
            <div className="p-3.5 bg-[#F5F3EE] rounded-sm border border-[#DCD9D1] space-y-1 text-xs">
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
            <div className="space-y-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 px-6 bg-[#20211F] hover:bg-[#343532] text-[#F5F3EE] rounded-sm text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all shadow-natural cursor-pointer"
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
      </div>
    </section>
  );
}
