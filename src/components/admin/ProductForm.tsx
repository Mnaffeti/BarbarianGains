
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { NutritionProduct } from "@/lib/types";
import { Loader2 } from "lucide-react";

const productFormSchema = z.object({
  name: z.string().min(3, { message: "Product name must be at least 3 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  price: z.coerce.number().min(0.01, { message: "Price must be greater than 0." }),
  imageUrl: z.string().url({ message: "Please enter a valid URL." }),
  stock: z.coerce.number().int().min(0, { message: "Stock cannot be negative." }),
  nutrition: z.object({
    calories: z.coerce.number().int().min(0, { message: "Calories cannot be negative." }),
    protein: z.coerce.number().min(0, { message: "Protein cannot be negative." }),
    carbs: z.coerce.number().min(0, { message: "Carbs cannot be negative." }),
    fat: z.coerce.number().min(0, { message: "Fat cannot be negative." }),
  }),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

interface ProductFormProps {
  onSubmit: (data: ProductFormValues) => Promise<void>;
  initialData?: NutritionProduct | null;
  isSubmitting: boolean;
  submitButtonText?: string;
}

export default function ProductForm({
  onSubmit,
  initialData,
  isSubmitting,
  submitButtonText = "Save Product",
}: ProductFormProps) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: initialData ? {
      ...initialData,
      price: initialData.price || 0,
      stock: initialData.stock || 0,
      nutrition: {
        calories: initialData.nutrition?.calories || 0,
        protein: initialData.nutrition?.protein || 0,
        carbs: initialData.nutrition?.carbs || 0,
        fat: initialData.nutrition?.fat || 0,
      }
    } : {
      name: "",
      description: "",
      price: 0,
      imageUrl: "",
      stock: 0,
      nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 },
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">
              {initialData ? "Edit Product" : "Add New Product"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl><Input placeholder="e.g., Whey Protein Isolate" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl><Textarea placeholder="Detailed product description..." {...field} rows={4} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (TND)</FormLabel>
                    <FormControl><Input type="number" step="0.01" placeholder="e.g., 49.99" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Quantity</FormLabel>
                    <FormControl><Input type="number" step="1" placeholder="e.g., 150" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl><Input placeholder="https://example.com/image.png" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <h3 className="text-lg font-medium pt-4 border-t">Nutrition Information (per serving)</h3>
            <div className="grid md:grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name="nutrition.calories"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Calories</FormLabel>
                        <FormControl><Input type="number" placeholder="e.g., 120" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="nutrition.protein"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Protein (g)</FormLabel>
                        <FormControl><Input type="number" step="0.1" placeholder="e.g., 25" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="nutrition.carbs"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Carbohydrates (g)</FormLabel>
                        <FormControl><Input type="number" step="0.1" placeholder="e.g., 3" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="nutrition.fat"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Fat (g)</FormLabel>
                        <FormControl><Input type="number" step="0.1" placeholder="e.g., 1.5" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                </>
              ) : (
                submitButtonText
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
