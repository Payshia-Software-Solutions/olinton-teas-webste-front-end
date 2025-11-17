
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const healthBenefits = [
    "Strengthens immune system",
    "Aids in cancer prevention",
    "Helps manage cholesterol",
    "Supports cardiovascular health",
    "Reduces risk of stroke",
    "Promotes dental health",
];


export default function TeaAndHealthPage() {
    const heroImage = PlaceHolderImages.find(p => p.id === 'tea-health-hero');
    const contentImage = PlaceHolderImages.find(p => p.id === 'tea-health-benefits');
    const historyImage = PlaceHolderImages.find(p => p.id === 'history-ceylon-tea');

    return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        
        <section className="relative h-[50vh] w-full bg-primary">
            {heroImage && (
                <Image
                    src={heroImage.imageUrl}
                    alt="A cup of healthy tea"
                    fill
                    className="object-cover"
                    data-ai-hint={heroImage.imageHint}
                />
            )}
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 flex h-full items-center justify-center text-center">
                <AnimateOnScroll>
                    <h1 className="font-headline text-5xl md:text-7xl font-bold text-white shadow-lg">
                        Tea & Health
                    </h1>
                </AnimateOnScroll>
            </div>
        </section>


        <AnimateOnScroll>
            <section className="py-20 md:py-28">
                <div className="container">
                    <div className="grid md:grid-cols-12 gap-12 items-center">
                        <div className="md:col-span-7 space-y-6 text-lg text-muted-foreground">
                            <h2 className="font-headline text-3xl font-bold text-primary">The Ancient Beverage for Modern Wellness</h2>
                            <p>
                                Since ancient times, people have enjoyed the medical benefits of tea. Even today, many people are turning to tea not only as a tasty and relaxing beverage but also as an aid to fighting many serious diseases. Tea contains a lot more chemicals, including organic acids, polyphenols, volatile compounds, etc. A perfectly brewed cup of tea contains the greatest concentration of antioxidants. It helps to prevent many spreading diseases by strengthening the immune system.
                            </p>
                            <p>
                                Research conducted by highly respected universities and institutes throughout the world has tested the effect of tea consumption on many different ailments and diseases, including cancer (particularly colon, stomach, pancreatic, bladder, esophageal, and breast cancer), rheumatoid arthritis, high cholesterol levels (tea is thought to increase the good HDL cholesterol and lower the bad LDL cholesterol), obesity, osteoporosis, cardiovascular disease, stroke, infection, tooth decay, Alzheimer’s disease, the effects of smoking, and impairment of the immune system. Results have varied widely; study after study.
                            </p>
                        </div>
                        <div className="md:col-span-5">
                            {contentImage && (
                                <Card className="shadow-lg rounded-2xl overflow-hidden">
                                    <CardContent className="p-0">
                                        <Image
                                            src={contentImage.imageUrl}
                                            alt="Herbal ingredients for healthy tea"
                                            width={500}
                                            height={600}
                                            className="object-cover"
                                            data-ai-hint={contentImage.imageHint}
                                        />
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </AnimateOnScroll>
        
        <AnimateOnScroll>
            <section className="py-20 md:py-28 bg-card">
                <div className="container">
                    <div className="grid md:grid-cols-12 gap-12 items-center">
                         <div className="md:col-span-5">
                            {historyImage && (
                                <Card className="shadow-lg rounded-2xl overflow-hidden">
                                    <CardContent className="p-0">
                                        <Image
                                            src={historyImage.imageUrl}
                                            alt="Vintage Ceylon tea plantation"
                                            width={500}
                                            height={600}
                                            className="object-cover"
                                            data-ai-hint={historyImage.imageHint}
                                        />
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                        <div className="md:col-span-7 space-y-6 text-lg text-muted-foreground">
                            <h2 className="font-headline text-3xl font-bold text-primary">The History of Ceylon Tea</h2>
                            <p>
                                Ceylon tea, known for its wide range of flavors and aromatic qualities which is non-comparable, it originates from Sri Lanka, a small island off the southeastern coast of India, which was once called Ceylon. Tea was first introduced to the island by the British in the early 19th century, around 1824 for commercial purposes. Before that, the island had mainly grown coffee. However, the coffee had destroyed by a leaf disease, then the planters had chosen tea (Camellia sinensis) as an alternative.
                            </p>
                            <p>
                                James Taylor, a Scots planter, is credited with starting the tea industry in Ceylon. In 1867, he established the first successful tea plantation in Loolecondera estate, field No.7 (as he called it) in the central highlands of Sri Lanka. He had taught himself the method of manufacture by trial and error. The high altitude and cool climate of the region proved perfect for tea cultivation, and soon Ceylon tea was popular among lot of tea lovers all over the world.
                            </p>
                            <p>
                                By the late 1800s, the industry had grown significantly, with the investments of British and local entrepreneurs. The development of railways and other methods of transportations allowed to handover fresh tea leaves to the world, further boosting the industry. By the 20th century, Ceylon tea played a majestic role in the world. Today, Ceylon tea is still produced in Sri Lanka and is enjoyed globally. The country remains one of the top producers of tea, The legacy of Ceylon tea is not just in its taste but also in its role in shaping Sri Lanka’s economy and history.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </AnimateOnScroll>
        
        <AnimateOnScroll>
            <section className="py-20 md:py-28 bg-background">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="font-headline text-4xl md:text-5xl font-black text-primary uppercase">Key Health Benefits</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Incorporating tea into your daily routine can offer a multitude of health benefits, supported by both ancient wisdom and modern science.
                        </p>
                    </div>
                    <div className="mt-16 max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {healthBenefits.map((benefit, index) => (
                                <AnimateOnScroll key={index} delay={index * 100}>
                                    <div className="flex items-center gap-4 p-4 bg-card rounded-lg shadow-sm">
                                        <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                                        <span className="text-muted-foreground">{benefit}</span>
                                    </div>
                                </AnimateOnScroll>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </AnimateOnScroll>

      </main>
      <Footer />
    </div>
  );
}
