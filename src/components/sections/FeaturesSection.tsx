import { Trophy, Leaf, Globe, BadgeCheck } from 'lucide-react';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';

const features = [
  {
    icon: Trophy,
    title: 'Award-Winning Excellence',
    description: 'Recognized globally for our commitment to quality and authentic Ceylon tea craftsmanship.',
  },
  {
    icon: Leaf,
    title: 'Trusted Quality',
    description: 'Every leaf is carefully selected and processed to ensure the highest standards of purity and taste.',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Bringing the finest Ceylon tea to tea lovers across continents with sustainable practices.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-headline text-4xl md:text-5xl font-black text-primary uppercase">Why O'linton Exports</h2>
            <p className="mt-4 text-lg text-muted-foreground">
                The Company is ISO 9001:2008, ISO 14001:2004, FSSC 22000 and BRC certified, reflecting a commitment to the highest quality standards in the industry and to sustainability.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <AnimateOnScroll key={index} delay={index * 100}>
              <Card className="text-center p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                <CardContent className="p-0 flex flex-col items-center">
                  <div className="bg-accent/20 rounded-full p-4 inline-flex mb-6">
                    <div className="bg-accent rounded-full p-3">
                       <feature.icon className="h-8 w-8 text-accent-foreground" />
                    </div>
                  </div>
                  <h3 className="font-headline text-2xl font-bold text-primary mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
