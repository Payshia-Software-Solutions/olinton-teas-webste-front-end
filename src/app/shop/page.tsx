
'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/products';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const teaTypes = ['All', 'Black Tea', 'Green Tea', 'White Tea', 'Oolong'];

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProducts = activeFilter === 'All' 
    ? products 
    : products.filter(p => p.type === activeFilter);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto">
                <h1 className="font-headline text-4xl md:text-5xl font-black text-primary uppercase">Our Teas</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Explore our curated selection of premium Ceylon teas, each with its own unique character and flavor profile. From the bold and robust to the light and delicate, find the perfect tea to elevate your moments.
                </p>
            </div>
            
            <div className="flex justify-center flex-wrap gap-2 mt-12 mb-8">
              {teaTypes.map(type => (
                <Button 
                  key={type}
                  variant={activeFilter === type ? 'default' : 'outline'}
                  onClick={() => setActiveFilter(type)}
                  className={cn(
                    "rounded-full transition-colors duration-300",
                    activeFilter === type
                      ? "bg-primary text-primary-foreground"
                      : "text-primary border-primary/50 hover:bg-primary/10"
                  )}
                >
                  {type}
                </Button>
              ))}
            </div>

            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product, index) => {
                const productImage = PlaceHolderImages.find(p => p.id === `product-${product.id}`);
                return (
                  <AnimateOnScroll key={product.id} delay={index * 100}>
                    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl">
                      <CardHeader className="p-0">
                        {productImage && (
                          <div className="aspect-[4/3] relative">
                            <Image
                              src={productImage.imageUrl}
                              alt={product.name}
                              fill
                              className="object-cover"
                              data-ai-hint={productImage.imageHint}
                            />
                          </div>
                        )}
                      </CardHeader>
                      <CardContent className="flex-grow p-6 text-left">
                        <CardTitle className="font-headline text-2xl truncate">{product.name}</CardTitle>
                        <CardDescription className="mt-2 line-clamp-2">{product.description}</CardDescription>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center px-6 pb-6">
                        <p className="text-xl font-bold text-accent">{product.price}</p>
                        <Button className="bg-primary hover:bg-primary/90">Add to Cart</Button>
                      </CardFooter>
                    </Card>
                  </AnimateOnScroll>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
