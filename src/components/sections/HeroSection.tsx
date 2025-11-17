import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

export default function HeroSection() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-plantation');

  return (
    <section className="relative h-screen w-full">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-primary/60" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-primary-foreground px-4">
        <h1 className="font-headline text-5xl md:text-7xl font-bold leading-tight shadow-md">
          The Soul of Ceylon in Every Sip
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl text-primary-foreground/90">
          Discover the rich heritage and exquisite flavors of the world's finest teas, direct from the lush gardens of Sri Lanka.
        </p>
        <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-7 px-10">
          <Link href="#products">Explore Our Teas</Link>
        </Button>
      </div>
    </section>
  );
}
