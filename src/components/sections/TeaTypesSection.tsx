import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';

const teaTypes = [
  { name: 'Black Tea', id: 'black-tea' },
  { name: 'Green Tea', id: 'green-tea' },
  { name: 'Oolong Tea', id: 'high-grown-oolong' },
  { name: 'White Tea', id: 'silver-tips' },
  { name: 'Infusion Tea', id: 'herbal-tea' },
];

const TeaItem = ({ name, id, isTop }: { name: string, id: string, isTop: boolean }) => {
  const teaImage = PlaceHolderImages.find(p => p.id === `product-${id}`);
  const orderClass = isTop ? 'flex-col' : 'flex-col-reverse';
  const textBlock = (
    <div className="h-24 flex items-center justify-center">
      <h3 className="font-headline text-2xl font-bold text-primary text-center uppercase tracking-wider">{name}</h3>
    </div>
  );
  const imageBlock = teaImage && (
    <div className="w-48 h-48 relative">
      <Image
        src={teaImage.imageUrl}
        alt={name}
        fill
        className="object-cover rounded-full"
        data-ai-hint={teaImage.imageHint}
      />
    </div>
  );

  return (
    <div className={`flex ${orderClass} items-center gap-4`}>
      {isTop ? (
        <>
          {textBlock}
          {imageBlock}
        </>
      ) : (
        <>
          {imageBlock}
          {textBlock}
        </>
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
        
        <div className="mt-12 hidden md:grid md:grid-cols-5 gap-6 items-center justify-items-center">
          <AnimateOnScroll delay={0}>
            <TeaItem name="Black Tea" id="black-tea" isTop={false} />
          </AnimateOnScroll>
          <AnimateOnScroll delay={100}>
            <TeaItem name="Green Tea" id="green-tea" isTop={true} />
          </AnimateOnScroll>
          <AnimateOnScroll delay={200}>
            <TeaItem name="Oolong Tea" id="high-grown-oolong" isTop={false} />
          </AnimateOnScroll>
          <AnimateOnScroll delay={300}>
            <TeaItem name="White Tea" id="silver-tips" isTop={true} />
          </AnimateOnScroll>
          <AnimateOnScroll delay={400}>
            <TeaItem name="Infusion Tea" id="herbal-tea" isTop={false} />
          </AnimateOnScroll>
        </div>
        
        {/* Mobile View */}
        <div className="mt-12 grid grid-cols-2 gap-6 md:hidden">
          {teaTypes.map((tea) => {
            const teaImage = PlaceHolderImages.find(p => p.id === `product-${tea.id}`);
            return (
              <AnimateOnScroll key={tea.id}>
                <div className="text-center">
                  {teaImage && (
                    <div className="w-36 h-36 relative mx-auto mb-4">
                      <Image
                        src={teaImage.imageUrl}
                        alt={tea.name}
                        fill
                        className="object-cover rounded-full"
                        data-ai-hint={teaImage.imageHint}
                      />
                    </div>
                  )}
                  <h3 className="font-headline text-xl font-bold text-primary uppercase tracking-wider">{tea.name}</h3>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
