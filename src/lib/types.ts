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
