
"use client"

import *
as React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"


const products = [
    {
        id: 'earl-grey-supreme',
        name: 'Earl Grey Supreme',
        description: 'Classic bergamot blend with cornflower petals',
        price: '$24.99',
    },
    {
        id: 'ceylon-green',
        name: 'Ceylon Green',
        description: 'Fresh mountain green tea with delicate notes',
        price: '$22.99',
    },
    {
        id: 'silver-tips',
        name: 'Silver Tips',
        description: 'Rare white tea with subtle floral aroma',
        price: '$39.99',
    },
    {
        id: 'high-grown-oolong',
        name: 'High Grown Oolong',
        description: 'Semi-fermented tea with complex flavor profile',
        price: '$29.99',
    },
    {
        id: 'black-tea',
        name: 'Royal Black Tea',
        description: 'A robust and full-bodied classic, perfect for a morning boost. Notes of citrus and honey.',
        price: '$12.99',
    },
    {
        id: 'green-tea',
        name: 'Serene Green Tea',
        description: 'Delicate and refreshing with a light, grassy flavor and a smooth, clean finish.',
        price: '$14.99',
    },
];

export default function ProductsSection() {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )
    return (
        <section id="products" className="py-20 md:py-28 bg-white overflow-hidden">
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
                        {products.map((product) => {
                            const productImage = PlaceHolderImages.find(p => p.id === `product-${product.id}`);
                            return (
                                <CarouselItem key={product.id} className="basis-2/3 sm:basis-1/2 md:basis-[calc(100%/2.5)] lg:basis-[calc(100%/3.5)] xl:basis-[calc(100%/4.5)] pl-4 pb-8">
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
                                </CarouselItem>
                            );
                        })}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    );
}
