import { Product, ProductVariant } from "./types";
import { ASSETS } from "./assets";

export const BRAND_INFO = {
  name: "NATURAL PROTEIN",
  tagline: "Precision in Every Scoop",
  established: 2024,
  currency: "USD",
  currencySymbol: "$",
  freeShippingThreshold: 75,
  supportEmail: "concierge@naturalprotein.co",
  phone: "+1 (800) 480-NATL",
  announcement: "Complimentary Carbon-Neutral Shipping on Orders Above $75",
};

export const VARIANTS: ProductVariant[] = [
  {
    id: "np-choc-vanilla-960",
    name: "Chocolate & Vanilla Blend",
    flavor: "Chocolate & Vanilla Blend",
    weight: "960g • 30 Servings",
    servings: 30,
    price: 54,
    compareAtPrice: 62,
    inStock: true,
    sku: "NP-CV-960",
    colorHex: "#543D2B",
    image: ASSETS.images.lifestyleShake.src,
  },
  {
    id: "np-madagascar-vanilla-960",
    name: "Madagascar Vanilla Blend",
    flavor: "Madagascar Vanilla",
    weight: "960g • 30 Servings",
    servings: 30,
    price: 54,
    compareAtPrice: 62,
    inStock: true,
    sku: "NP-MV-960",
    colorHex: "#D8C7A5",
    image: ASSETS.images.studioTub.src,
  },
  {
    id: "np-dark-cacao-960",
    name: "Rich Dark Cacao",
    flavor: "Rich Dark Cacao",
    weight: "960g • 30 Servings",
    servings: 30,
    price: 54,
    compareAtPrice: 62,
    inStock: true,
    sku: "NP-DC-960",
    colorHex: "#3B281E",
    image: ASSETS.images.explodedTub.src,
  },
  {
    id: "np-pure-natural-960",
    name: "Pure Natural (Unflavored)",
    flavor: "Pure Natural",
    weight: "960g • 30 Servings",
    servings: 30,
    price: 52,
    compareAtPrice: 58,
    inStock: true,
    sku: "NP-PN-960",
    colorHex: "#E5DEC9",
    image: ASSETS.images.ingredientStill.src,
  },
  {
    id: "np-bundle-dual-1920",
    name: "Signature Duo (2 × 960g)",
    flavor: "Chocolate & Vanilla + Madagascar Vanilla",
    weight: "1,920g • 60 Servings",
    servings: 60,
    price: 98,
    compareAtPrice: 124,
    inStock: true,
    sku: "NP-DUO-1920",
    colorHex: "#6D795B",
    image: ASSETS.images.lifestyleShake.src,
  },
  {
    id: "np-starter-kit",
    name: "The Ritual Starter Kit",
    flavor: "Tub + Matte Thermal Shaker + Scoop",
    weight: "960g Canister + Vessel",
    servings: 30,
    price: 68,
    compareAtPrice: 84,
    inStock: true,
    sku: "NP-KIT-01",
    colorHex: "#20211F",
    image: ASSETS.images.studioTub.src,
  },
];

export const PRIMARY_PRODUCT: Product = {
  id: "natural-protein-blend",
  slug: "natural-protein-blend",
  name: "Natural Protein",
  subtitle: "Cold-Filtered Clean Formula",
  brand: "NATURAL PROTEIN",
  tagline: "Built Around Better Nutrition. Less Noise. More Clarity.",
  description:
    "An uncompromising protein crafted from micro-milled native protein, whole rolled oats, raw cacao, California almonds, and pure Madagascar vanilla bean. Formulated without synthetic gums, artificial fillers, or harsh sweeteners.",
  shortDescription:
    "26g pure protein per serving with zero added sugar, zero artificial gums, and 5 transparent whole-food ingredients.",
  basePrice: 54,
  currency: "USD",
  currencySymbol: "$",
  rating: 4.94,
  reviewCount: 382,
  images: {
    hero: ASSETS.images.studioTub.src,
    exploded: ASSETS.images.explodedTub.src,
    ingredients: ASSETS.images.ingredientStill.src,
    lifestyle: ASSETS.images.lifestyleShake.src,
  },
  variants: VARIANTS,
  nutritionFacts: {
    servingSize: "1 Scoop (32g)",
    servingsPerContainer: 30,
    calories: 130,
    proteinGrams: 26,
    items: [
      { nutrient: "Calories", amountPerServing: "130 kcal", amountPer100g: "406 kcal" },
      { nutrient: "Total Fat", amountPerServing: "1.5g", dailyValue: "2%", amountPer100g: "4.7g" },
      { nutrient: "Saturated Fat", amountPerServing: "0.4g", dailyValue: "2%", amountPer100g: "1.2g" },
      { nutrient: "Trans Fat", amountPerServing: "0g", dailyValue: "0%", amountPer100g: "0g" },
      { nutrient: "Cholesterol", amountPerServing: "12mg", dailyValue: "4%", amountPer100g: "38mg" },
      { nutrient: "Sodium", amountPerServing: "110mg", dailyValue: "5%", amountPer100g: "344mg" },
      { nutrient: "Total Carbohydrates", amountPerServing: "2.5g", dailyValue: "1%", amountPer100g: "7.8g" },
      { nutrient: "Dietary Fiber", amountPerServing: "1.2g", dailyValue: "4%", amountPer100g: "3.8g" },
      { nutrient: "Total Sugars", amountPerServing: "< 0.5g", dailyValue: "—", amountPer100g: "1.4g" },
      { nutrient: "Added Sugars", amountPerServing: "0g", dailyValue: "0%", amountPer100g: "0g" },
      { nutrient: "Protein", amountPerServing: "26g", dailyValue: "52%", amountPer100g: "81.2g" },
      { nutrient: "Calcium", amountPerServing: "140mg", dailyValue: "10%", amountPer100g: "438mg" },
      { nutrient: "Potassium", amountPerServing: "180mg", dailyValue: "4%", amountPer100g: "560mg" },
      { nutrient: "Iron", amountPerServing: "1.8mg", dailyValue: "10%", amountPer100g: "5.6mg" },
    ],
  },
  ingredients: [
    {
      id: "ing-protein",
      name: "Cold-Filtered Native Protein",
      role: "Primary Protein Core",
      source: "Grass-Fed, Cold-Filtered Micro-Isolate",
      tag: "26g Pure Protein",
      description:
        "Extracted at low temperatures to keep native peptide structures intact, delivering an optimal amino acid spectrum with rapid digestibility.",
      highlights: ["Native Bioactive Peptides", "Rapid Digestive Transit", "Complete EAA & BCAA Profile"],
    },
    {
      id: "ing-oats",
      name: "Stone-Ground Rolled Oats",
      role: "Complex Fiber & Texture",
      source: "Whole Non-GMO Scandinavian Oats",
      tag: "Beta-Glucan Fiber",
      description:
        "Finely stone-milled whole oats that provide silky mouthfeel and gentle slow-release complex carbohydrates without spikes.",
      highlights: ["Heart-Healthy Beta-Glucans", "Natural Satiety", "Zero Gritty Residue"],
    },
    {
      id: "ing-almonds",
      name: "California Sweet Almonds",
      role: "Healthy Lipids & Micronutrients",
      source: "Sun-Dried Sweet Almond Meal",
      tag: "Vitamin E & Minerals",
      description:
        "Cold-pressed almond meal providing subtle nutty warmth, natural vitamin E, and essential mono-unsaturated fatty acids.",
      highlights: ["Antioxidant Vitamin E", "Naturally Creamy Body", "Whole Food Lipids"],
    },
    {
      id: "ing-cacao",
      name: "Single-Origin Raw Cacao",
      role: "Flavor & Antioxidants",
      source: "Fair-Trade Organic Cacao",
      tag: "Flavanols & Polyphenols",
      description:
        "Unalkalized cacao beans ground at low temperature to preserve the full bouquet of natural chocolate aromas and polyphenols.",
      highlights: ["Rich Dark Aroma", "Zero Dutch Alkalization", "Cardiovascular Support"],
    },
    {
      id: "ing-vanilla",
      name: "Madagascar Bourbon Vanilla Bean",
      role: "Aromatic Depth & Harmony",
      source: "Pure Cured Vanilla Pods",
      tag: "Whole Ground Pods",
      description:
        "Visible real vanilla bean flecks delivering round, warm floral notes that balance raw cacao without synthetic vanillin.",
      highlights: ["Real Whole Bean Flecks", "Subtle Natural Sweetness", "No Vanillin Synthetics"],
    },
    {
      id: "ing-sea-salt",
      name: "Trace Mineral Sea Salt & Monk Fruit",
      role: "Electrolytes & Balanced Finish",
      source: "Evaporated Sea Salt & Monk Fruit Extract",
      tag: "Zero Glycemic",
      description:
        "A delicate touch of mineral-dense sea salt to enhance natural cocoa notes, paired with plant-derived monk fruit.",
      highlights: ["Natural Trace Minerals", "Zero Insulin Spike", "Clean Lingering Finish"],
    },
  ],
  preparationSteps: [
    {
      step: 1,
      title: "Measure",
      instruction: "Add 1 level scoop (32g) using the included matte precision scoop.",
      detail: "Scoop comes seated inside the freshness seal.",
      metric: "32g / 1 Scoop",
    },
    {
      step: 2,
      title: "Pour Liquid",
      instruction: "Pour 250ml to 300ml of cold water, oat milk, or almond milk.",
      detail: "Cold liquids yield the crispest, most refreshing shake texture.",
      metric: "250 - 300ml",
    },
    {
      step: 3,
      title: "Shake Firmly",
      instruction: "Secure the cap and shake vigorously for 15 seconds.",
      detail: "Our micro-milled powder dissolves without clumps or wire whisks.",
      metric: "15 Seconds",
    },
    {
      step: 4,
      title: "Enjoy Daily",
      instruction: "Sip within 20 minutes of training or enjoy as an afternoon ritual.",
      detail: "Silky, light, and completely easy on your stomach.",
      metric: "Daily Routine",
    },
  ],
  allergens: ["Contains Milk (Cold-Filtered Native Whey) and Tree Nuts (Almonds). Produced in a dedicated cGMP facility."],
  certifications: [
    "Informed Choice Tested",
    "Non-GMO Verified Ingredients",
    "cGMP Certified Manufacturing",
    "Carbon Neutral Packaging",
  ],
  storageInstructions:
    "Store in a cool, dry environment away from direct sunlight. Seal airtight with the twist cap after each use.",
};

export const PHILOSOPHY_PILLARS = [
  {
    number: "01",
    title: "Radical Transparency",
    description:
      "Every single ingredient is named with its precise botanical or nutritional origin. No proprietary blends, no hidden flavor masks, and zero industrial fillers.",
  },
  {
    number: "02",
    title: "Cold-Filtered Precision",
    description:
      "We avoid harsh acid washes and high-heat drying. Our low-temperature filtration preserves delicate peptide structures for rapid, comfortable digestion.",
  },
  {
    number: "03",
    title: "Zero Industrial Gums",
    description:
      "No xanthan gum, guar gum, carrageenan, or soy lecithin. We achieve a naturally silky texture using fine stone-ground oats and sweet almond flour.",
  },
  {
    number: "04",
    title: "Everyday Usability",
    description:
      "Formulated to dissolve effortlessly in cold liquids in 15 seconds. Tastes like real cacao and vanilla, not a laboratory confection.",
  },
];

export const FAQS = [
  {
    question: "How does Natural Protein differ from conventional gym protein powders?",
    answer:
      "Conventional supplements frequently rely on synthetic gums (xanthan, guar) to create artificial thickness, heavy artificial sweeteners (sucralose, acesulfame-K) to mask bitter ingredients, and cheap fillers. Natural Protein uses 5 transparent whole-food ingredients: cold-filtered protein, stone-ground oats, California almonds, real raw cacao, and authentic Madagascar vanilla bean. It provides 26g of pure protein with zero bloating and no chalky aftertaste.",
  },
  {
    question: "When is the optimal time to consume Natural Protein?",
    answer:
      "Natural Protein is versatile: take it within 45 minutes post-workout to accelerate muscle recovery and glycogen synthesis, blend it into a breakfast smoothie with oats and berries, or take it as an afternoon clean protein boost to curb hunger.",
  },
  {
    question: "Are the containers recyclable?",
    answer:
      "Yes. Our matte canisters are engineered from 100% recyclable, food-grade materials with an aluminum freshness seal. We offset all transit emissions through verified carbon-reduction projects.",
  },
  {
    question: "What is your shipping and return policy?",
    answer:
      "Orders ship carbon-neutral within 24 hours. We offer complimentary shipping on all orders over $75. If you are not satisfied with your experience, contact concierge@naturalprotein.co within 30 days for an effortless refund.",
  },
];
