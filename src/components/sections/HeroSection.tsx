import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Leaf, ArrowDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden h-[calc(100vh-6rem)]">
      <video
        src="https://www.olinton.lk/wp-content/uploads/2023/12/WhatsApp-Video-2023-12-28-at-16.01.19.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <div className="flex justify-center items-center mb-4">
          <Leaf className="h-10 w-10 text-white/90 -mr-2 transform -rotate-45" />
          <Leaf className="h-10 w-10 text-white/90 transform rotate-45" />
        </div>
        <h1 className="font-headline text-5xl md:text-7xl font-bold leading-tight shadow-md">
          Elevating Moments,<br /> Redefining Excellence.
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl text-white/90">
          Experience the finest Ceylon tea, crafted with passion and tradition.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-7 px-10">
            <Link href="#products">Browse Our Teas</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground text-lg py-7 px-10">
            <Link href="/about">Learn More</Link>
          </Button>
        </div>

        <Link href="#features" className="absolute bottom-8 z-20 animate-bounce">
          <ArrowDown className="h-8 w-8 text-white/80 hover:text-white transition-colors" />
          <span className="sr-only">Scroll down</span>
        </Link>
      </div>
    </section>
  );
}