"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X, Search, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { BRAND_INFO, VARIANTS } from "@/lib/data";

export function Header() {
  const { totalQuantity, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Shop", href: "#collection" },
    { name: "Our Approach", href: "#philosophy" },
    { name: "Science", href: "#science" },
    { name: "Ingredients", href: "#ingredients" },
    { name: "Preparation", href: "#preparation" },
    { name: "Flavors", href: "#flavors" },
    { name: "Nutrition", href: "#nutrition" },
    { name: "FAQ", href: "#faq" },
  ];

  const filteredVariants = searchQuery.trim()
    ? VARIANTS.filter(
        (v) =>
          v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.flavor.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      {/* Announcement Bar */}
      <aside aria-label="Announcement" className="bg-[#20211F] text-[#F5F3EE] text-[11px] uppercase tracking-widest py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3 h-3 text-[#C99A65]" />
        <span>{BRAND_INFO.announcement}</span>
      </aside>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#F5F3EE]/95 backdrop-blur-md shadow-xs border-b border-[#DCD9D1]/70 py-3.5"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Wordmark */}
          <Link
            href="/"
            className="flex flex-col group cursor-pointer focus:outline-none"
            aria-label="NATURAL PROTEIN Home"
          >
            <span className="font-editorial text-xl sm:text-2xl font-bold tracking-tight text-[#20211F]">
              NATURAL PROTEIN
            </span>
            <span className="text-[9px] uppercase tracking-widest text-[#6E706A] -mt-1 font-sans">
              Precision Nutrition
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-wider font-medium text-[#6E706A] hover:text-[#20211F] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#20211F] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions: Search & Cart */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-[#20211F] hover:bg-[#E9E4DB] rounded-full transition-colors"
              aria-label="Search formulas"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Shopping Bag Trigger */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 px-3.5 py-1.5 bg-[#20211F] text-[#F5F3EE] rounded-sm hover:bg-[#343532] transition-colors shadow-xs"
              aria-label={`Shopping Bag, ${totalQuantity} items`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#F5F3EE]" />
              <span className="text-xs font-semibold tracking-wider uppercase hidden sm:inline">
                Bag
              </span>
              <span className="text-xs font-bold bg-[#6D795B] text-[#FFFFFF] w-4 h-4 rounded-full flex items-center justify-center -mr-1">
                {totalQuantity}
              </span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#20211F] hover:bg-[#E9E4DB] rounded-full transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#F5F3EE] border-b border-[#DCD9D1] px-6 py-6 shadow-xl space-y-4 animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm uppercase tracking-wider font-medium text-[#20211F] py-2 border-b border-[#DCD9D1]/50 flex justify-between items-center"
                >
                  <span>{link.name}</span>
                  <span className="text-[#6E706A] text-xs">→</span>
                </a>
              ))}
            </nav>
            <div className="pt-2">
              <a
                href="#collection"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-3 text-center bg-[#20211F] text-[#F5F3EE] text-xs uppercase tracking-widest font-semibold rounded-sm"
              >
                Shop All Formulations
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Quick Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-[#20211F]/50 backdrop-blur-xs flex items-start justify-center pt-20 px-4">
          <div className="w-full max-w-lg bg-[#FFFFFF] rounded-sm shadow-2xl border border-[#DCD9D1] overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#DCD9D1] pb-3">
              <div className="flex items-center gap-2 text-[#20211F] flex-1">
                <Search className="w-4 h-4 text-[#6E706A]" />
                <input
                  type="text"
                  placeholder="Search flavors, blends, or ingredients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full text-sm outline-none placeholder:text-[#6E706A] text-[#20211F]"
                />
              </div>
              <button
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                }}
                className="p-1 text-[#6E706A] hover:text-[#20211F]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {searchQuery.trim() !== "" && (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {filteredVariants.length === 0 ? (
                  <p className="text-xs text-[#6E706A] py-3 text-center">
                    No results found for &ldquo;{searchQuery}&rdquo;. Try &ldquo;Vanilla&rdquo; or &ldquo;Cacao&rdquo;.
                  </p>
                ) : (
                  filteredVariants.map((v) => (
                    <a
                      key={v.id}
                      href="#collection"
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center justify-between p-2 rounded-xs hover:bg-[#F5F3EE] transition-colors text-xs text-[#20211F]"
                    >
                      <span className="font-medium">{v.name}</span>
                      <span className="text-[#6E706A]">${v.price.toFixed(2)}</span>
                    </a>
                  ))
                )}
              </div>
            )}

            <div className="pt-2 border-t border-[#DCD9D1]/50 flex justify-between text-[11px] text-[#6E706A]">
              <span>Quick tags: Chocolate & Vanilla • Vanilla • Cacao • Unflavored</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
