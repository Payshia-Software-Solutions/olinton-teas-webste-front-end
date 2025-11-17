import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const products = [
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
  {
    id: 'herbal-tea',
    name: 'Golden Herbal Infusion',
    description: 'A caffeine-free blend of chamomile, mint, and lemongrass for ultimate relaxation.',
    price: '$10.99',
  },
];

export default function ProductsSection() {
  return (
    <section id="products" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">Our Signature Teas</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Hand-picked and expertly crafted to bring you an unparalleled tea experience.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const productImage = PlaceHolderImages.find(p => p.id === `product-${product.id}`);
            return (
              <Card key={product.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  {productImage && (
                     <div className="aspect-square relative">
                        <Image
                            src={productImage.imageUrl}
                            alt={product.name}
                            fill
                            className="object-cover rounded-t-lg"
                            data-ai-hint={productImage.imageHint}
                        />
                     </div>
                  )}
                  <CardTitle className="font-headline text-2xl pt-4">{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{product.description}</CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <p className="text-xl font-bold text-primary">{product.price}</p>
                  <Button className="bg-primary hover:bg-primary/90">Add to Cart</Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
