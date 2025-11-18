
'use client';

import { useState, useRef, useMemo, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { type ApiProduct } from '@/lib/products';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Minus, ShieldCheck, Leaf, Truck, Star, Heart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { useCart } from '@/hooks/use-cart';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import type { Metadata } from 'next';

type Props = {
  params: { productId: string };
};

async function getProduct(productId: string): Promise<ApiProduct | null> {
    if (!productId) return null;
    try {
        const companyId = process.env.NEXT_PUBLIC_COMPANY_ID || 15;
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
        if (!serverUrl) {
            console.error("Server URL is not defined in environment variables.");
            return null;
        }
        const res = await fetch(`${serverUrl}/products/with-variants/by-company?company_id=${companyId}`);
        const data = await res.json();
        if (data && Array.isArray(data.products)) {
            const foundProduct = data.products.find((p: ApiProduct) => p.product.id === productId);
            return foundProduct || null;
        }
        return null;
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.productId);
  
  if (!product) {
    return {
      title: 'Product not found',
    }
  }
 
  return {
    title: product.product.name,
  }
}

const weights = ["250g", "500g", "1kg"];
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const imageServerUrl = process.env.NEXT_PUBLIC_IMAGE_SERVER_URL;

function RelatedProducts({ currentProductType, currentProductId, allProducts }: { currentProductType: string, currentProductId: string, allProducts: ApiProduct[] }) {
    const plugin = useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    )
    const related = allProducts.filter(p => p.product.category === currentProductType && p.product.id !== currentProductId);

    if (related.length === 0) return null;

    return (
        <section className="py-16 md:py-24 bg-card">
            <div className="container">
                <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary text-center mb-12">Related Products</h2>
                <Carousel
                    plugins={[plugin.current]}
                    className="w-full"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                >
                    <CarouselContent className="-ml-4">
                        {related.map(p => {
                            const product = p.product;
                            const imageUrl = p.product_images.length > 0 ? `${imageServerUrl}${p.product_images[0].img_url}` : '/placeholder.jpg';
                            return (
                                <CarouselItem key={product.id} className="basis-[66.66%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4 pb-8">
                                    <Link href={`/shop/${product.id}`} className="block h-full">
                                        <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl">
                                            <CardHeader className="p-0">
                                                <div className="aspect-[4/3] relative">
                                                    <Image
                                                        src={imageUrl}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            </CardHeader>
                                            <CardContent className="flex-grow p-6 text-left">
                                                <CardTitle className="font-headline text-2xl truncate">{product.name}</CardTitle>
                                                <CardDescription className="mt-2 line-clamp-2">{product.description}</CardDescription>
                                            </CardContent>
                                            <CardFooter className="px-6 pb-6">
                                                <p className="text-xl font-bold text-accent">LKR {product.price}</p>
                                            </CardFooter>
                                        </Card>
                                    </Link>
                                </CarouselItem>
                            );
                        })}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex" />
                    <CarouselNext className="hidden md:flex" />
                </Carousel>
            </div>
        </section>
    )
}

export default function ProductPage() {
    const params = useParams();
    const { productId } = params;
    const [product, setProduct] = useState<ApiProduct | null>(null);
    const [allProducts, setAllProducts] = useState<ApiProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [selectedWeight, setSelectedWeight] = useState('1kg');
    const { addToCart } = useCart();
    const { toast } = useToast();

    useEffect(() => {
        const fetchProducts = async () => {
            if (!productId) return;
            setIsLoading(true);
            try {
                const companyId = process.env.NEXT_PUBLIC_COMPANY_ID || 15;
                if (!serverUrl) {
                  console.error("Server URL is not defined in environment variables.");
                  return;
                }
                const res = await fetch(`${serverUrl}/products/with-variants/by-company?company_id=${companyId}`);
                const data = await res.json();
                if (data && Array.isArray(data.products)) {
                    setAllProducts(data.products);
                    const foundProduct = data.products.find((p: ApiProduct) => p.product.id === productId);
                    setProduct(foundProduct || null);
                } else {
                    console.error("Failed to fetch products:", data);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, [productId]);


    const galleryImages = useMemo(() => {
        if (!product) return [];
        return product.product_images.map(img => `${imageServerUrl}${img.img_url}`);
    }, [product]);

    const [mainImage, setMainImage] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (galleryImages.length > 0 && !mainImage) {
            setMainImage(galleryImages[0]);
        }
    }, [galleryImages, mainImage]);

    if (isLoading) {
        return (
             <div className="flex flex-col min-h-screen bg-background">
                <Header />
                <main className="flex-grow bg-white">
                    <div className="container py-16 md:py-24">
                        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
                            <div className="flex flex-col gap-4">
                                <Skeleton className="aspect-square w-full rounded-lg" />
                                <div className="grid grid-cols-4 gap-4">
                                    <Skeleton className="aspect-square w-full rounded-md" />
                                    <Skeleton className="aspect-square w-full rounded-md" />
                                    <Skeleton className="aspect-square w-full rounded-md" />
                                    <Skeleton className="aspect-square w-full rounded-md" />
                                </div>
                            </div>
                            <div className="space-y-6">
                                <Skeleton className="h-12 w-3/4" />
                                <Skeleton className="h-5 w-full" />
                                <Skeleton className="h-5 w-5/6" />
                                <Skeleton className="h-6 w-32" />
                                <Skeleton className="h-8 w-48" />
                                <div className="space-y-2">
                                    <Skeleton className="h-5 w-16" />
                                    <div className="flex gap-2">
                                        <Skeleton className="h-10 w-20" />
                                        <Skeleton className="h-10 w-20" />
                                        <Skeleton className="h-10 w-20" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Skeleton className="h-5 w-16" />
                                    <Skeleton className="h-12 w-32" />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Skeleton className="h-12 w-full" />
                                    <Skeleton className="h-12 w-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow flex items-center justify-center">
                    <p>Product not found.</p>
                </main>
                <Footer />
            </div>
        );
    }
    
    const p = product.product;

    const handleQuantityChange = (amount: number) => {
        setQuantity(prev => Math.max(1, prev + amount));
    }
    
    const handleAddToCart = () => {
        if (!p) return;
        addToCart(p, quantity);
        toast({
            title: "Added to cart",
            description: `${quantity} x ${p.name} (${selectedWeight}) has been added to your cart.`,
        });
    };

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-grow bg-white">
                <div className="container py-16 md:py-24">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
                        {/* Image Gallery */}
                        <div className="flex flex-col gap-4">
                            <div className="aspect-square relative rounded-lg overflow-hidden border shadow-sm">
                                {mainImage && (
                                    <Image
                                        src={mainImage}
                                        alt={p.name}
                                        fill
                                        className="object-cover"
                                    />
                                )}
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                {galleryImages.map((img, index) => (
                                    img && <div
                                        key={index}
                                        className={cn(
                                            "aspect-square relative rounded-md overflow-hidden border-2 cursor-pointer transition-all",
                                            mainImage === img ? "border-primary" : "border-transparent hover:border-primary/50"
                                        )}
                                        onClick={() => setMainImage(img)}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${p.name} thumbnail ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="space-y-6">
                            <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">{p.name} - {selectedWeight}</h1>
                            <p className="text-lg text-muted-foreground">{p.description}</p>
                            
                            <div className="flex items-center gap-4">
                                <div className="flex items-center text-accent">
                                    {[...Array(4)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                                    <Star className="w-5 h-5 text-muted" />
                                </div>
                                <span className="text-muted-foreground text-sm">(4.5) 124 reviews</span>
                            </div>

                            <p className="text-3xl font-bold text-gray-800">LKR {p.price}</p>
                            
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Weight</label>
                                <div className="flex gap-2">
                                    {weights.map(w => (
                                        <Button 
                                            key={w} 
                                            variant={selectedWeight === w ? "default" : "outline"}
                                            onClick={() => setSelectedWeight(w)}
                                            className={cn("bg-primary text-primary-foreground", selectedWeight === w ? "bg-primary text-primary-foreground" : "bg-transparent text-foreground")}
                                            >
                                            {w}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Quantity</label>
                                <div className="flex items-center border rounded-md w-fit">
                                    <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(-1)}>
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="w-12 text-center font-semibold">{quantity}</span>
                                    <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(1)}>
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6" onClick={handleAddToCart}>Add to Cart</Button>
                                <Button size="lg" variant="outline" className="w-full text-lg py-6 flex items-center gap-2">
                                    <Heart className="w-5 h-5" /> Add to Wishlist
                                </Button>
                            </div>
                            
                            <div className="flex justify-around items-center text-sm text-muted-foreground p-4 bg-card rounded-lg border">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="h-5 w-5 text-primary" />
                                    <span>Secure Checkout</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Leaf className="h-5 w-5 text-primary" />
                                    <span>100% Organic</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Truck className="h-5 w-5 text-primary" />
                                    <span>Fast Delivery</span>
                                </div>
                            </div>

                        </div>
                    </div>
                     <div className="mt-16 md:mt-24">
                        <Tabs defaultValue="description" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="description">Description</TabsTrigger>
                                <TabsTrigger value="additional">Additional Information</TabsTrigger>
                                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                            </TabsList>
                            <TabsContent value="description" className="pt-6 text-muted-foreground prose max-w-none">
                                <h3 className="text-lg font-semibold text-primary">Product Description</h3>
                                <p>{p.description}</p>
                                <p>Our master tea blenders carefully select only the finest tea leaves, ensuring each cup delivers the perfect balance of strength and smoothness. The distinctive character of this blend makes it ideal for both morning energizing and afternoon relaxation.</p>
                                <h3 className="mt-4 text-lg font-semibold text-primary">Brewing Instructions:</h3>
                                <p className="leading-tight">Water temperature: 95-100°C</p>
                                <p className="leading-tight">Steeping time: 3-5 minutes</p>
                                <p className="leading-tight">1 teaspoon per cup</p>
                            </TabsContent>
                            <TabsContent value="additional" className="pt-6 text-muted-foreground">
                                <p>Additional information will be available here soon.</p>
                            </TabsContent>
                            <TabsContent value="reviews" className="pt-6 text-muted-foreground">
                                <p>No reviews yet. Be the first to review this product!</p>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </main>
            <RelatedProducts currentProductType={p.category} currentProductId={p.id} allProducts={allProducts} />
            <Footer />
        </div>
    );
}
