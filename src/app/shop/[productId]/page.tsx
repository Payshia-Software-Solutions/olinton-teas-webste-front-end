
'use client';

import { useState, useRef, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/lib/products';
import { PlaceHolderImages } from '@/lib/placeholder-images';
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

const weights = ["250g", "500g", "1kg"];

function RelatedProducts({ currentProductType, currentProductId }: { currentProductType: string, currentProductId: string }) {
    const plugin = useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    )
    const related = products.filter(p => p.type === currentProductType && p.id !== currentProductId);

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
                        {related.map(product => {
                            const productImage = PlaceHolderImages.find(p => p.id === `product-${product.id}`);
                            return (
                                <CarouselItem key={product.id} className="basis-[66.66%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4 pb-8">
                                    <Link href={`/shop/${product.id}`} className="block h-full">
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
                                            <CardFooter className="px-6 pb-6">
                                                <p className="text-xl font-bold text-accent">{product.price}</p>
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
    const [quantity, setQuantity] = useState(1);
    const [selectedWeight, setSelectedWeight] = useState('1kg');
    const { addToCart } = useCart();
    const { toast } = useToast();

    const product = products.find(p => p.id === productId);

    const galleryImages = useMemo(() => [
        PlaceHolderImages.find(p => p.id === `product-${productId}`),
        PlaceHolderImages.find(p => p.id === 'product-green-tea'),
        PlaceHolderImages.find(p => p.id === 'history-ceylon-tea'),
        PlaceHolderImages.find(p => p.id === 'product-silver-tips'),
    ].filter(Boolean), [productId]);

    const [mainImage, setMainImage] = useState(galleryImages[0]?.imageUrl);

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
    
    if(!mainImage && galleryImages.length > 0) {
        setMainImage(galleryImages[0]!.imageUrl);
    }

    const handleQuantityChange = (amount: number) => {
        setQuantity(prev => Math.max(1, prev + amount));
    }
    
    const handleAddToCart = () => {
        if (!product) return;
        addToCart(product.id, quantity);
        toast({
            title: "Added to cart",
            description: `${quantity} x ${product.name} (${selectedWeight}) has been added to your cart.`,
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
                                        alt={product.name}
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
                                            mainImage === img.imageUrl ? "border-primary" : "border-transparent hover:border-primary/50"
                                        )}
                                        onClick={() => setMainImage(img.imageUrl)}
                                    >
                                        <Image
                                            src={img.imageUrl}
                                            alt={`${product.name} thumbnail ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="space-y-6">
                            <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">{product.name} - {selectedWeight}</h1>
                            <p className="text-lg text-muted-foreground">{product.description}</p>
                            
                            <div className="flex items-center gap-4">
                                <div className="flex items-center text-accent">
                                    {[...Array(4)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                                    <Star className="w-5 h-5 text-muted" />
                                </div>
                                <span className="text-muted-foreground text-sm">(4.5) 124 reviews</span>
                            </div>

                            <p className="text-3xl font-bold text-gray-800">{product.price.replace('LKR', 'Rs.')}</p>
                            
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
                                <h3>Product Description</h3>
                                <p>{product.longDescription}</p>
                                <p>Our master tea blenders carefully select only the finest tea leaves, ensuring each cup delivers the perfect balance of strength and smoothness. The distinctive character of this blend makes it ideal for both morning energizing and afternoon relaxation.</p>
                                <h3>Brewing Instructions:</h3>
                                <ul>
                                    <li>Water temperature: 95-100°C</li>
                                    <li>Steeping time: 3-5 minutes</li>
                                    <li>1 teaspoon per cup</li>
                                </ul>
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
            <RelatedProducts currentProductType={product.type} currentProductId={product.id} />
            <Footer />
        </div>
    );
}

    