

"use client"

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { type ApiProduct, type Product } from '@/lib/products';
import { useCart } from '@/hooks/use-cart';
import { useToast } from "@/hooks/use-toast"
import { Skeleton } from '../ui/skeleton';

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

export default function ProductsSection() {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    );
    const { toast } = useToast();
    const { addToCart } = useCart();
    const [products, setProducts] = React.useState<ApiProduct[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    
    React.useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const companyId = process.env.NEXT_PUBLIC_COMPANY_ID;
                if (!serverUrl || !companyId) {
                    console.error("Server URL or Company ID is not defined in environment variables.");
                    setIsLoading(false);
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
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleAddToCart = (e: React.MouseEvent, product: Product) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product, 1);
        toast({
            title: "Added to cart",
            description: `${product.name} has been added to your cart.`,
        });
    }

    return (
        <section id="products" className="py-20 md:py-28 bg-white dark:bg-card overflow-hidden">
            <div className="container">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="font-headline text-4xl md:text-5xl font-black text-primary uppercase">Our Finest Teas.</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Discover our premium collection of Ceylon teas
                    </p>
                </div>
            </div>
            <div className="mt-12 pl-8 pr-0 sm:pl-16 md:pl-20 lg:pl-32">
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
                        {isLoading ? (
                             [...Array(5)].map((_, i) => (
                                <CarouselItem key={i} className="basis-2/3 sm:basis-1/2 md:basis-[calc(100%/2.5)] lg:basis-[calc(100%/3.5)] xl:basis-[calc(100%/4.5)] pl-4 pb-8">
                                    <ProductCardSkeleton />
                                </CarouselItem>
                             ))
                        ) : products.map((p) => {
                            const product = p.product;
                            const frontImage = p.product_images.find(img => img.image_type === 'front img');
                            const secondImage = p.product_images.find(img => img.image_type === '2nd image');
                            const imageUrl = frontImage ? `${imageServerUrl}${frontImage.img_url}` : '/placeholder.jpg';
                            const hoverImageUrl = secondImage ? `${imageServerUrl}${secondImage.img_url}` : imageUrl;
                            
                            return (
                                <CarouselItem key={product.id} className="basis-2/3 sm:basis-1/2 md:basis-[calc(100%/2.5)] lg:basis-[calc(100%/3.5)] xl:basis-[calc(100%/4.5)] pl-4 pb-8">
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
                                            <CardContent className="flex-grow p-6 text-left">
                                                <CardTitle className="font-headline text-2xl truncate">{product.name}</CardTitle>
                                                <CardDescription className="mt-2 line-clamp-2">{product.description}</CardDescription>
                                            </CardContent>
                                            <CardFooter className="flex justify-between items-center px-6 pb-6">
                                                <p className="text-xl font-bold text-accent">LKR {product.price}</p>
                                                <Button onClick={(e) => handleAddToCart(e, product)} className="bg-primary hover:bg-primary/90">Add to Cart</Button>
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
    );
}
