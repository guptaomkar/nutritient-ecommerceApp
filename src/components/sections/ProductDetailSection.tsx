"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, ShieldCheck, Truck, RotateCcw, Check, ShoppingBag, Plus, Minus } from "lucide-react";
import { PRIMARY_PRODUCT, VARIANTS } from "@/lib/data";
import { useCart } from "@/context/CartContext";

interface ProductDetailSectionProps {
  selectedVariantId?: string;
}

export function ProductDetailSection({ selectedVariantId }: ProductDetailSectionProps) {
  const [activeVariant, setActiveVariant] = useState(
    VARIANTS.find((v) => v.id === selectedVariantId) || VARIANTS[0]
  );
  const [activeImageKey, setActiveImageKey] = useState<"hero" | "exploded" | "ingredients" | "lifestyle">("hero");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"overview" | "ingredients" | "shipping" | "storage">("overview");

  const { addItem } = useCart();

  const galleryImages = [
    { key: "hero" as const, src: PRIMARY_PRODUCT.images.hero, label: "Canister & Scoop" },
    { key: "exploded" as const, src: PRIMARY_PRODUCT.images.exploded, label: "Exploded Anatomy" },
    { key: "ingredients" as const, src: PRIMARY_PRODUCT.images.ingredients, label: "5 Whole Ingredients" },
    { key: "lifestyle" as const, src: PRIMARY_PRODUCT.images.lifestyle, label: "Prepared Shake" },
  ];

  const handleAddToCart = () => {
    addItem(
      {
        productId: PRIMARY_PRODUCT.id,
        variantId: activeVariant.id,
        productName: PRIMARY_PRODUCT.name,
        flavor: activeVariant.flavor,
        weight: activeVariant.weight,
        price: activeVariant.price,
        image: activeVariant.image,
      },
      quantity
    );
  };

  return (
    <section id="product-detail" className="py-24 lg:py-32 bg-[#F5F3EE] border-b border-[#DCD9D1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Subhead */}
        <div className="mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6D795B]">
            Section 08 • Product Specifications & Acquisition
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-medium tracking-tight text-[#20211F] mt-1">
            Complete Formulation Detail
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Main Viewport */}
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-[#FFFFFF] border border-[#DCD9D1] shadow-natural-lg">
              <Image
                src={PRIMARY_PRODUCT.images[activeImageKey]}
                alt={`${PRIMARY_PRODUCT.name} - ${activeImageKey}`}
                fill
                sizes="(max-width: 1024px) 100vw, 750px"
                className="object-cover transition-all duration-300"
                priority
              />
              <div className="absolute bottom-4 left-4 bg-[#FFFFFF]/90 backdrop-blur-md px-3 py-1.5 rounded-xs border border-[#DCD9D1] text-[11px] font-medium text-[#20211F]">
                {galleryImages.find((img) => img.key === activeImageKey)?.label}
              </div>
            </div>

            {/* Thumbnail Navigation */}
            <div className="grid grid-cols-4 gap-3">
              {galleryImages.map((img) => (
                <button
                  key={img.key}
                  onClick={() => setActiveImageKey(img.key)}
                  className={`relative aspect-[4/3] rounded-xs overflow-hidden border transition-all cursor-pointer ${
                    activeImageKey === img.key
                      ? "border-[#20211F] ring-1 ring-[#20211F] shadow-xs"
                      : "border-[#DCD9D1] opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={img.src} alt={img.label} fill sizes="120px" className="object-cover" />
                </button>
              ))}
            </div>

            {/* Content Tabs (Overview / Ingredients / Shipping / Storage) */}
            <div className="pt-8 border-t border-[#DCD9D1]">
              <div className="flex border-b border-[#DCD9D1] gap-6 text-xs font-semibold uppercase tracking-wider">
                {(["overview", "ingredients", "shipping", "storage"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 relative transition-colors cursor-pointer ${
                      activeTab === tab
                        ? "text-[#20211F] after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#20211F]"
                        : "text-[#6E706A] hover:text-[#20211F]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="py-6 text-xs leading-relaxed text-[#20211F]">
                {activeTab === "overview" && (
                  <div className="space-y-3">
                    <p>{PRIMARY_PRODUCT.description}</p>
                    <ul className="grid grid-cols-2 gap-2 text-[#6E706A] pt-2">
                      <li className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#6D795B]" />
                        <span>26g Native Isolate per 32g scoop</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#6D795B]" />
                        <span>Zero artificial foaming or gums</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#6D795B]" />
                        <span>0g Added Cane Sugar or Sucralose</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#6D795B]" />
                        <span>Full BCAA & Essential Amino Spectrum</span>
                      </li>
                    </ul>
                  </div>
                )}

                {activeTab === "ingredients" && (
                  <div className="space-y-3">
                    <p className="font-semibold text-[#20211F]">
                      Ingredients: Cold-Filtered Native Protein, Stone-Ground Rolled Oats, California Sweet Almonds, Single-Origin Raw Cacao, Pure Madagascar Bourbon Vanilla Bean, Trace Mineral Sea Salt, Organic Monk Fruit.
                    </p>
                    <p className="text-[#6E706A]">{PRIMARY_PRODUCT.allergens[0]}</p>
                  </div>
                )}

                {activeTab === "shipping" && (
                  <div className="space-y-2 text-[#6E706A]">
                    <p>
                      <strong>Complimentary Ground Shipping:</strong> On all orders above $75. Orders ship in 100% recyclable, plastic-free outer cartons within 24 hours.
                    </p>
                    <p>
                      <strong>30-Day Happiness Guarantee:</strong> If the texture or flavor does not exceed your expectations, reach out for a prompt hassle-free refund.
                    </p>
                  </div>
                )}

                {activeTab === "storage" && (
                  <div className="space-y-2 text-[#6E706A]">
                    <p>{PRIMARY_PRODUCT.storageInstructions}</p>
                    <p>Keep the scoop dry and stored resting on top of the powder after each serving.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Purchasing Panel */}
          <div className="lg:col-span-5 bg-[#FFFFFF] p-8 rounded-sm border border-[#DCD9D1] shadow-natural space-y-6">
            {/* Header / Reviews */}
            <div className="space-y-2 border-b border-[#DCD9D1] pb-5">
              <div className="flex items-center gap-2">
                <div className="flex items-center text-[#C99A65]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-[#20211F]">
                  {PRIMARY_PRODUCT.rating} ({PRIMARY_PRODUCT.reviewCount} Reviews)
                </span>
              </div>

              <h3 className="font-editorial text-3xl font-semibold text-[#20211F]">
                {PRIMARY_PRODUCT.name}
              </h3>
              <p className="text-xs text-[#6E706A]">{PRIMARY_PRODUCT.subtitle}</p>

              <div className="pt-2 flex items-baseline gap-3">
                <span className="text-3xl font-bold text-[#20211F]">
                  ${activeVariant.price.toFixed(2)}
                </span>
                {activeVariant.compareAtPrice && (
                  <span className="text-sm text-[#6E706A] line-through">
                    ${activeVariant.compareAtPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-xs font-medium text-[#6D795B] bg-[#6D795B]/10 px-2 py-0.5 rounded-xs">
                  In Stock
                </span>
              </div>
            </div>

            {/* Variant / Flavor Selection */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold uppercase tracking-wider text-[#20211F]">
                  Flavor:
                </span>
                <span className="font-medium text-[#6D795B]">{activeVariant.flavor}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {VARIANTS.map((v) => {
                  const isSelected = activeVariant.id === v.id;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setActiveVariant(v)}
                      className={`p-3 rounded-sm border text-left transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#20211F] bg-[#F5F3EE] ring-1 ring-[#20211F]"
                          : "border-[#DCD9D1] hover:border-[#6E706A] bg-[#FFFFFF]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: v.colorHex }}
                        />
                        <span className="text-xs font-semibold text-[#20211F] truncate">
                          {v.name}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#6E706A] block mt-1 pl-5">
                        ${v.price.toFixed(2)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <span className="block text-xs font-semibold uppercase tracking-wider text-[#20211F]">
                Quantity:
              </span>
              <div className="flex items-center border border-[#DCD9D1] rounded-sm w-36 bg-[#FFFFFF]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2.5 hover:bg-[#E9E4DB] text-[#6E706A] hover:text-[#20211F] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="flex-1 text-center text-xs font-semibold text-[#20211F]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2.5 hover:bg-[#E9E4DB] text-[#6E706A] hover:text-[#20211F] transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add-to-Cart Action */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 px-6 bg-[#20211F] hover:bg-[#343532] text-[#F5F3EE] rounded-sm text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all shadow-natural cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag • ${(activeVariant.price * quantity).toFixed(2)}</span>
              </button>

              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#DCD9D1]/60 text-center text-[10px] text-[#6E706A]">
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#6D795B]" />
                  <span>Carbon-Neutral Dispatch</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#6D795B]" />
                  <span>Informed Choice Certified</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5 text-[#6D795B]" />
                  <span>30-Day Happiness Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
