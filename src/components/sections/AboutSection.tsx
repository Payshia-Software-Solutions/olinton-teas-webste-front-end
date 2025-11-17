import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="max-w-5xl mx-auto text-center">
          <div className="space-y-4">
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">Our Story</h2>
            <div className="mt-8 mb-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                <div className="relative w-48 h-48">
                    <Image 
                        src="https://content-provider.payshia.com/olinton/olinton-removebg-preview.png" 
                        alt="Olinton Logo" 
                        fill
                        className="object-contain"
                    />
                </div>
                <div className="relative w-48 h-48">
                    <Image 
                        src="https://content-provider.payshia.com/olinton/WhatsApp-Image-2025-02-20-at-15.47.19-480x350-removebg-preview.png" 
                        alt="K&K Logo" 
                        fill
                        className="object-contain"
                    />
                </div>
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg max-w-3xl mx-auto">
              Linton Tea began in 2003 as a single shop, founded by Mr. Linton Premawardane, and has grown into a full-scale manufacturing company. Driven by a commitment to quality and customer satisfaction, the company collects fresh teas from various high-altitude factories in Sri Lanka to create its unique, fresh blends. Now a registered company in Sri Lanka (since 2019), Linton Tea markets its products under two brands: Olinton and K&K. The company has been recognized with several prestigious awards, including the Gold award in the National Industry Excellence Awards 2023, and contributes to economic development by providing employment and supporting local customers and distributors.
            </p>
            <div className="pt-6">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg py-6 px-8">
                    <Link href="/about">Learn More</Link>
                </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
