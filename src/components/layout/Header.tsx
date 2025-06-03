
"use client";

import Link from 'next/link';
import { ShoppingCart, Menu, Dumbbell, Brain, Newspaper, Info, MessageSquare, LogIn, LogOut, UserCog } from 'lucide-react';
import BarbarianGainsLogo from '@/components/icons/BarbarianGainsLogo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import * as React from "react";
import { useAuth } from '@/contexts/AuthContext';
import { signOut as firebaseSignOut } from '@/lib/firebase/auth';
import { useToast } from '@/hooks/use-toast';


const navLinks = [
  { href: '/', label: 'Home', icon: Dumbbell },
  { href: '/products', label: 'Products', icon: Dumbbell },
  { href: '/advisor', label: 'AI Advisor', icon: Brain },
  { href: '/blog', label: 'Blog', icon: Newspaper },
  { href: '/about', label: 'About Us', icon: Info },
  { href: '/contact', label: 'Contact', icon: MessageSquare },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const [cartItemCount, setCartItemCount] = React.useState(0); // Placeholder
  const { currentUser, isAdmin, loading } = useAuth();

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
      toast({ title: "Logged Out", description: "You have been successfully logged out." });
      router.push('/login');
    } catch (error) {
      console.error("Sign out error:", error);
      toast({ variant: "destructive", title: "Logout Failed", description: "Could not log you out. Please try again." });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <BarbarianGainsLogo />
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-foreground/60"
              )}
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
             <Link
              href="/admin"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname.startsWith('/admin') ? "text-primary" : "text-foreground/60"
              )}
            >
              Admin Panel
            </Link>
          )}
        </nav>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <Link href="/cart">
            <Button variant="ghost" size="icon" aria-label="Shopping Cart">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </Link>

          {!loading && (
            currentUser ? (
              <Button variant="ghost" size="icon" onClick={handleSignOut} aria-label="Logout">
                <LogOut className="h-5 w-5" />
              </Button>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="icon" aria-label="Login">
                  <LogIn className="h-5 w-5" />
                </Button>
              </Link>
            )
          )}


          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs bg-background p-0">
              <SheetHeader className="p-6 border-b">
                 <SheetTitle>
                    <Link href="/" className="flex items-center gap-2">
                     <BarbarianGainsLogo />
                    </Link>
                 </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-1 p-4">
                {navLinks.map((link) => (
                  <SheetClose key={link.href} asChild>
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                        pathname === link.href ? "bg-accent text-accent-foreground" : "text-foreground/80"
                      )}
                    >
                      <link.icon className="h-5 w-5" />
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
                {isAdmin && (
                  <SheetClose asChild>
                    <Link
                      href="/admin"
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                        pathname.startsWith('/admin') ? "bg-accent text-accent-foreground" : "text-foreground/80"
                      )}
                    >
                      <UserCog className="h-5 w-5" />
                      Admin Panel
                    </Link>
                  </SheetClose>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
