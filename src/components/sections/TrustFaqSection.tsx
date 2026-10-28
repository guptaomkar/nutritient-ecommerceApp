"use client";

import React, { useState } from "react";
import { FAQS } from "@/lib/data";
import { ChevronDown, BookOpen, HelpCircle } from "lucide-react";

export function TrustFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const educationalGuides = [
    {
      title: "How to Read a Protein Supplement Label",
      summary:
        "Check the protein-to-scoop ratio. If a 40g scoop only provides 20g of protein, 50% of that powder consists of maltodextrin, gums, or chemical fillers. Natural Protein provides 26g of pure protein in a 32g scoop (over 81% pure density).",
    },
    {
      title: "Why Zero Added Gums Matter for Digestion",
      summary:
        "Industrial emulsifiers like xanthan gum, guar gum, and carrageenan are used to artificially thicken cheap powders, often leading to GI distress and bloating. We achieve a naturally silky mouthfeel using stone-ground oat flour and almond meal.",
    },
    {
      title: "Cold-Filtration vs. Acid Ion-Exchange",
      summary:
        "Many commercial isolates use high-temperature acid washes that denature fragile immunoglobulins and growth peptides. Our gentle cross-flow microfiltration operates below 10°C, ensuring maximum biological value.",
    },
  ];

  return (
    <section id="faq" className="py-24 lg:py-32 bg-[#F5F3EE] border-b border-[#DCD9D1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6D795B]">
            Section 12 • Trust, Science & Inquiries
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl font-medium tracking-tight text-[#20211F]">
            Transparent Education. Honest Answers.
          </h2>
          <p className="text-sm text-[#6E706A] leading-relaxed">
            We believe an informed customer makes the healthiest choices. Explore our consumer guide to protein evaluation and read common questions.
          </p>
        </div>

        {/* 3 Educational Guides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {educationalGuides.map((guide, i) => (
            <div
              key={i}
              className="p-6 bg-[#FFFFFF] rounded-sm border border-[#DCD9D1] shadow-natural space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-8 h-8 rounded-full bg-[#E9E4DB] flex items-center justify-center text-[#20211F]">
                  <BookOpen className="w-4 h-4 text-[#6D795B]" />
                </div>
                <h3 className="font-editorial text-lg font-semibold text-[#20211F]">
                  {guide.title}
                </h3>
                <p className="text-xs text-[#6E706A] leading-relaxed">
                  {guide.summary}
                </p>
              </div>
              <span className="text-[11px] font-semibold text-[#6D795B] uppercase tracking-wider block pt-2">
                Nutritional Standard 0{i + 1}
              </span>
            </div>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-4 pt-8">
          <div className="flex items-center gap-2 border-b border-[#DCD9D1] pb-3">
            <HelpCircle className="w-4 h-4 text-[#6D795B]" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#20211F]">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="divide-y divide-[#DCD9D1] border border-[#DCD9D1] rounded-sm bg-[#FFFFFF] overflow-hidden">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="transition-colors">
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full p-5 text-left flex justify-between items-center gap-4 hover:bg-[#F5F3EE] transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-semibold text-[#20211F]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#6E706A] shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#20211F]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-[#6E706A] leading-relaxed animate-in fade-in-50 duration-150">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
