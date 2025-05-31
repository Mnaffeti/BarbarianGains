import type { Product, Article } from './types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Whey Protein Isolate',
    category: 'Protein',
    goal: 'Build Muscle',
    dietaryNeeds: ['Gluten-Free'],
    brand: 'SwissNutrition',
    price: 49.99,
    imageUrl: 'https://placehold.co/600x600.png',
    dataAiHint: 'protein powder fitness',
    description: 'Ultra-pure whey protein isolate for rapid muscle recovery and growth.',
    longDescription: 'Our Whey Protein Isolate is sourced from grass-fed cows and micro-filtered to provide the highest protein content with minimal carbs and fats. Perfect for post-workout recovery or supplementing your daily protein intake.',
    nutritionLabelUrl: 'https://placehold.co/400x600.png',
    usageInstructions: 'Mix 1 scoop with 6-8 oz of water or milk. Consume post-workout or as needed.',
    reviews: [
      { rating: 5, text: 'Mixes great, tastes amazing!', author: 'John D.', date: '2023-05-10' },
      { rating: 4, text: 'Good quality protein, a bit pricey.', author: 'Jane S.', date: '2023-05-15' },
    ],
    stock: 100,
    sku: 'SWISS-WPI-001',
  },
  {
    id: '2',
    name: 'Creatine Monohydrate',
    category: 'Creatine',
    goal: 'Build Muscle',
    brand: 'PeakPerformance',
    price: 29.99,
    imageUrl: 'https://placehold.co/600x600.png',
    dataAiHint: 'creatine supplement gym',
    description: 'Micronized creatine monohydrate for increased strength and power.',
    longDescription: 'Boost your performance with our pure micronized Creatine Monohydrate. Proven to increase strength, power, and muscle mass. Unflavored for easy mixing.',
    usageInstructions: 'Take 5g daily. Mix with water or your favorite beverage.',
    reviews: [
      { rating: 5, text: 'Noticeable strength gains!', author: 'Mike P.', date: '2023-06-01' },
    ],
    stock: 150,
    sku: 'PEAK-CM-002',
  },
  {
    id: '3',
    name: 'Explosive Pre-Workout',
    category: 'Pre-workout',
    goal: 'Endurance',
    brand: 'AlphaFuel',
    price: 39.99,
    imageUrl: 'https://placehold.co/600x600.png',
    dataAiHint: 'preworkout energy drink',
    description: 'Ignite your workouts with intense energy and focus.',
    longDescription: 'Our Explosive Pre-Workout formula combines proven ingredients to deliver unmatched energy, focus, and endurance. Crush your personal bests and push your limits further than ever before.',
    usageInstructions: 'Mix 1 scoop with 8-10 oz of water 20-30 minutes before training.',
    reviews: [
      { rating: 5, text: 'Best pre-workout I have ever used!', author: 'Sarah L.', date: '2023-04-20' },
      { rating: 4, text: 'Gives a good pump, but the flavor is okay.', author: 'Chris B.', date: '2023-05-05' },
    ],
    stock: 80,
    sku: 'ALPHA-PRE-003',
  },
  {
    id: '4',
    name: 'Vegan Protein Blend',
    category: 'Protein',
    goal: 'Build Muscle',
    dietaryNeeds: ['Vegan', 'Dairy-Free', 'Gluten-Free'],
    brand: 'PlantStrong',
    price: 44.99,
    imageUrl: 'https://placehold.co/600x600.png',
    dataAiHint: 'vegan protein plants',
    description: 'A smooth and delicious plant-based protein powder.',
    longDescription: 'Our Vegan Protein Blend combines pea, rice, and pumpkin seed protein for a complete amino acid profile. Smooth, delicious, and easy to digest. Perfect for vegans and those with dairy sensitivities.',
    usageInstructions: 'Mix 1 scoop with 8-10 oz of water or plant-based milk.',
    reviews: [
       { rating: 5, text: 'Finally, a vegan protein that tastes good!', author: 'Emily R.', date: '2023-07-01' },
    ],
    stock: 70,
    sku: 'PLANT-VPRO-004',
  },
  {
    id: '5',
    name: 'Daily Multivitamin',
    category: 'Vitamins',
    goal: 'General Health',
    brand: 'SwissNutrition',
    price: 19.99,
    imageUrl: 'https://placehold.co/600x600.png',
    dataAiHint: 'multivitamin bottle pills',
    description: 'Comprehensive multivitamin for overall health and wellness.',
    longDescription: 'Support your overall health with our Daily Multivitamin. Packed with essential vitamins and minerals to fill nutritional gaps and support energy levels, immune function, and more.',
    usageInstructions: 'Take 1 tablet daily with a meal.',
    reviews: [],
    stock: 200,
    sku: 'SWISS-MULTI-005',
  },
];

export const mockArticles: Article[] = [
  {
    slug: 'benefits-of-creatine',
    title: 'The Top 5 Benefits of Creatine Monohydrate',
    excerpt: 'Discover how creatine can boost your strength, power, and muscle growth. A deep dive into the science-backed benefits...',
    imageUrl: 'https://placehold.co/800x400.png',
    dataAiHint: 'creatine athlete muscle',
    author: 'Dr. Fitness Expert',
    date: '2023-07-15',
    category: 'Supplements',
    content: `
      <p class="mb-4">Creatine monohydrate is one of the most researched and effective supplements available today. It's known for its ability to enhance performance and support muscle growth. Here are its top benefits:</p>
      <h3 class="text-xl font-headline mt-6 mb-2">1. Increased Muscle Strength and Power</h3>
      <p class="mb-4">Creatine helps your muscles produce more ATP, the primary energy currency of the cell. This leads to significant improvements in strength and power output during high-intensity exercise.</p>
      <h3 class="text-xl font-headline mt-6 mb-2">2. Enhanced Muscle Growth</h3>
      <p class="mb-4">By enabling you to lift heavier and perform more reps, creatine can stimulate greater muscle protein synthesis, leading to increased muscle mass over time.</p>
      <h3 class="text-xl font-headline mt-6 mb-2">3. Improved Exercise Performance</h3>
      <p class="mb-4">Athletes in various sports, from weightlifting to sprinting, can benefit from creatine's ability to improve performance in short bursts of intense activity.</p>
      <h3 class="text-xl font-headline mt-6 mb-2">4. Supports Brain Health</h3>
      <p class="mb-4">Emerging research suggests creatine may also have cognitive benefits, supporting brain health and function, especially in vegetarians or older adults.</p>
      <h3 class="text-xl font-headline mt-6 mb-2">5. Safe and Well-Tolerated</h3>
      <p class="mb-4">Creatine is one of the safest supplements on the market when used as directed. It has been extensively studied with a strong safety profile.</p>
      <p class="mt-6">Incorporating creatine into your supplement regimen can be a game-changer for achieving your fitness goals. Always consult with a healthcare professional before starting any new supplement.</p>
    `,
  },
  {
    slug: 'protein-timing-for-muscle-growth',
    title: 'Protein Timing: When is the Best Time to Take Protein?',
    excerpt: 'Unlock the secrets of protein timing to maximize muscle repair and growth. We break down the anabolic window and more.',
    imageUrl: 'https://placehold.co/800x400.png',
    dataAiHint: 'protein shake gym workout',
    author: 'Nutritionist Pro',
    date: '2023-06-28',
    category: 'Nutrition',
    content: `
      <p class="mb-4">Protein is essential for muscle repair and growth, but does timing matter? Let's explore the science.</p>
      <h3 class="text-xl font-headline mt-6 mb-2">The Anabolic Window Myth</h3>
      <p class="mb-4">The "anabolic window" theory suggests a short period post-workout where protein intake is crucial. While consuming protein after exercise is beneficial, the window is likely much wider than previously thought.</p>
      <h3 class="text-xl font-headline mt-6 mb-2">Total Daily Protein Intake is Key</h3>
      <p class="mb-4">Research indicates that total daily protein intake spread throughout the day is more important than precise timing around workouts for most individuals.</p>
      <h3 class="text-xl font-headline mt-6 mb-2">Pre-Workout Protein</h3>
      <p class="mb-4">Consuming protein before a workout can also be beneficial, providing amino acids to your muscles during exercise.</p>
      <h3 class="text-xl font-headline mt-6 mb-2">Post-Workout Protein</h3>
      <p class="mb-4">A post-workout protein meal or shake can aid recovery and stimulate muscle protein synthesis, but it doesn't need to be immediate.</p>
      <p class="mt-6">Focus on consistent protein intake throughout the day, aiming for high-quality sources at each meal, rather than stressing over exact timing.</p>
    `,
  },
];

export const getProductById = (id: string): Product | undefined => mockProducts.find(p => p.id === id);
export const getArticleBySlug = (slug: string): Article | undefined => mockArticles.find(a => a.slug === slug);
