
"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/shared/PageHeader';
import ProductTable from '@/components/admin/ProductTable';
import { getNutritionProducts } from '@/lib/firebase/firestore';
import type { NutritionProduct } from '@/lib/types';
import { PlusCircle, Loader2, AlertTriangle } from 'lucide-react';

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<NutritionProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedProducts = await getNutritionProducts();
      setProducts(fetchedProducts);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try refreshing the page.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleProductDeleted = () => {
    fetchProducts(); // Re-fetch products after one is deleted
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader
          title="Admin Dashboard"
          subtitle="Manage your nutrition products."
          className="mb-0 text-left"
        />
        <Link href="/admin/products/new">
          <Button>
            <PlusCircle className="mr-2 h-5 w-5" />
            Add New Product
          </Button>
        </Link>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="ml-4 text-lg">Loading products...</p>
        </div>
      )}

      {error && !loading && (
        <div className="text-center py-10 bg-destructive/10 p-6 rounded-md">
          <AlertTriangle className="mx-auto h-12 w-12 text-destructive mb-4" />
          <h3 className="text-xl font-semibold text-destructive mb-2">Error Loading Products</h3>
          <p className="text-destructive/80 mb-4">{error}</p>
          <Button onClick={fetchProducts} variant="outline">Try Again</Button>
        </div>
      )}

      {!loading && !error && (
        <ProductTable products={products} onProductDeleted={handleProductDeleted} />
      )}
    </div>
  );
}
