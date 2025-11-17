import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const teaTypes = [
  { name: 'Black Tea', id: 'black-tea' },
  { name: 'Green Tea', id: 'green-tea' },
  { name: 'White Tea', id: 'silver-tips' },
  { name: 'Infusion Tea', id: 'herbal-tea' },
  { name: 'Oolong Tea', id: 'high-grown-oolong' },
];

export default function TeaTypesSection() {
  return (
    <section id="tea-types" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">A range of Finest Ceylon tea</h2>
        </div>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {teaTypes.map((tea) => {
            const teaImage = PlaceHolderImages.find(p => p.id === `product-${tea.id}`);
            return (
                <Card key={tea.name} className="text-center overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-0 flex flex-col items-center justify-center h-full">
                        {teaImage && (
                            <div className="w-full h-48 relative">
                                <Image
                                    src={teaImage.imageUrl}
                                    alt={tea.name}
                                    fill
                                    className="object-cover"
                                    data-ai-hint={teaImage.imageHint}
                                />
                            </div>
                        )}
                        <div className="p-4">
                            <h3 className="font-headline text-xl font-bold text-primary">{tea.name}</h3>
                        </div>
                    </CardContent>
                </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
