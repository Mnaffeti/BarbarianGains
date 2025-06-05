
import type { Timestamp } from 'firebase/firestore';

export type Product = {
  id: string;
  name: string;
  category: 'Protein' | 'Creatine' | 'Pre-workout' | 'Vitamins' | 'Other';
  goal: 'Build Muscle' | 'Lose Weight' | 'Endurance' | 'General Health' | 'Recovery';
  dietaryNeeds?: ('Vegan' | 'Gluten-Free' | 'Dairy-Free')[];
  brand: string;
  price: number;
  imageUrl: string;
  dataAiHint?: string;
  description: string;
  longDescription?: string;
  nutritionLabelUrl?: string;
  usageInstructions: string;
  reviews: { rating: number; text: string; author: string; date: string }[];
  stock: number;
  sku: string;
  nutrientValues?: { name: string; value: string }[];
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  dataAiHint?: string;
  author: string;
  date: string;
  category: string;
  content: string; // Markdown or HTML string
};

export type CartItem = Product & {
  quantity: number;
};

// New type for Firestore-based Nutrition Products
export type NutritionInfo = {
  calories: number;
  protein: number; // grams
  carbs: number;   // grams
  fat: number;     // grams
};

export type NutritionProduct = {
  id?: string; // Firestore document ID
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  nutrition: NutritionInfo;
};

export type Note = {
  id?: string;
  text: string;
  createdAt: Timestamp;
};
