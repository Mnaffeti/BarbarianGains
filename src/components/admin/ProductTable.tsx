
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit, Trash2, Eye } from 'lucide-react';
import type { NutritionProduct } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { deleteNutritionProduct } from '@/lib/firebase/firestore';
import { useState } from 'react';

interface ProductTableProps {
  products: NutritionProduct[];
  onProductDeleted: () => void; // Callback to refresh product list
}

export default function ProductTable({ products, onProductDeleted }: ProductTableProps) {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState<string | null>(null); // Store ID of product being deleted

  const handleDelete = async (productId: string, productName: string) => {
    if (!productId) return;
    setIsDeleting(productId);
    try {
      await deleteNutritionProduct(productId);
      toast({
        title: "Product Deleted",
        description: `${productName} has been successfully deleted.`,
      });
      onProductDeleted(); // Trigger refresh
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        variant: "destructive",
        title: "Deletion Failed",
        description: `Could not delete ${productName}. Please try again.`,
      });
    } finally {
      setIsDeleting(null);
    }
  };

  if (products.length === 0) {
    return <p className="text-center text-muted-foreground py-8">No nutrition products found. Add your first product!</p>;
  }

  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price (TND)</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Calories</TableHead>
            <TableHead>Protein (g)</TableHead>
            <TableHead className="text-right w-[150px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Image
                  src={product.imageUrl || "https://placehold.co/100x100.png"}
                  alt={product.name}
                  width={50}
                  height={50}
                  className="rounded-md object-cover aspect-square"
                  data-ai-hint="product thumbnail"
                />
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.price.toFixed(2)}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.nutrition.calories}</TableCell>
              <TableCell>{product.nutrition.protein}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Link href={`/admin/products/${product.id}/edit`}>
                    <Button variant="outline" size="icon" aria-label="Edit product">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="icon" aria-label="Delete product" disabled={isDeleting === product.id}>
                        {isDeleting === product.id ? "..." : <Trash2 className="h-4 w-4" />}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the product
                          "{product.name}" from your database.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(product.id!, product.name)}
                          className="bg-destructive hover:bg-destructive/90"
                          disabled={isDeleting === product.id}
                        >
                          {isDeleting === product.id ? "Deleting..." : "Yes, delete it"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
