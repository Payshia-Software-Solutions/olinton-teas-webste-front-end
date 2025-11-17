
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';

const teaTypes = [
  { name: 'Black Tea', id: 'black-tea', description: "Rich, robust, and full-bodied, our black tea is a timeless classic." },
  { name: 'Green Tea', id: 'green-tea', description: "Delicate and refreshing with a light, grassy flavor and smooth finish." },
  { name: 'White Tea', id: 'silver-tips', description: "Exquisite and rare, this tea offers a subtle, nuanced flavor with floral notes." },
];

const TeaItem = ({ name, id, description }: { name: string, id: string, description: string }) => {
  const teaImage = PlaceHolderImages.find(p => p.id === `product-${id}`);
  const [first, second] = name.split(' ');
  
  return (
    <div className="flex flex-col items-center gap-4 text-center border border-border/50 rounded-2xl p-8 h-full transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <h3 className="font-headline font-bold text-primary uppercase tracking-wider flex flex-col items-center min-h-[80px]">
        <span className="text-4xl">{first}</span>
        <span className="text-2xl font-normal">{second}</span>
      </h3>
      {teaImage && (
        <div className="w-48 h-48 relative mt-2">
          <Image
            src={teaImage.imageUrl}
            alt={name}
            fill
            className="object-cover rounded-full"
            data-ai-hint={teaImage.imageHint}
          />
        </div>
      )}
      <p className="text-muted-foreground mt-4">{description}</p>
    </div>
  );
};


export default function TeaTypesSection() {
  return (
    <section id="tea-types" className="py-20 md:py-28 bg-background">
      <div className="container">
        <AnimateOnScroll>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">A range of Finest Ceylon tea</h2>
          </div>
        </AnimateOnScroll>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-start justify-items-center">
          {teaTypes.map((tea, index) => (
            <AnimateOnScroll key={tea.id} delay={index * 100} className="w-full h-full">
                <TeaItem name={tea.name} id={tea.id} description={tea.description} />
            </AnimateOnScroll>
          ))}
        </div>

      </div>
    </section>
  );
}
