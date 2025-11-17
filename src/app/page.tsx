import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProductsSection from '@/components/sections/ProductsSection';
import ReviewsSection from '@/components/sections/ReviewsSection';
import SubscriptionSection from '@/components/sections/SubscriptionSection';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <HeroSection />

        <div id="about">
          <AnimateOnScroll>
            <AboutSection />
          </AnimateOnScroll>
        </div>
        
        <AnimateOnScroll>
          <ProductsSection />
        </AnimateOnScroll>
        
        <AnimateOnScroll>
          <ReviewsSection />
        </AnimateOnScroll>
        
        <AnimateOnScroll>
          <SubscriptionSection />
        </AnimateOnScroll>
      </main>
      <Footer />
    </div>
  );
}
