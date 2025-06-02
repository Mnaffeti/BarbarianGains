
"use client";

import { useState, useMemo } from 'react';
import ProductCard from '@/components/shared/ProductCard';
import PageHeader from '@/components/shared/PageHeader';
import { mockProducts } from '@/lib/data';
import type { Product } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from '@/components/ui/button';
import { ListFilter, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const productCategories = ['Protein', 'Creatine', 'Pre-workout', 'Vitamins', 'Other'] as const;
const productGoals = ['Build Muscle', 'Lose Weight', 'Endurance', 'General Health', 'Recovery'] as const;
const productDietaryNeeds = ['Vegan', 'Gluten-Free', 'Dairy-Free'] as const;
const productBrands = Array.from(new Set(mockProducts.map(p => p.brand)));

const MIN_PRICE = 0;
const MAX_PRICE = Math.max(...mockProducts.map(p => p.price), 100);

const ALL_BRANDS_VALUE = "all";


export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedDietaryNeeds, setSelectedDietaryNeeds] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>(ALL_BRANDS_VALUE);
  const [priceRange, setPriceRange] = useState<[number, number]>([MIN_PRICE, MAX_PRICE]);

  const handleCheckboxChange = (setter: React.Dispatch<React.SetStateAction<string[]>>, value: string, checked: boolean) => {
    setter(prev => checked ? [...prev, value] : prev.filter(item => item !== value));
  };
  
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setSelectedGoals([]);
    setSelectedDietaryNeeds([]);
    setSelectedBrand(ALL_BRANDS_VALUE);
    setPriceRange([MIN_PRICE, MAX_PRICE]);
  };

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesGoal = selectedGoals.length === 0 || selectedGoals.includes(product.goal);
      const matchesDietaryNeeds = selectedDietaryNeeds.length === 0 || selectedDietaryNeeds.every(need => product.dietaryNeeds?.includes(need as any));
      const matchesBrand = selectedBrand === ALL_BRANDS_VALUE || product.brand === selectedBrand;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearchTerm && matchesCategory && matchesGoal && matchesDietaryNeeds && matchesBrand && matchesPrice;
    });
  }, [searchTerm, selectedCategories, selectedGoals, selectedDietaryNeeds, selectedBrand, priceRange]);

  const FiltersComponent = () => (
    <aside className="space-y-6">
      <div>
        <Label htmlFor="search" className="text-lg font-headline mb-2 block">Search Products</Label>
        <Input
          id="search"
          type="text"
          placeholder="Search by name or keyword..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <FilterGroup title="Category">
        {productCategories.map(category => (
          <CheckboxItem key={category} id={`cat-${category}`} label={category} checked={selectedCategories.includes(category)} onCheckedChange={(checked) => handleCheckboxChange(setSelectedCategories, category, Boolean(checked))} />
        ))}
      </FilterGroup>

      <FilterGroup title="Goal">
        {productGoals.map(goal => (
          <CheckboxItem key={goal} id={`goal-${goal}`} label={goal} checked={selectedGoals.includes(goal)} onCheckedChange={(checked) => handleCheckboxChange(setSelectedGoals, goal, Boolean(checked))} />
        ))}
      </FilterGroup>
      
      <FilterGroup title="Dietary Needs">
        {productDietaryNeeds.map(need => (
          <CheckboxItem key={need} id={`diet-${need}`} label={need} checked={selectedDietaryNeeds.includes(need)} onCheckedChange={(checked) => handleCheckboxChange(setSelectedDietaryNeeds, need, Boolean(checked))} />
        ))}
      </FilterGroup>

      <div>
        <Label htmlFor="brand" className="text-lg font-headline mb-2 block">Brand</Label>
        <Select value={selectedBrand} onValueChange={setSelectedBrand}>
          <SelectTrigger id="brand">
            <SelectValue placeholder="All Brands" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_BRANDS_VALUE}>All Brands</SelectItem>
            {productBrands.map(brand => (
              <SelectItem key={brand} value={brand}>{brand}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label className="text-lg font-headline mb-2 block">Price Range</Label>
        <Slider
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={1}
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          className="my-4"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
      <Button onClick={resetFilters} variant="outline" className="w-full">
        <X className="mr-2 h-4 w-4" /> Reset Filters
      </Button>
    </aside>
  );

  return (
    <div>
      <PageHeader title="Our Products" subtitle="Find the perfect supplements to fuel your fitness journey." />
      
      <div className="lg:hidden mb-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <ListFilter className="mr-2 h-4 w-4" /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-6 overflow-y-auto">
            <FiltersComponent />
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="hidden lg:block lg:col-span-1">
          <FiltersComponent />
        </div>
        
        <main className="lg:col-span-3">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No products match your current filters.</p>
              <Button onClick={resetFilters} variant="link" className="mt-4">Clear filters</Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

interface FilterGroupProps {
  title: string;
  children: React.ReactNode;
}

function FilterGroup({ title, children }: FilterGroupProps) {
  return (
    <div>
      <h3 className="text-lg font-headline mb-3">{title}</h3>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
}

interface CheckboxItemProps {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

function CheckboxItem({ id, label, checked, onCheckedChange }: CheckboxItemProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} />
      <Label htmlFor={id} className="font-normal text-sm">{label}</Label>
    </div>
  );
}

