
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProductsSection from '@/components/sections/ProductsSection';
import TeaTypesSection from '@/components/sections/TeaTypesSection';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import BulkPackagingSection from '@/components/sections/BulkPackagingSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Home | O'linton - Elegance in every sip",
};


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
          <FeaturesSection />
        </AnimateOnScroll>
      </main>
      <Footer />
    </div>
  );
}

    