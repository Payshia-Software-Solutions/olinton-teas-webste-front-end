
'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { type ApiProduct, type Product as ProductType } from '@/lib/products';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { useCart } from '@/hooks/use-cart';
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from '@/components/ui/skeleton';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Filter } from 'lucide-react';


type Collection = {
  id: string;
  title: string;
};

type TeaType = {
  id: string;
  name: string;
};

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const imageServerUrl = process.env.NEXT_PUBLIC_IMAGE_SERVER_URL;

const ProductCardSkeleton = () => (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg rounded-2xl">
        <CardHeader className="p-0">
            <Skeleton className="aspect-[4/3] w-full" />
        </CardHeader>
        <CardContent className="flex-grow p-6 text-left">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full mt-1" />
        </CardContent>
        <CardFooter className="flex justify-between items-center px-6 pb-6">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-10 w-28" />
        </CardFooter>
    </Card>
);

function ShopPageComponent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [availability, setAvailability] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000]);
  const [selectedTeaTypes, setSelectedTeaTypes] = useState<string[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [teaTypes, setTeaTypes] = useState<TeaType[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [isProductsLoading, setIsProductsLoading] = useState(true);

  useEffect(() => {
    document.title = "Shop | O'linton - Elegance in every sip";
  }, []);

  useEffect(() => {
    const teaTypeParam = searchParams.get('teaType');
    const collectionParam = searchParams.get('collection');

    if (teaTypeParam) {
      setSelectedTeaTypes(prev => [...new Set([...prev, teaTypeParam])]);
    }
    if (collectionParam) {
      setSelectedCollections(prev => [...new Set([...prev, collectionParam])]);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const companyId = process.env.NEXT_PUBLIC_COMPANY_ID;
        if (!serverUrl || !companyId) {
          console.error("Server URL or Company ID is not defined in environment variables.");
          setIsLoading(false);
          return;
        }
        
        const collectionsPromise = fetch(`${serverUrl}/collections/company?company_id=${companyId}`).then(res => res.json());
        const categoriesPromise = fetch(`${serverUrl}/master-categories/company?company_id=${companyId}`).then(res => res.json());

        const [collectionsData, categoriesData] = await Promise.all([collectionsPromise, categoriesPromise]);

        if (Array.isArray(collectionsData)) {
          setCollections(collectionsData);
        } else {
          console.error("Failed to fetch collections:", collectionsData);
        }

        if (Array.isArray(categoriesData)) {
          setTeaTypes(categoriesData);
        } else {
          console.error("Failed to fetch tea types:", categoriesData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
        setIsProductsLoading(true);
        try {
            const companyId = process.env.NEXT_PUBLIC_COMPANY_ID;
            if (!serverUrl || !companyId) {
              console.error("Server URL or Company ID is not defined in environment variables.");
              setIsProductsLoading(false);
              return;
            }
            const res = await fetch(`${serverUrl}/products/with-variants/by-company?company_id=${companyId}`);
            const data = await res.json();
            if (data && Array.isArray(data.products)) {
                setProducts(data.products);
            } else {
                console.error("Failed to fetch products:", data);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setIsProductsLoading(false);
        }
    };
    fetchProducts();
  }, []);


  const handleAddToCart = (e: React.MouseEvent, product: ProductType) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
    });
  }

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

  const filteredProducts = products.filter(p => {
    const price = parseFloat(p.product.price.replace(/[^0-9.-]+/g,""));
    const meetsPrice = price >= priceRange[0] && price <= priceRange[1];
    const meetsTeaType = selectedTeaTypes.length === 0 || selectedTeaTypes.includes(p.product.category);
    // Add logic for collections and availability if product data supports it
    return meetsPrice && meetsTeaType;
  });

  const FilterSkeleton = () => (
    <div className="space-y-3">
        <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-28" />
        </div>
        <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-24" />
        </div>
    </div>
  );
  
  const FilterContent = () => (
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
          {isLoading ? <FilterSkeleton /> : (
            <div className="space-y-2">
              {teaTypes.map(type => (
                <div key={type.id} className="flex items-center space-x-2">
                  <Checkbox id={type.name} onCheckedChange={() => handleTeaTypeChange(type.name)} checked={selectedTeaTypes.includes(type.name)} />
                  <label htmlFor={type.name} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {type.name}
                  </label>
                </div>
              ))}
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="collections">
        <AccordionTrigger className="font-semibold">Collections</AccordionTrigger>
        <AccordionContent>
           {isLoading ? <FilterSkeleton /> : (
            <div className="space-y-2">
              {collections.map(collection => (
                <div key={collection.id} className="flex items-center space-x-2">
                  <Checkbox id={collection.title} onCheckedChange={() => handleCollectionChange(collection.title)} checked={selectedCollections.includes(collection.title)} />
                  <label htmlFor={collection.title} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {collection.title}
                  </label>
                </div>
              ))}
            </div>
           )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );

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
              {/* Filters Sidebar for Desktop */}
              <aside className="lg:col-span-1 hidden lg:block">
                <h2 className="font-headline text-2xl font-bold mb-6">Filter By</h2>
                <FilterContent />
              </aside>

              {/* Products Grid */}
              <div className="lg:col-span-3">
                 <div className="flex justify-between items-center mb-8">
                    <Sheet>
                      <SheetTrigger asChild>
                         <Button variant="outline" className="lg:hidden">
                            <Filter className="mr-2 h-4 w-4" />
                            Filter
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="left">
                         <h2 className="font-headline text-2xl font-bold mb-6">Filter By</h2>
                         <FilterContent />
                      </SheetContent>
                    </Sheet>
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

                <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-8 sm:gap-x-8">
                  {isProductsLoading ? (
                        [...Array(6)].map((_, i) => <ProductCardSkeleton key={i} />)
                  ) : filteredProducts.map((p, index) => {
                    const product = p.product;
                    const frontImage = p.product_images.find(img => img.image_type === 'front img');
                    const secondImage = p.product_images.find(img => img.image_type === '2nd image');
                    const imageUrl = frontImage ? `${imageServerUrl}${frontImage.img_url}` : '/placeholder.jpg';
                    const hoverImageUrl = secondImage ? `${imageServerUrl}${secondImage.img_url}` : imageUrl;
                    
                    return (
                      <AnimateOnScroll key={product.id} delay={index * 100}>
                        <Link href={`/shop/${product.id}`} className="block h-full group">
                          <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl">
                            <CardHeader className="p-0">
                                <div className="aspect-[4/3] relative">
                                  <Image
                                    src={imageUrl}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-opacity duration-300 group-hover:opacity-0"
                                  />
                                  {secondImage && (
                                    <Image
                                        src={hoverImageUrl}
                                        alt={product.name}
                                        fill
                                        className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                    />
                                  )}
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow p-4 sm:p-6 text-left">
                              <CardTitle className="font-headline text-lg sm:text-2xl truncate">{product.name}</CardTitle>
                              <CardDescription className="mt-2 line-clamp-2 text-sm sm:text-base">{product.description}</CardDescription>
                            </CardContent>
                            <CardFooter className="flex justify-between items-center p-4 sm:p-6">
                              <p className="text-base sm:text-xl font-bold text-accent">LKR {product.price}</p>
                              <Button onClick={(e) => handleAddToCart(e, product)} className="bg-primary hover:bg-primary/90 text-xs sm:text-sm p-2 sm:p-4">Add to Cart</Button>
                            </CardFooter>
                          </Card>
                        </Link>
                      </AnimateOnScroll>
                    );
                  })}
                </div>
                {!isProductsLoading && filteredProducts.length === 0 && (
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

export default function ShopPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShopPageComponent />
    </Suspense>
  )
}

    