"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import PageHeader from '@/components/shared/PageHeader';
import { Separator } from '@/components/ui/separator';
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const shippingSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  address: z.string().min(1, { message: "Address is required." }),
  apartment: z.string().optional(),
  city: z.string().min(1, { message: "City is required." }),
  country: z.string().min(1, { message: "Country is required." }),
  postalCode: z.string().min(1, { message: "Postal code is required." }),
  phone: z.string().optional(),
});

// Placeholder cart data
const mockCartSummary = {
  items: [
    { id: '1', name: 'Whey Protein Isolate', quantity: 1, price: 49.99, imageUrl: 'https://placehold.co/100x100.png' },
    { id: '2', name: 'Creatine Monohydrate', quantity: 2, price: 29.99, imageUrl: 'https://placehold.co/100x100.png' },
  ],
  subtotal: 49.99 + 29.99 * 2,
  shipping: 0, // Assume free shipping
  get total() { return this.subtotal + this.shipping; }
};


export default function CheckoutPage() {
  const [isGuestCheckout, setIsGuestCheckout] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof shippingSchema>>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      apartment: "",
      city: "",
      country: "Switzerland", // Default or make it a select
      postalCode: "",
      phone: "",
    },
  });
  
  async function onSubmit(values: z.infer<typeof shippingSchema>) {
    console.log("Shipping Details:", values);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setOrderPlaced(true);
    toast({
      title: "Order Placed!",
      description: "Thank you for your purchase. Your gains are on the way!",
      variant: "default",
    });
    // In a real app, you'd redirect to an order confirmation page or clear the cart.
  }

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
         <CheckCircle2 className="mx-auto h-24 w-24 text-green-500 mb-6" />
        <PageHeader title="Order Confirmed!" subtitle="Your order has been successfully placed. We'll send you a confirmation email shortly." />
        <Link href="/">
          <Button size="lg">Back to Homepage</Button>
        </Link>
      </div>
    );
  }


  return (
    <div>
      <PageHeader title="Checkout" subtitle="Securely complete your purchase." />

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Shipping & Payment Forms */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-headline">Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-6">
                <Switch id="guest-checkout" checked={isGuestCheckout} onCheckedChange={setIsGuestCheckout} />
                <Label htmlFor="guest-checkout">Checkout as Guest</Label>
              </div>
              {!isGuestCheckout && (
                <Alert className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Account Checkout</AlertTitle>
                  <AlertDescription>
                    Please <Link href="/login" className="underline hover:text-primary">log in</Link> or <Link href="/register" className="underline hover:text-primary">create an account</Link> for a faster checkout experience.
                  </AlertDescription>
                </Alert>
              )}
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl><Input placeholder="you@example.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="firstName" render={({ field }) => (
                      <FormItem><FormLabel>First Name</FormLabel><FormControl><Input placeholder="John" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="lastName" render={({ field }) => (
                      <FormItem><FormLabel>Last Name</FormLabel><FormControl><Input placeholder="Doe" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem><FormLabel>Address</FormLabel><FormControl><Input placeholder="123 Gains Street" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="apartment" render={({ field }) => (
                    <FormItem><FormLabel>Apartment, suite, etc. (optional)</FormLabel><FormControl><Input placeholder="Apt 4B" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <div className="grid md:grid-cols-3 gap-6">
                    <FormField control={form.control} name="city" render={({ field }) => (
                      <FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="Zurich" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="country" render={({ field }) => (
                      <FormItem><FormLabel>Country</FormLabel><FormControl><Input placeholder="Switzerland" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="postalCode" render={({ field }) => (
                      <FormItem><FormLabel>Postal Code</FormLabel><FormControl><Input placeholder="8001" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem><FormLabel>Phone (optional)</FormLabel><FormControl><Input type="tel" placeholder="+41 12 345 67 89" {...field} /></FormControl>
                    <FormDescription>For delivery updates.</FormDescription><FormMessage /></FormItem>
                  )} />
                
                  <Separator className="my-8" />

                  <h3 className="text-xl font-headline mb-4">Payment Method</h3>
                  <RadioGroup defaultValue="creditCard" value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-2">
                    <Label className="flex items-center space-x-3 p-4 border rounded-md has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-colors">
                      <RadioGroupItem value="creditCard" id="creditCard" />
                      <span>Credit Card (Mocked)</span>
                    </Label>
                    <Label className="flex items-center space-x-3 p-4 border rounded-md has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-colors">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <span>PayPal (Mocked)</span>
                    </Label>
                  </RadioGroup>
                  {paymentMethod === "creditCard" && (
                    <div className="mt-4 p-4 border rounded-md bg-muted/50">
                      <p className="text-sm text-muted-foreground">Credit card payment form would appear here. This is a placeholder.</p>
                    </div>
                  )}
                  {paymentMethod === "paypal" && (
                    <div className="mt-4 p-4 border rounded-md bg-muted/50">
                      <p className="text-sm text-muted-foreground">You would be redirected to PayPal. This is a placeholder.</p>
                    </div>
                  )}
                  <Button type="submit" size="lg" className="w-full mt-8" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Processing..." : `Place Order ($${mockCartSummary.total.toFixed(2)})`}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-headline">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockCartSummary.items.map(item => (
                <div key={item.id} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded object-cover" data-ai-hint="product thumbnail"/>
                    <div>
                      <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between text-sm">
                <p className="text-muted-foreground">Subtotal</p>
                <p>${mockCartSummary.subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-sm">
                <p className="text-muted-foreground">Shipping</p>
                <p>{mockCartSummary.shipping === 0 ? 'Free' : `$${mockCartSummary.shipping.toFixed(2)}`}</p>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <p>Total</p>
                <p>${mockCartSummary.total.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
