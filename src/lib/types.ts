export interface ProductVariant {
  id: string;
  name: string;
  flavor: string;
  weight: string;
  servings: number;
  price: number;
  compareAtPrice?: number;
  inStock: boolean;
  sku: string;
  colorHex: string;
  image: string;
}

export interface NutritionFact {
  nutrient: string;
  amountPerServing: string;
  dailyValue?: string;
  amountPer100g?: string;
}

export interface IngredientItem {
  id: string;
  name: string;
  role: string;
  source: string;
  description: string;
  tag: string;
  highlights: string[];
}

export interface PreparationStep {
  step: number;
  title: string;
  instruction: string;
  detail: string;
  metric: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  brand: string;
  tagline: string;
  description: string;
  shortDescription: string;
  basePrice: number;
  currency: string;
  currencySymbol: string;
  rating: number;
  reviewCount: number;
  images: {
    hero: string;
    exploded: string;
    ingredients: string;
    lifestyle: string;
  };
  variants: ProductVariant[];
  nutritionFacts: {
    servingSize: string;
    servingsPerContainer: number;
    calories: number;
    proteinGrams: number;
    items: NutritionFact[];
  };
  ingredients: IngredientItem[];
  preparationSteps: PreparationStep[];
  allergens: string[];
  certifications: string[];
  storageInstructions: string;
}

export interface CartItem {
  productId: string;
  variantId: string;
  productName: string;
  flavor: string;
  weight: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  subtotal: number;
  totalQuantity: number;
}
