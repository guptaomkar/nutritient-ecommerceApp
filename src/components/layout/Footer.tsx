"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Leaf, Award, Compass } from "lucide-react";
import { BRAND_INFO, PRIMARY_PRODUCT } from "@/lib/data";

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.includes("@")) {
      setIsSubscribed(true);
      setNewsletterEmail("");
    }
  };

  return (
    <footer className="bg-[#20211F] text-[#F5F3EE] pt-16 pb-12 border-t border-[#343532]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Badges Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-[#343532] text-center md:text-left">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#A7B39A] shrink-0" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#F5F3EE]">Third-Party Tested</p>
              <p className="text-[11px] text-[#A7B39A]">Informed Choice Verified</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Leaf className="w-6 h-6 text-[#A7B39A] shrink-0" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#F5F3EE]">Clean Ingredients</p>
              <p className="text-[11px] text-[#A7B39A]">5 Whole-Food Components</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-[#A7B39A] shrink-0" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#F5F3EE]">cGMP Standard</p>
              <p className="text-[11px] text-[#A7B39A]">Pharmaceutical Grade Facility</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Compass className="w-6 h-6 text-[#A7B39A] shrink-0" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#F5F3EE]">Carbon Offset</p>
              <p className="text-[11px] text-[#A7B39A]">100% Neutral Logistics</p>
            </div>
          </div>
        </div>

        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-editorial text-2xl font-bold tracking-tight text-[#F5F3EE] block">
              NATURAL PROTEIN
            </span>
            <p className="text-xs text-[#E9E4DB]/80 leading-relaxed max-w-sm">
              Formulated for individuals who demand physiological clarity. Zero artificial gums, fillers, or synthetic masking agents. Just cold-filtered native protein and real whole foods.
            </p>
            <div className="pt-2 text-xs text-[#A7B39A] space-y-1">
              <p>Direct Concierge: {BRAND_INFO.supportEmail}</p>
              <p>Toll-Free Support: {BRAND_INFO.phone}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#C99A65]">
              Formulations
            </h4>
            <ul className="space-y-2 text-xs text-[#E9E4DB]/70">
              <li><a href="#collection" className="hover:text-[#FFFFFF] transition-colors">Signature Blend (960g)</a></li>
              <li><a href="#collection" className="hover:text-[#FFFFFF] transition-colors">Madagascar Vanilla</a></li>
              <li><a href="#collection" className="hover:text-[#FFFFFF] transition-colors">Dark Cacao</a></li>
              <li><a href="#collection" className="hover:text-[#FFFFFF] transition-colors">Starter Ritual Kit</a></li>
            </ul>
          </div>

          {/* Transparency & Science */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#C99A65]">
              Transparency
            </h4>
            <ul className="space-y-2 text-xs text-[#E9E4DB]/70">
              <li><a href="#philosophy" className="hover:text-[#FFFFFF] transition-colors">Product Philosophy</a></li>
              <li><a href="#ingredients" className="hover:text-[#FFFFFF] transition-colors">Ingredient Atlas</a></li>
              <li><a href="#science" className="hover:text-[#FFFFFF] transition-colors">Cold-Filtration Science</a></li>
              <li><a href="#nutrition" className="hover:text-[#FFFFFF] transition-colors">Verified Nutrition Panel</a></li>
              <li><a href="#faq" className="hover:text-[#FFFFFF] transition-colors">Questions & Answers</a></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#C99A65]">
              The Formulation Journal
            </h4>
            <p className="text-xs text-[#E9E4DB]/70 leading-relaxed">
              Receive early-batch harvest updates, nutritional whitepapers, and exclusive subscriber batch access.
            </p>

            {isSubscribed ? (
              <div className="p-3 bg-[#6D795B]/20 border border-[#6D795B] rounded-sm flex items-center gap-2 text-xs text-[#A7B39A]">
                <CheckCircle2 className="w-4 h-4 text-[#A7B39A]" />
                <span>You are subscribed to batch releases.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-[#2E302D] border border-[#484A45] rounded-sm text-[#F5F3EE] placeholder:text-[#6E706A] focus:outline-none focus:border-[#A7B39A]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#F5F3EE] text-[#20211F] rounded-sm text-xs font-semibold uppercase tracking-wider hover:bg-[#FFFFFF] transition-colors flex items-center gap-1"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
            <p className="text-[10px] text-[#6E706A]">
              We respect your inbox. Unsubscribe anytime with one click.
            </p>
          </div>
        </div>

        {/* Regulatory Disclaimer & Legal */}
        <div className="pt-8 border-t border-[#343532] space-y-4 text-[11px] text-[#6E706A] leading-relaxed">
          <p>
            * These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Product facts, ingredient specifications, and serving sizes reflect verified label declarations.
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2 border-t border-[#343532]/60">
            <p>© 2026 NATURAL PROTEIN Co. All rights reserved.</p>
            <div className="flex gap-6 text-xs text-[#A7B39A]">
              <Link href="#" className="hover:text-[#FFFFFF] transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-[#FFFFFF] transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-[#FFFFFF] transition-colors">Accessibility Statement</Link>
              <Link href="#" className="hover:text-[#FFFFFF] transition-colors">Carbon Certificate</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
