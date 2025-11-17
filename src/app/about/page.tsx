
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import { Milestone } from 'lucide-react';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const awards = [
  {
    award: 'Gold Award',
    event: 'National Industry Excellence Awards 2023',
    imageUrl: 'https://content-provider.payshia.com/olinton/national-industry-excellence-2023.webp',
  },
  {
    award: 'Silver Award',
    event: 'Sabaragamuwa Province Best Entrepreneur of the Year 2022',
    imageUrl: 'https://content-provider.payshia.com/olinton/sabaragamuwa-best-entrpreneur-2022.webp',
  },
  {
    award: 'Silver Award',
    event: 'Sabaragamuwa Province Best Entrepreneur of the Year 2024',
    imageUrl: 'https://content-provider.payshia.com/olinton/sabaragamuwa-bet-enterprenuer-2024.webp',
  },
  {
    award: 'Bronze Award',
    event: 'National Industry Excellence Awards 2022',
    imageUrl: 'https://content-provider.payshia.com/olinton/national-industry-excellence-2022.webp',
  },
  {
    award: 'Bronze Award',
    event: 'Sabaragamuwa Province Best Entrepreneur of the Year 2020',
    imageUrl: 'https://content-provider.payshia.com/olinton/sabaragamuwa-best-entrrepeneur-2020.webp',
  },
];

const timelineEvents = [
    {
        year: '2003',
        title: 'Humble Beginnings',
        description: 'Started as a small tea shop founded by Mr. Linton Premawardane, introducing the very first brand, K&K, to bring quality Ceylon tea to local communities.',
    },
    {
        year: '2006',
        title: 'Local Expansion',
        description: 'Steadily grew into a recognized local business, earning trust for its pure taste and commitment to authenticity.',
    },
    {
        year: '2019',
        title: 'Official Registration',
        description: 'Registered as Linton Tea (Pvt) Ltd, marking a major milestone in the company’s transformation into a professional, family-driven enterprise.',
    },
    {
        year: '2020',
        title: 'Bronze Award Winner',
        description: 'Honored with the Bronze Award at the Sabaragamuwa Province Best Entrepreneur of the Year 2020, recognizing excellence in regional entrepreneurship.',
    },
    {
        year: '2022',
        title: 'National Recognition',
        description: 'Achieved two prestigious awards: Bronze Award – National Industry Excellence Awards 2022 and Silver Award – Sabaragamuwa Province Best Entrepreneur of the Year 2022.',
    },
    {
        year: '2023',
        title: 'Gold Achievement',
        description: 'Proudly received the Gold Award at the National Industry Excellence Awards 2023, celebrating dedication to quality and innovation.',
    },
    {
        year: '2024',
        title: 'Continued Excellence',
        description: 'Recognized again with the Silver Award in the Sabaragamuwa Province Best Entrepreneur of the Year 2024, reflecting consistent progress and leadership in Sri Lanka’s tea industry.',
    },
]


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
                        <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl">
                            <CardHeader>
                                <div className="aspect-video relative">
                                    <Image
                                        src={award.imageUrl}
                                        alt={award.event}
                                        fill
                                        className="object-contain rounded-t-2xl"
                                    />
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow p-6 text-center">
                                <CardTitle className="font-headline text-xl text-primary">{award.award}</CardTitle>
                                <p className="text-muted-foreground mt-2">{award.event}</p>
                            </CardContent>
                        </Card>
                    </AnimateOnScroll>
                    ))}
                </div>
                 <p className="text-center text-lg text-muted-foreground mt-16 max-w-3xl mx-auto">
                    Today, Linton tea company stands as a symbol of resilience, prosperity and bright future for communities nationwide.
                </p>
                </div>
            </section>
        </AnimateOnScroll>

        <AnimateOnScroll>
            <section className="py-20 md:py-28 bg-background">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="font-headline text-4xl md:text-5xl font-black text-primary uppercase">Our Journey</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                           From humble beginnings to a celebrated name in Ceylon tea, follow the journey of Linton Tea.
                        </p>
                    </div>

                    <div className="relative mt-20 max-w-5xl mx-auto">
                        <div className="absolute left-1/2 top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>
                        {timelineEvents.map((event, index) => (
                            <div key={index} className="relative mb-16">
                                <div className="flex items-center">
                                    <div className={`flex-1 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                                       {/* Spacer for alignment */}
                                    </div>
                                    <div className="absolute left-1/2 -translate-x-1/2 bg-background z-10 p-1">
                                        <div className="h-6 w-6 rounded-full bg-primary ring-8 ring-background flex items-center justify-center">
                                            <Milestone className="h-4 w-4 text-primary-foreground"/>
                                        </div>
                                    </div>
                                     <div className={`flex-1 ${index % 2 === 1 ? 'pr-8 text-right' : 'pl-8'}`}>
                                         {/* Spacer for alignment */}
                                     </div>
                                </div>

                                <div className={`mt-4 flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                                         <AnimateOnScroll className={index % 2 === 0 ? 'text-right' : 'text-left'}>
                                            <p className="font-headline text-3xl font-bold text-accent">{event.year}</p>
                                            <h3 className="font-headline text-2xl font-semibold text-primary mt-2">{event.title}</h3>
                                            <p className="mt-2 text-muted-foreground">{event.description}</p>
                                         </AnimateOnScroll>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </AnimateOnScroll>

      </main>
      <Footer />
    </div>
  );
}
