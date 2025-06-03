
"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ProductForm, { ProductFormValues } from '@/components/admin/ProductForm';
import PageHeader from '@/components/shared/PageHeader';
import { getNutritionProductById, updateNutritionProduct } from '@/lib/firebase/firestore';
import type { NutritionProduct } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Loader2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.productId as string;
  const { toast } = useToast();

  const [product, setProduct] = useState<NutritionProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        setLoading(true);
        setError(null);
        try {
          const fetchedProduct = await getNutritionProductById(productId);
          if (fetchedProduct) {
            setProduct(fetchedProduct);
          } else {
            setError("Product not found.");
          }
        } catch (err) {
          console.error("Error fetching product:", err);
          setError("Failed to load product data. Please try again.");
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [productId]);

  const handleUpdateProduct = async (data: ProductFormValues) => {
    if (!productId) return;
    setIsSubmitting(true);
    try {
      await updateNutritionProduct(productId, data);
      toast({
        title: "Product Updated",
        description: `${data.name} has been successfully updated.`,
      });
      router.push('/admin');
      router.refresh(); 
    } catch (error) {
      console.error("Error updating product:", error);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "Could not update the product. Please try again.",
      });
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg">Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <AlertTriangle className="mx-auto h-16 w-16 text-destructive mb-4" />
        <PageHeader title="Error Loading Product" subtitle={error} />
        <Link href="/admin">
          <Button variant="outline">Back to Admin Dashboard</Button>
        </Link>
      </div>
    );
  }
  
  if (!product) {
     return ( // Should ideally be caught by error state, but as a fallback
      <div className="text-center py-10">
        <PageHeader title="Product Not Found" />
         <Link href="/admin"><Button variant="outline">Back to Admin Dashboard</Button></Link>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Edit Nutrition Product" />
      <ProductForm
        onSubmit={handleUpdateProduct}
        initialData={product}
        isSubmitting={isSubmitting}
        submitButtonText="Update Product"
      />
    </div>
  );
}
