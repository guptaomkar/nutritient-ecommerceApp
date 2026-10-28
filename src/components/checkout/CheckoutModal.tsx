"use client";

import React, { useState, useId } from "react";
import Image from "next/image";
import { X, CheckCircle, AlertCircle, Lock, Shield, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function CheckoutModal() {
  const { isCheckoutOpen, closeCheckout, items, subtotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    country: "United States",
    shippingMethod: "standard",
    discountCode: "",
  });

  const [appliedDiscount, setAppliedDiscount] = useState<number | null>(null);
  const [discountError, setDiscountError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<{
    name: string;
    email: string;
    itemsCount: number;
    total: number;
  } | null>(null);

  // Generate unique IDs for form elements
  const firstNameId = useId();
  const lastNameId = useId();
  const emailId = useId();
  const addressId = useId();
  const cityId = useId();
  const zipCodeId = useId();
  const shippingMethodId = useId();
  const discountCodeId = useId();

  if (!isCheckoutOpen) return null;

  const shippingCost = formData.shippingMethod === "express" ? 12 : subtotal >= 75 ? 0 : 6;
  const discountAmount = appliedDiscount ? (subtotal * appliedDiscount) / 100 : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleApplyDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    setDiscountError(null);
    if (formData.discountCode.trim().toUpperCase() === "CLEAN10") {
      setAppliedDiscount(10);
    } else if (formData.discountCode.trim().toUpperCase() === "NATURAL20") {
      setAppliedDiscount(20);
    } else {
      setDiscountError("Invalid promo code. Try CLEAN10 for 10% off.");
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setConfirmedOrder({
        name: `${formData.firstName} ${formData.lastName}`.trim() || "Customer",
        email: formData.email,
        itemsCount: items.reduce((s, i) => s + i.quantity, 0),
        total: grandTotal,
      });
      setIsSuccess(true);
      clearCart();
    }, 1200);
  };

  const handleCloseAndReset = () => {
    setIsSuccess(false);
    setConfirmedOrder(null);
    closeCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#20211F]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-[#F5F3EE] rounded-sm shadow-2xl border border-[#DCD9D1] overflow-hidden my-8">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#FFFFFF] border-b border-[#DCD9D1] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#6D795B]" />
            <h2 className="text-sm font-semibold tracking-wide uppercase text-[#20211F]">
              Express Checkout
            </h2>
          </div>
          <button
            onClick={handleCloseAndReset}
            className="p-1.5 rounded-full hover:bg-[#E9E4DB] text-[#6E706A] hover:text-[#20211F] transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess && confirmedOrder ? (
          /* Confirmation State */
          <div className="p-8 md:p-12 text-center space-y-6 bg-[#FFFFFF]">
            <div className="w-16 h-16 bg-[#6D795B]/10 text-[#6D795B] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#6D795B]">
                Demonstration Order Submitted
              </span>
              <h3 className="font-editorial text-3xl font-medium text-[#20211F]">
                Thank you, {confirmedOrder.name}
              </h3>
              <p className="text-sm text-[#6E706A] max-w-md mx-auto">
                A simulated order confirmation has been logged for{" "}
                <strong className="text-[#20211F]">{confirmedOrder.email}</strong>.
              </p>
            </div>

            {/* Transparent Architecture Note */}
            <div className="max-w-lg mx-auto bg-[#F5F3EE] border border-[#DCD9D1] p-4 rounded-sm text-left text-xs space-y-2 text-[#6E706A]">
              <div className="flex items-center gap-1.5 text-[#20211F] font-semibold">
                <Shield className="w-4 h-4 text-[#6D795B]" />
                <span>Backend Handoff & Security Notice</span>
              </div>
              <p>
                In production, this submission initiates an authenticated session with your payment gateway (e.g., Stripe PaymentIntent, Shopify Storefront API, or Paddle). Client-side credentials and payment card numbers are never stored in browser memory.
              </p>
              <div className="pt-2 border-t border-[#DCD9D1] flex justify-between text-[#20211F]">
                <span>Total Items: {confirmedOrder.itemsCount}</span>
                <span className="font-semibold">Simulated Total: ${confirmedOrder.total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCloseAndReset}
              className="px-8 py-3 bg-[#20211F] text-[#F5F3EE] rounded-sm text-xs uppercase tracking-widest font-semibold hover:bg-[#343532] transition-colors"
            >
              Return to Catalog
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[#DCD9D1]">
            {/* Left: Customer Info */}
            <div className="p-6 md:col-span-7 space-y-5">
              {/* Notice Banner */}
              <div className="bg-[#E9E4DB] border border-[#DCD9D1] p-3 rounded-sm flex items-start gap-2.5 text-xs text-[#6E706A]">
                <AlertCircle className="w-4 h-4 text-[#C99A65] shrink-0 mt-0.5" />
                <span>
                  <strong>Frontend Demo Mode:</strong> No real payment transaction will be charged. Enter sample shipping details to review the order flow.
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#20211F]">
                  1. Contact Information
                </h3>
                <div>
                  <label htmlFor={emailId} className="block text-xs font-medium text-[#6E706A] mb-1">
                    Email Address
                  </label>
                  <input
                    id={emailId}
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@example.com"
                    className="w-full px-3 py-2 text-sm bg-[#FFFFFF] border border-[#DCD9D1] rounded-sm text-[#20211F] focus:border-[#6D795B] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#20211F]">
                  2. Shipping Address
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor={firstNameId} className="block text-xs font-medium text-[#6E706A] mb-1">
                      First Name
                    </label>
                    <input
                      id={firstNameId}
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="Alex"
                      className="w-full px-3 py-2 text-sm bg-[#FFFFFF] border border-[#DCD9D1] rounded-sm text-[#20211F] focus:border-[#6D795B] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor={lastNameId} className="block text-xs font-medium text-[#6E706A] mb-1">
                      Last Name
                    </label>
                    <input
                      id={lastNameId}
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Mercer"
                      className="w-full px-3 py-2 text-sm bg-[#FFFFFF] border border-[#DCD9D1] rounded-sm text-[#20211F] focus:border-[#6D795B] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor={addressId} className="block text-xs font-medium text-[#6E706A] mb-1">
                    Street Address
                  </label>
                  <input
                    id={addressId}
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="742 Evergreen Terrace"
                    className="w-full px-3 py-2 text-sm bg-[#FFFFFF] border border-[#DCD9D1] rounded-sm text-[#20211F] focus:border-[#6D795B] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor={cityId} className="block text-xs font-medium text-[#6E706A] mb-1">
                      City
                    </label>
                    <input
                      id={cityId}
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Springfield"
                      className="w-full px-3 py-2 text-sm bg-[#FFFFFF] border border-[#DCD9D1] rounded-sm text-[#20211F] focus:border-[#6D795B] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor={zipCodeId} className="block text-xs font-medium text-[#6E706A] mb-1">
                      Postal Code
                    </label>
                    <input
                      id={zipCodeId}
                      type="text"
                      required
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      placeholder="97477"
                      className="w-full px-3 py-2 text-sm bg-[#FFFFFF] border border-[#DCD9D1] rounded-sm text-[#20211F] focus:border-[#6D795B] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label htmlFor={shippingMethodId} className="block text-xs font-semibold uppercase tracking-wider text-[#20211F]">
                  3. Shipping Method
                </label>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3 border border-[#DCD9D1] bg-[#FFFFFF] rounded-sm cursor-pointer hover:border-[#6D795B]">
                    <div className="flex items-center gap-2">
                      <input
                        id={shippingMethodId}
                        type="radio"
                        name="shipping"
                        checked={formData.shippingMethod === "standard"}
                        onChange={() => setFormData({ ...formData, shippingMethod: "standard" })}
                        className="text-[#6D795B] focus:ring-0"
                      />
                      <span className="text-xs font-medium text-[#20211F]">
                        Carbon-Neutral Ground (2–4 Days)
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-[#20211F]">
                      {subtotal >= 75 ? "FREE" : "$6.00"}
                    </span>
                  </label>

                  <label className="flex items-center justify-between p-3 border border-[#DCD9D1] bg-[#FFFFFF] rounded-sm cursor-pointer hover:border-[#6D795B]">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="shipping"
                        checked={formData.shippingMethod === "express"}
                        onChange={() => setFormData({ ...formData, shippingMethod: "express" })}
                        className="text-[#6D795B] focus:ring-0"
                      />
                      <span className="text-xs font-medium text-[#20211F]">
                        Express Air Priority (1–2 Days)
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-[#20211F]">$12.00</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right: Order Summary & Review */}
            <div className="p-6 md:col-span-5 bg-[#FFFFFF] flex flex-col justify-between space-y-6">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#20211F] mb-4">
                  Order Summary
                </h3>

                {/* Mini Item List */}
                <div className="space-y-3 max-h-48 overflow-y-auto pr-1 divide-y divide-[#DCD9D1]/50">
                  {items.map((item) => (
                    <div key={item.variantId} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="relative w-10 h-10 rounded-xs overflow-hidden border border-[#DCD9D1] bg-[#F5F3EE] shrink-0">
                          <Image src={item.image} alt={item.flavor} fill className="object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-[#20211F] truncate">{item.flavor}</p>
                          <p className="text-[#6E706A]">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-semibold text-[#20211F]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Promo Code Input */}
                <div className="mt-4 pt-4 border-t border-[#DCD9D1]">
                  <div className="flex gap-2">
                    <label htmlFor={discountCodeId} className="sr-only">Promo Code</label>
                    <input
                      id={discountCodeId}
                      type="text"
                      placeholder="Promo code (try CLEAN10)"
                      value={formData.discountCode}
                      onChange={(e) => setFormData({ ...formData, discountCode: e.target.value })}
                      className="flex-1 px-3 py-1.5 text-xs bg-[#F5F3EE] border border-[#DCD9D1] rounded-sm text-[#20211F] uppercase focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleApplyDiscount}
                      className="px-3 py-1.5 bg-[#E9E4DB] hover:bg-[#DCD9D1] text-[#20211F] rounded-sm text-xs font-medium transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {appliedDiscount && (
                    <p className="text-xs text-[#6D795B] mt-1 font-medium">
                      ✓ Promo applied: {appliedDiscount}% off subtotal
                    </p>
                  )}
                  {discountError && (
                    <p className="text-xs text-red-600 mt-1">{discountError}</p>
                  )}
                </div>

                {/* Calculation breakdown */}
                <div className="mt-5 space-y-2 text-xs border-t border-[#DCD9D1] pt-3 text-[#6E706A]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium text-[#20211F]">${subtotal.toFixed(2)}</span>
                  </div>
                  {appliedDiscount && (
                    <div className="flex justify-between text-[#6D795B]">
                      <span>Discount ({appliedDiscount}%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-medium text-[#20211F]">
                      {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-[#DCD9D1] flex justify-between text-sm font-semibold text-[#20211F]">
                    <span>Total Due</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#DCD9D1]">
                <button
                  type="submit"
                  disabled={isSubmitting || items.length === 0}
                  className="w-full py-3 px-6 bg-[#20211F] hover:bg-[#343532] text-[#F5F3EE] rounded-sm text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-white"></span>
                      Validating Order...
                    </span>
                  ) : (
                    <>
                      <span>Place Simulated Order</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#6E706A]">
                  <Lock className="w-3 h-3 text-[#6D795B]" />
                  <span>256-Bit SSL Encryption • Safe Sandbox Experience</span>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
