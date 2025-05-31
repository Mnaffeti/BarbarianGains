"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import PageHeader from '@/components/shared/PageHeader';
import { mockProducts } from '@/lib/data'; // For demo
import type { CartItem, Product } from '@/lib/types';
import { X, Minus, Plus, ShoppingCart, ArrowRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Separator } from '@/components/ui/separator';

export default function CartPage() {
  // Demo state. In a real app, this would come from context/store/server.
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate fetching cart items
    const demoCart: CartItem[] = mockProducts.slice(0, 2).map(p => ({ ...p, quantity: Math.floor(Math.random() * 3) + 1 }));
    setCartItems(demoCart);
  }, []);

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === productId ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setCartItems(items => items.filter(item => item.id !== productId));
    const removedItem = cartItems.find(item => item.id === productId);
    if (removedItem) {
      toast({
        title: "Item Removed",
        description: `${removedItem.name} has been removed from your cart.`,
      });
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = subtotal > 50 || subtotal === 0 ? 0 : 7.99; // Example: free shipping over $50
  const total = subtotal + shippingCost;

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingCart className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
        <PageHeader title="Your Cart is Empty" subtitle="Looks like you haven't added any gains yet." />
        <Link href="/products">
          <Button size="lg">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Your Shopping Cart" />
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map(item => (
            <Card key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center p-4 gap-4 overflow-hidden">
              <Link href={`/products/${item.id}`} className="block flex-shrink-0">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded-md object-cover aspect-square"
                  data-ai-hint={item.dataAiHint}
                />
              </Link>
              <div className="flex-grow">
                <Link href={`/products/${item.id}`}>
                  <h3 className="text-lg font-headline hover:text-primary transition-colors">{item.name}</h3>
                </Link>
                <p className="text-sm text-muted-foreground">Brand: {item.brand}</p>
                <p className="text-md font-semibold text-primary">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-2 sm:ml-auto mt-4 sm:mt-0">
                <div className="flex items-center border rounded-md">
                  <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                    className="w-12 h-9 text-center border-0 focus-visible:ring-0"
                    min="1"
                  />
                  <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} aria-label="Remove item">
                  <X className="h-5 w-5 text-destructive" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-headline">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <p className="text-muted-foreground">Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-muted-foreground">Shipping</p>
                <p>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</p>
              </div>
              <Separator />
              <div className="flex justify-between text-xl font-bold">
                <p>Total</p>
                <p>${total.toFixed(2)}</p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Link href="/checkout" className="w-full">
                <Button size="lg" className="w-full">
                  Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/products" className="w-full">
                <Button variant="outline" className="w-full">Continue Shopping</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
