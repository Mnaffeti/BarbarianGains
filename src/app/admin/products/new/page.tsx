
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductForm, { ProductFormValues } from '@/components/admin/ProductForm';
import PageHeader from '@/components/shared/PageHeader';
import { addNutritionProduct } from '@/lib/firebase/firestore';
import { useToast } from '@/hooks/use-toast';

export default function NewProductPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateProduct = async (data: ProductFormValues) => {
    setIsSubmitting(true);
    try {
      await addNutritionProduct(data);
      toast({
        title: "Product Created",
        description: `${data.name} has been successfully added.`,
      });
      router.push('/admin'); // Redirect to admin dashboard
      router.refresh(); // Force refresh of the admin page to show new product
    } catch (error) {
      console.error("Error creating product:", error);
      toast({
        variant: "destructive",
        title: "Creation Failed",
        description: "Could not create the product. Please try again.",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <PageHeader title="Add New Nutrition Product" />
      <ProductForm
        onSubmit={handleCreateProduct}
        isSubmitting={isSubmitting}
        submitButtonText="Create Product"
      />
    </div>
  );
}
