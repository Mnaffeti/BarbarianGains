import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const averageRating = product.reviews.length > 0
    ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
    : 0;

  return (
    <Card className="flex flex-col h-full overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`} className="block aspect-square relative">
          <Image
            src={product.imageUrl}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="hover:scale-105 transition-transform duration-300"
            data-ai-hint={product.dataAiHint}
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-headline mb-1">
          <Link href={`/products/${product.id}`} className="hover:text-primary transition-colors">
            {product.name}
          </Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
        {product.reviews.length > 0 && (
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.round(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
              />
            ))}
            <span className="ml-2 text-xs text-muted-foreground">({product.reviews.length} reviews)</span>
          </div>
        )}
        <p className="text-sm text-foreground line-clamp-2 mb-2">{product.description}</p>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center border-t">
        <p className="text-xl font-headline font-semibold text-primary">${product.price.toFixed(2)}</p>
        <Link href={`/products/${product.id}`}>
          <Button size="sm">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
