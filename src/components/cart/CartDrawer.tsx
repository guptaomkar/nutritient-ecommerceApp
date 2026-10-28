"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { X, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { BRAND_INFO } from "@/lib/data";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    openCheckout,
    removeItem,
    updateQuantity,
    subtotal,
    freeShippingThreshold,
    freeShippingRemaining,
    totalQuantity,
  } = useCart();

  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeCart]);

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const freeShippingProgress = Math.min(
    100,
    Math.round(((freeShippingThreshold - freeShippingRemaining) / freeShippingThreshold) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Shopping Bag">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#20211F]/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div
          ref={drawerRef}
          className="w-screen max-w-md bg-[#F5F3EE] shadow-2xl flex flex-col justify-between border-l border-[#DCD9D1]"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#DCD9D1] flex items-center justify-between bg-[#FFFFFF]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#20211F]" />
              <h2 className="text-base font-semibold tracking-tight text-[#20211F]">
                Shopping Bag ({totalQuantity})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-2 rounded-full hover:bg-[#E9E4DB] text-[#6E706A] hover:text-[#20211F] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Tier Bar */}
          <div className="bg-[#E9E4DB] px-6 py-3 border-b border-[#DCD9D1]">
            <div className="flex items-center justify-between text-xs mb-1.5 text-[#20211F]">
              <span className="flex items-center gap-1.5 font-medium">
                <Truck className="w-3.5 h-3.5 text-[#6D795B]" />
                {freeShippingRemaining === 0 ? (
                  <span className="text-[#6D795B] font-semibold">Complimentary Shipping Unlocked!</span>
                ) : (
                  <span>
                    Add <strong className="font-semibold">${freeShippingRemaining.toFixed(2)}</strong> for Free Shipping
                  </span>
                )}
              </span>
              <span className="text-[#6E706A]">{freeShippingProgress}%</span>
            </div>
            <div className="w-full bg-[#DCD9D1] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#6D795B] h-full transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#DCD9D1]/60">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 rounded-full bg-[#E9E4DB] flex items-center justify-center mb-4 text-[#6E706A]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-editorial text-2xl font-normal text-[#20211F] mb-2">
                  Your bag is empty
                </h3>
                <p className="text-sm text-[#6E706A] max-w-xs mb-6">
                  Discover our clean, cold-filtered protein formulas and start your daily ritual.
                </p>
                <button
                  onClick={closeCart}
                  className="px-6 py-3 bg-[#20211F] text-[#F5F3EE] rounded-sm text-xs uppercase tracking-widest font-medium hover:bg-[#343532] transition-colors"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.variantId} className="py-4 flex gap-4 items-center">
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 rounded-sm overflow-hidden bg-[#FFFFFF] border border-[#DCD9D1] shrink-0">
                    <Image
                      src={item.image}
                      alt={item.flavor}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-medium text-[#20211F] truncate">
                        {item.productName}
                      </h4>
                      <span className="text-sm font-semibold text-[#20211F]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-[#6E706A] mt-0.5">{item.flavor}</p>
                    <p className="text-xs text-[#6E706A]">{item.weight}</p>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#DCD9D1] bg-[#FFFFFF] rounded-sm">
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          className="p-1 hover:bg-[#E9E4DB] text-[#6E706A] hover:text-[#20211F] transition-colors"
                          aria-label={`Decrease quantity of ${item.flavor}`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-medium text-[#20211F]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          className="p-1 hover:bg-[#E9E4DB] text-[#6E706A] hover:text-[#20211F] transition-colors"
                          aria-label={`Increase quantity of ${item.flavor}`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="text-xs text-[#6E706A] hover:text-[#20211F] underline underline-offset-2 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Summary */}
          {items.length > 0 && (
            <div className="p-6 bg-[#FFFFFF] border-t border-[#DCD9D1] space-y-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-[#6E706A]">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#20211F]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#6E706A]">
                  <span>Estimated Shipping</span>
                  <span>{freeShippingRemaining === 0 ? "Free" : "$6.00"}</span>
                </div>
                <div className="flex justify-between text-[#6E706A] text-xs">
                  <span>Taxes calculated at checkout</span>
                  <span>—</span>
                </div>
                <div className="pt-2 border-t border-[#DCD9D1] flex justify-between text-base font-semibold text-[#20211F]">
                  <span>Total</span>
                  <span>
                    ${(subtotal + (freeShippingRemaining === 0 ? 0 : 6)).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={openCheckout}
                className="w-full py-3.5 px-6 bg-[#20211F] hover:bg-[#343532] text-[#F5F3EE] rounded-sm text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-colors shadow-natural"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-xs text-[#6E706A]">
                <ShieldCheck className="w-4 h-4 text-[#6D795B]" />
                <span>30-Day Happiness Guarantee • Free Returns</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
