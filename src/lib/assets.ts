/**
 * Centralized Asset Manifest
 * Verified against real files in /public/videos and /public/images.
 * Every video has a corresponding image poster to guarantee fast LCP and zero layout shift.
 */

export interface VideoAsset {
  src: string;
  poster: string;
  title: string;
  description: string;
  aspectRatio: string;
}

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const ASSETS = {
  videos: {
    hero: {
      src: "/videos/video-1.mp4",
      poster: "/images/image-2.jpg",
      title: "Natural Protein Exploded View",
      description: "Exploded view of the canister, scoop, powder column, and freshness seal.",
      aspectRatio: "16/9",
    },
    powderMacro: {
      src: "/videos/video-2.mp4",
      poster: "/images/image-1.jpg",
      title: "Micro-milled Protein Powder Texture",
      description: "Rising powder macro highlighting fine solubility and aeration.",
      aspectRatio: "16/9",
    },
    ingredients: {
      src: "/videos/video-3.mp4",
      poster: "/images/image-3.jpg",
      title: "Ingredient Constellation",
      description: "Whole whole-food ingredients separating and grouping naturally.",
      aspectRatio: "16/9",
    },
    preparation: {
      src: "/videos/video-4.mp4",
      poster: "/images/image-4.jpg",
      title: "Preparation Sequence",
      description: "Scoop, liquid addition, and bottle shaking sequence.",
      aspectRatio: "16/9",
    },
    texture: {
      src: "/videos/video-5.mp4",
      poster: "/images/image-4.jpg",
      title: "Swirling Shake Texture",
      description: "Velvety liquid swirl demonstrating silky mouthfeel without gum thickening.",
      aspectRatio: "16/9",
    },
    collection: {
      src: "/videos/video-6.mp4",
      poster: "/images/image-1.jpg",
      title: "Product Collection Reveal",
      description: "Full brand range reveal and packaging presentation.",
      aspectRatio: "16/9",
    },
  },
  images: {
    studioTub: {
      src: "/images/image-1.jpg",
      alt: "Natural Protein matte charcoal canister with ergonomic scoop and fine powder on studio table",
      width: 1366,
      height: 768,
    },
    explodedTub: {
      src: "/images/image-2.jpg",
      alt: "Exploded view of Natural Protein canister, scoop, seal, and powder column",
      width: 1366,
      height: 768,
    },
    ingredientStill: {
      src: "/images/image-3.jpg",
      alt: "Clean ingredient layout featuring pure protein, rolled oats, California almonds, cacao beans, and vanilla beans",
      width: 1366,
      height: 768,
    },
    lifestyleShake: {
      src: "/images/image-4.jpg",
      alt: "Natural Protein Chocolate & Vanilla Blend canister with frosted glass shake, vanilla pods, and cacao beans",
      width: 1366,
      height: 768,
    },
  },
} as const;
