"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ShoppingBag, Check, ChevronUp } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { VARIANTS, PRIMARY_PRODUCT } from "@/lib/data";

export function StickyQuickBuyBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(VARIANTS[0]);
  const { addItem } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past 600px and not at the very footer
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;

      if (scrollY > 550 && scrollY < docHeight - winHeight - 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleQuickAdd = () => {
    addItem({
      productId: PRIMARY_PRODUCT.id,
      variantId: selectedVariant.id,
      productName: PRIMARY_PRODUCT.name,
      flavor: selectedVariant.flavor,
      weight: selectedVariant.weight,
      price: selectedVariant.price,
      image: selectedVariant.image,
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-40 max-w-lg w-full animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#FFFFFF]/95 backdrop-blur-md rounded-sm border border-[#DCD9D1] shadow-2xl p-3 sm:p-4 flex items-center justify-between gap-3 text-[#20211F]">
        {/* Thumbnail & Info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative w-11 h-11 rounded-xs overflow-hidden bg-[#F5F3EE] border border-[#DCD9D1] shrink-0">
            <Image
              src={selectedVariant.image}
              alt={selectedVariant.name}
              fill
              sizes="44px"
              className="object-cover"
            />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold text-[#20211F] truncate">
                Natural Protein
              </h4>
              <span className="text-xs font-semibold text-[#6D795B]">
                ${selectedVariant.price.toFixed(2)}
              </span>
            </div>

            {/* Flavor selector in mini bar */}
            <select
              value={selectedVariant.id}
              onChange={(e) => {
                const found = VARIANTS.find((v) => v.id === e.target.value);
                if (found) setSelectedVariant(found);
              }}
              className="text-[11px] text-[#6E706A] bg-transparent outline-none cursor-pointer hover:text-[#20211F] truncate max-w-[150px] sm:max-w-[200px]"
            >
              {VARIANTS.slice(0, 4).map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleQuickAdd}
          className="py-2.5 px-4 sm:px-5 bg-[#20211F] hover:bg-[#343532] text-[#F5F3EE] rounded-sm text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-colors shadow-natural shrink-0 cursor-pointer"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Add to Bag</span>
        </button>
      </div>
    </div>
  );
}
