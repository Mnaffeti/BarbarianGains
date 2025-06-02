
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { getProductById } from '@/lib/data';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Minus, Plus, ShoppingCart, Info } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import { useToast } from "@/hooks/use-toast";
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function ProductDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      const fetchedProduct = getProductById(id);
      setProduct(fetchedProduct || null); // Set product or null if not found
      setIsLoading(false);
    }
    // If id is not yet available, isLoading remains true, which is correct.
    // The effect runs again when id becomes available.
  }, [id]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><p>Loading product details...</p></div>;
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <PageHeader title="Product Not Found" subtitle="We couldn't find the product you're looking for." />
        <Link href="/products">
            <Button variant="outline">Back to Products</Button>
        </Link>
      </div>
    );
  }
  
  const averageRating = product.reviews.length > 0
    ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
    : 0;

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.name} to cart.`);
    toast({
      title: "Added to Cart!",
      description: `${quantity} x ${product.name} has been added to your cart.`,
    });
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-12">
        {/* Product Image Gallery */}
        <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{objectFit: 'cover'}}
            data-ai-hint={product.dataAiHint}
            priority // Consider adding priority for LCP images
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl lg:text-4xl font-headline font-bold">{product.name}</h1>
          <p className="text-sm text-muted-foreground">Brand: {product.brand}</p>
          
          {product.reviews.length > 0 && (
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.round(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                />
              ))}
              <span className="ml-2 text-sm text-muted-foreground">({product.reviews.length} reviews)</span>
            </div>
          )}

          <p className="text-2xl font-headline font-semibold text-primary">{product.price.toFixed(2)} TND</p>
          <p className="text-foreground/80 leading-relaxed">{product.description}</p>

          {product.dietaryNeeds && product.dietaryNeeds.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.dietaryNeeds.map(need => (
                <span key={need} className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-full">{need}</span>
              ))}
            </div>
          )}
          
          <div className="flex items-center space-x-4">
            <Label htmlFor="quantity" className="text-sm font-medium">Quantity:</Label>
            <div className="flex items-center border rounded-md">
              <Button variant="ghost" size="icon" onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={quantity <= 1}>
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 h-10 text-center border-0 focus-visible:ring-0"
                min="1"
              />
              <Button variant="ghost" size="icon" onClick={() => setQuantity(q => q + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button size="lg" className="w-full md:w-auto" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
          </Button>
          <p className="text-sm text-muted-foreground">Stock: {product.stock > 0 ? `${product.stock} units available` : 'Out of Stock'}</p>
        </div>
      </div>

      {/* Nutrient Values Card */}
      {product.nutrientValues && product.nutrientValues.length > 0 && (
        <Card className="mb-12 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-headline flex items-center">
              <Info className="mr-2 h-5 w-5 text-primary" />
              Key Nutrient Values
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {product.nutrientValues.map((nutrient, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="text-foreground/80">{nutrient.name}:</span>
                <span className="font-medium text-foreground">{nutrient.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Product Details Tabs */}
      <div className="mt-12 lg:mt-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
            <TabsTrigger value="description">Full Description</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition Label</TabsTrigger>
            <TabsTrigger value="usage">Usage Instructions</TabsTrigger>
            <TabsTrigger value="reviews">Customer Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="prose prose-sm sm:prose-base max-w-none p-4 border rounded-lg bg-card">
            <p>{product.longDescription || product.description}</p>
          </TabsContent>
          <TabsContent value="nutrition" className="p-4 border rounded-lg bg-card">
            {product.nutritionLabelUrl ? (
              <Image src={product.nutritionLabelUrl} alt={`${product.name} Nutrition Label`} width={400} height={600} className="mx-auto rounded" data-ai-hint="nutrition facts label" />
            ) : (
              <p>Nutrition information not available.</p>
            )}
          </TabsContent>
          <TabsContent value="usage" className="prose prose-sm sm:prose-base max-w-none p-4 border rounded-lg bg-card">
            <p>{product.usageInstructions}</p>
          </TabsContent>
          <TabsContent value="reviews" className="p-4 border rounded-lg bg-card">
            <h3 className="text-xl font-headline mb-6">Customer Reviews</h3>
            {product.reviews.length > 0 ? (
              <div className="space-y-6">
                {product.reviews.map((review, index) => (
                  <Card key={index} className="bg-background p-4">
                    <CardContent className="p-0">
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                        ))}
                        <p className="ml-auto text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</p>
                      </div>
                      <p className="font-semibold text-sm mb-1">{review.author}</p>
                      <p className="text-sm text-foreground/80">{review.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p>No reviews yet for this product.</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

    