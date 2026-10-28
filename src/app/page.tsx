"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CheckoutModal } from "@/components/checkout/CheckoutModal";
import { HeroSection } from "@/components/sections/HeroSection";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { ScienceSection } from "@/components/sections/ScienceSection";
import { IngredientAtlasSection } from "@/components/sections/IngredientAtlasSection";
import { PreparationSection } from "@/components/sections/PreparationSection";
import { TextureFlavorsSection } from "@/components/sections/TextureFlavorsSection";
import { ProductCollectionSection } from "@/components/sections/ProductCollectionSection";
import { ProductDetailSection } from "@/components/sections/ProductDetailSection";
import { NutritionSection } from "@/components/sections/NutritionSection";
import { TrustFaqSection } from "@/components/sections/TrustFaqSection";
import { ConversionCtaSection } from "@/components/sections/ConversionCtaSection";

export default function Home() {
  const [selectedDetailVariantId, setSelectedDetailVariantId] = useState<string>("np-choc-vanilla-960");

  const handleSelectProductForDetail = (variantId: string) => {
    setSelectedDetailVariantId(variantId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F3EE] text-[#20211F]">
      {/* Global Navigation Header */}
      <Header />

      {/* Main Editorial & Commerce Journey */}
      <main className="flex-1">
        {/* Section 01: Cinematic Product Hero */}
        <HeroSection />

        {/* Section 02: Product Philosophy */}
        <PhilosophySection />

        {/* Section 03: Product Science & Micro-Milled Texture */}
        <ScienceSection />

        {/* Section 04: Ingredient Transparency Atlas */}
        <IngredientAtlasSection />

        {/* Section 05: How to Prepare Sequence */}
        <PreparationSection />

        {/* Section 06: Texture & Flavor Profiles */}
        <TextureFlavorsSection />

        {/* Section 07: Product Collection Grid */}
        <ProductCollectionSection onSelectProductForDetail={handleSelectProductForDetail} />

        {/* Section 08: Product Detail & Specification Experience */}
        <ProductDetailSection selectedVariantId={selectedDetailVariantId} />

        {/* Section 09: Nutrition & Product Information Panel */}
        <NutritionSection />

        {/* Section 12: Trust, Education & FAQ */}
        <TrustFaqSection />

        {/* Section 13: Final Conversion CTA */}
        <ConversionCtaSection />
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Persistent Shopping Cart Drawer */}
      <CartDrawer />

      {/* Transparent Checkout Review Modal */}
      <CheckoutModal />
    </div>
  );
}
