
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const teaTypes = ['Black Tea', 'Green Tea', 'White Tea', 'Oolong'];
const collections = ['Special Offers', 'Classic Teas', 'Flavored Teas', 'Exceptional Teas'];

export default function ShopPage() {
  const [availability, setAvailability] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000]);
  const [selectedTeaTypes, setSelectedTeaTypes] = useState<string[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);

  const handleAvailabilityChange = (value: string) => {
    setAvailability(prev => 
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const handleTeaTypeChange = (value: string) => {
    setSelectedTeaTypes(prev => 
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };
  
  const handleCollectionChange = (value: string) => {
    setSelectedCollections(prev => 
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const filteredProducts = products.filter(product => {
    const price = parseFloat(product.price.replace(/[^0-9.-]+/g,""));
    const meetsPrice = price >= priceRange[0] && price <= priceRange[1];
    const meetsTeaType = selectedTeaTypes.length === 0 || selectedTeaTypes.includes(product.type);
    // Add logic for collections and availability if product data supports it
    return meetsPrice && meetsTeaType;
  });

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
                <h1 className="font-headline text-4xl md:text-5xl font-black text-primary uppercase">Tea by Collection</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Your virtual guide to tea! Discover all types of tea, from herbal infusions to black teas and matcha.
                </p>
            </div>

            <div className="mt-16 grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Filters Sidebar */}
              <aside className="lg:col-span-1">
                <h2 className="font-headline text-2xl font-bold mb-6">Filter By</h2>
                <Accordion type="multiple" defaultValue={['availability', 'price', 'tea-type', 'collections']} className="w-full">
                  <AccordionItem value="availability">
                    <AccordionTrigger className="font-semibold">Availability</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="in-stock" onCheckedChange={() => handleAvailabilityChange('in-stock')} />
                          <label htmlFor="in-stock" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            In Stock
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="out-of-stock" onCheckedChange={() => handleAvailabilityChange('out-of-stock')} />
                          <label htmlFor="out-of-stock" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Out of Stock
                          </label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="price">
                    <AccordionTrigger className="font-semibold">Price Range</AccordionTrigger>
                    <AccordionContent>
                      <Slider
                        defaultValue={[0, 15000]}
                        max={15000}
                        step={500}
                        onValueChange={(value) => setPriceRange(value as [number, number])}
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-2">
                        <span>LKR {priceRange[0]}</span>
                        <span>LKR {priceRange[1]}</span>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="tea-type">
                    <AccordionTrigger className="font-semibold">Tea Type</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {teaTypes.map(type => (
                           <div key={type} className="flex items-center space-x-2">
                            <Checkbox id={type} onCheckedChange={() => handleTeaTypeChange(type)} />
                            <label htmlFor={type} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              {type}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="collections">
                    <AccordionTrigger className="font-semibold">Collections</AccordionTrigger>
                    <AccordionContent>
                       <div className="space-y-2">
                        {collections.map(collection => (
                           <div key={collection} className="flex items-center space-x-2">
                            <Checkbox id={collection} onCheckedChange={() => handleCollectionChange(collection)} />
                            <label htmlFor={collection} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              {collection}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </aside>

              {/* Products Grid */}
              <div className="lg:col-span-3">
                 <div className="flex justify-between items-center mb-8">
                    <h3 className="font-headline text-3xl font-bold text-primary">Special Offers ({filteredProducts.length})</h3>
                    <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Sort by:</span>
                        <Select defaultValue="featured">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="featured">Featured</SelectItem>
                                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                                <SelectItem value="name-asc">Name: A to Z</SelectItem>
                                <SelectItem value="name-desc">Name: Z to A</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
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
                                {product.id === 'earl-grey-supreme' && <Badge variant="destructive" className="absolute top-2 right-2 bg-red-500 text-white">30% OFF</Badge>}
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
                {filteredProducts.length === 0 && (
                  <div className="text-center col-span-full py-16">
                    <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

    