
'use client';

import { useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/lib/products';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Minus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

function RelatedProducts({ currentProductType, currentProductId }: { currentProductType: string, currentProductId: string }) {
    const plugin = useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )
    const related = products.filter(p => p.type === currentProductType && p.id !== currentProductId);

    if (related.length === 0) return null;

    return (
        <section className="py-20 md:py-28 bg-card">
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
                                <CarouselItem key={product.id} className="basis-2/3 sm:basis-1/2 md:basis-[calc(100%/2.5)] lg:basis-[calc(100%/3.5)] xl:basis-[calc(100%/4.5)] pl-4 pb-8">
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
                </Carousel>
            </div>
        </section>
    )
}

export default function ProductPage() {
    const params = useParams();
    const { productId } = params;
    const [quantity, setQuantity] = useState(1);

    const product = products.find(p => p.id === productId);
    const productImage = PlaceHolderImages.find(p => p.id === `product-${productId}`);
    const galleryImages = [
        productImage,
        PlaceHolderImages.find(p => p.id === `product-black-tea`),
        PlaceHolderImages.find(p => p.id === `product-green-tea`),
        PlaceHolderImages.find(p => p.id === `product-silver-tips`),
    ].filter(Boolean);

    const [mainImage, setMainImage] = useState(productImage?.imageUrl);


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
    
    if(!mainImage && productImage) {
        setMainImage(productImage.imageUrl)
    }

    const handleQuantityChange = (amount: number) => {
        setQuantity(prev => Math.max(1, prev + amount));
    }

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-grow bg-white">
                <div className="container py-16 md:py-24">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Image Gallery */}
                        <div>
                            <div className="aspect-square relative rounded-lg overflow-hidden border mb-4">
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
                                        className="aspect-square relative rounded-md overflow-hidden border cursor-pointer hover:border-primary"
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
                            <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">{product.name}</h1>
                            <p className="text-2xl font-semibold text-accent">{product.price}</p>
                            <p className="text-muted-foreground text-lg">{product.description}</p>
                            
                            <Separator />

                            <div className="flex items-center gap-4">
                                <p className="font-semibold">Quantity:</p>
                                <div className="flex items-center border rounded-md">
                                    <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(-1)}>
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="w-12 text-center">{quantity}</span>
                                    <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(1)}>
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-lg py-6">Add to Cart</Button>

                            <Tabs defaultValue="description" className="w-full">
                                <TabsList>
                                    <TabsTrigger value="description">Description</TabsTrigger>
                                    <TabsTrigger value="brewing">Brewing Guide</TabsTrigger>
                                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                                </TabsList>
                                <TabsContent value="description" className="pt-4 text-muted-foreground">
                                    {product.longDescription || product.description}
                                </TabsContent>
                                <TabsContent value="brewing" className="pt-4 text-muted-foreground">
                                    <p>Use one teaspoon of tea per 8-ounce cup. Steep for 3-5 minutes in water that is at a rolling boil. Adjust steeping time to taste.</p>
                                </TabsContent>
                                <TabsContent value="reviews" className="pt-4 text-muted-foreground">
                                    <p>No reviews yet. Be the first to review this product!</p>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </main>
            <RelatedProducts currentProductType={product.type} currentProductId={product.id} />
            <Footer />
        </div>
    );
}

