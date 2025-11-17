
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import { Award, Trophy } from 'lucide-react';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import FeaturesSection from '@/components/sections/FeaturesSection';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';

const awards = [
  {
    award: 'Gold Award',
    event: 'National Industry Excellence Awards 2023',
    icon: Trophy,
    color: 'text-yellow-500',
  },
  {
    award: 'Silver Award',
    event: 'Sabaragamuwa Province Best Entrepreneur of the Year 2022',
    icon: Trophy,
    color: 'text-slate-400',
  },
  {
    award: 'Silver Award',
    event: 'Sabaragamuwa Province Best Entrepreneur of the Year 2024',
    icon: Trophy,
    color: 'text-slate-400',
  },
  {
    award: 'Bronze Award',
    event: 'National Industry Excellence Awards 2022',
    icon: Trophy,
    color: 'text-orange-600',
  },
  {
    award: 'Bronze Award',
    event: 'Sabaragamuwa Province Best Entrepreneur of the Year 2020',
    icon: Trophy,
    color: 'text-orange-600',
  },
];


export default function AboutPage() {
    const aboutHeroImage = PlaceHolderImages.find(p => p.id === 'hero-plantation');

    return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        
        <section className="relative h-[50vh] w-full bg-primary">
            {aboutHeroImage && (
                <Image
                    src={aboutHeroImage.imageUrl}
                    alt="Lush tea plantation"
                    fill
                    className="object-cover"
                    data-ai-hint={aboutHeroImage.imageHint}
                />
            )}
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 flex h-full items-center justify-center text-center">
                <AnimateOnScroll>
                    <h1 className="font-headline text-5xl md:text-7xl font-bold text-white shadow-lg">
                        About O'linton
                    </h1>
                </AnimateOnScroll>
            </div>
        </section>


        <AnimateOnScroll>
            <section className="py-20 md:py-28">
                <div className="container">
                    <div className="grid md:grid-cols-12 gap-12 items-center">
                        <div className="md:col-span-7 space-y-6 text-lg text-muted-foreground">
                            <p>
                                Linton Tea began its journey amid many challenges in 2003 with just one shop. Despite obstacles, under the guidance of founder Mr. Linton Premawardane, the company’s dedication to quality and customer satisfaction drove its growth. Mr. Linton Premawardane is a physical science bachelor holder from the University of Sri Jayawardanapura, Sri Lanka, while his wife is a Divisional Secretary of Sri Lanka; his two sons are currently studying for their bachelor degrees in medicine and surgery. The passion for this field had motivated him to enter the world of elixirs.
                            </p>
                            <p>
                                To make a non-comparable blend, Linton tea factory collects fresh teas from a wide range of factories in this precious island, some of them are from 4000 feet above the sea level. That is the secret lies in the uniqueness and the freshness in a sip of Linton tea. Under the guidance of professional and well experienced tea tasters Linton tea remains the same indulgence of taste with better improvements.
                            </p>
                            <p>
                                In 2019, Linton Tea factory has registered as a systematic company in Democratic Socialist Republic of Sri Lanka. Now, Linton tea is in the market in two brands: Olinton and K&K. Expanding from a small shop to a full-scale manufacturing operation, providing vital employment opportunities through these twenty years. By supporting local customers and distributors focusing on sustainable practices, the company not only thrived but also contributed to the economic development of the country.
                            </p>
                        </div>
                        <div className="md:col-span-5">
                            <Card className="shadow-lg">
                                <CardContent className="p-6">
                                    <Image
                                        src="https://content-provider.payshia.com/olinton/linton-premawardana.webp"
                                        alt="Mr. Linton Premawardane"
                                        width={500}
                                        height={600}
                                        className="object-cover rounded-lg"
                                    />
                                    <h3 className="font-headline text-xl font-bold text-primary mt-4 text-center">Mr. Linton Premawardane</h3>
                                    <p className="text-center text-muted-foreground">Founder of Linton Tea</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </AnimateOnScroll>
        
        <FeaturesSection />

        <AnimateOnScroll>
            <section className="py-20 md:py-28 bg-card">
                <div className="container">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="font-headline text-4xl md:text-5xl font-black text-primary uppercase">Awards & Recognition</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Through this journey ‘To be the leader of quality marketing’ as in the vision, Linton tea has been honored with some prestigious awards. The gold award from National Industry Excellence Awards 2023 was a pivotal moment, propelling us to new heights and reinforcing the trust our customers placed in us.
                    </p>
                </div>
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {awards.map((award, index) => (
                    <AnimateOnScroll key={index} delay={index * 100}>
                        <div className="flex items-center gap-6 p-6 border rounded-lg h-full">
                            <award.icon className={`h-12 w-12 flex-shrink-0 ${award.color}`} />
                            <div>
                                <h3 className="font-headline text-xl font-bold text-primary">{award.award}</h3>
                                <p className="text-muted-foreground">{award.event}</p>
                            </div>
                        </div>
                    </AnimateOnScroll>
                    ))}
                </div>
                 <p className="text-center text-lg text-muted-foreground mt-16 max-w-3xl mx-auto">
                    Today, Linton tea company stands as a symbol of resilience, prosperity and bright future for communities nationwide.
                </p>
                </div>
            </section>
        </AnimateOnScroll>

      </main>
      <Footer />
    </div>
  );
}
