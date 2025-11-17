
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';

const teaTypes = [
  { name: 'Black Tea', id: 'black-tea' },
  { name: 'Green Tea', id: 'green-tea' },
  { name: 'White Tea', id: 'silver-tips' },
];

const TeaItem = ({ name, id }: { name: string, id: string }) => {
  const teaImage = PlaceHolderImages.find(p => p.id === `product-${id}`);
  
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <h3 className="font-headline text-2xl font-bold text-primary uppercase tracking-wider">{name}</h3>
      {teaImage && (
        <div className="w-48 h-48 relative">
          <Image
            src={teaImage.imageUrl}
            alt={name}
            fill
            className="object-cover rounded-full"
            data-ai-hint={teaImage.imageHint}
          />
        </div>
      )}
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
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 items-start justify-items-center">
          {teaTypes.map((tea, index) => (
            <AnimateOnScroll key={tea.id} delay={index * 100}>
                <TeaItem name={tea.name} id={tea.id} />
            </AnimateOnScroll>
          ))}
        </div>

      </div>
    </section>
  );
}
