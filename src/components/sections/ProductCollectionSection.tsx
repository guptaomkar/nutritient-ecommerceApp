"use client";

import React from "react";
import Image from "next/image";
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
  const { addItem } = useCart();

  return (
    <section id="collection" className="py-24 lg:py-32 bg-[#E9E4DB] border-b border-[#DCD9D1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Collection Video Introduction (video-6) */}
        <div className="relative rounded-sm overflow-hidden border border-[#DCD9D1] shadow-natural-lg bg-[#F5F3EE]">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-8">
              <ScrollVideo
                src={ASSETS.videos.collection.src}
                poster={ASSETS.images.studioTub.src}
                alt={ASSETS.videos.collection.title}
                className="w-full"
                overlayOpacity={0.08}
                initialMode="scrub"
              />
            </div>
            <div className="lg:col-span-4 p-8 lg:p-10 space-y-4 bg-[#FFFFFF]">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6D795B]">
                Section 07 • The Formulations
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl font-medium tracking-tight text-[#20211F]">
                The Complete Natural Protein Range
              </h2>
              <p className="text-xs text-[#6E706A] leading-relaxed">
                Every product is formulated under identical strict standards: 26g native protein, zero added gums, zero fillers, and 100% third-party tested.
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs text-[#20211F] font-medium">
                <Star className="w-4 h-4 fill-[#C99A65] text-[#C99A65]" />
                <span>4.94 / 5.0 Rating across 382 verified reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Catalog Grid */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-[#DCD9D1] pb-4">
            <div>
              <h3 className="font-editorial text-2xl font-semibold text-[#20211F]">
                Available Formulations
              </h3>
              <p className="text-xs text-[#6E706A] mt-0.5">
                Showing all verified batches in stock for immediate carbon-neutral shipping.
              </p>
            </div>
            <span className="text-xs font-semibold text-[#6D795B] uppercase tracking-wider">
              {VARIANTS.length} Offerings Available
            </span>
          </div>

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
                      className="object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                    />

                    {/* Stock badge */}
                    <div className="absolute top-3 left-3 bg-[#FFFFFF]/90 backdrop-blur-md px-2.5 py-1 rounded-xs border border-[#DCD9D1] text-[10px] uppercase font-semibold text-[#6D795B] flex items-center gap-1">
                      <Check className="w-3 h-3 text-[#6D795B]" />
                      <span>Ready to Ship</span>
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
      </div>
    </section>
  );
}
