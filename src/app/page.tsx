import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProductsSection from '@/components/sections/ProductsSection';
import TeaTypesSection from '@/components/sections/TeaTypesSection';
import ReviewsSection from '@/components/sections/ReviewsSection';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import BulkPackagingSection from '@/components/sections/BulkPackagingSection';

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

        <TeaTypesSection />

        <AnimateOnScroll>
          <BulkPackagingSection />
        </AnimateOnScroll>
        
        <AnimateOnScroll>
          <ReviewsSection />
        </AnimateOnScroll>
      </main>
      <Footer />
    </div>
  );
}
