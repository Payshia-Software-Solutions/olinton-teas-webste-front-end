import { Leaf } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const teaTypes = [
  { name: 'Black Tea' },
  { name: 'Green Tea' },
  { name: 'White Tea' },
  { name: 'Infusion Tea' },
  { name: 'Oolong Tea' },
];

export default function TeaTypesSection() {
  return (
    <section id="tea-types" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">A range of Finest Ceylon tea</h2>
        </div>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {teaTypes.map((tea) => (
            <Card key={tea.name} className="text-center p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0 flex flex-col items-center justify-center h-full">
                <div className="bg-accent/20 rounded-full p-3 inline-flex mb-4">
                  <Leaf className="h-7 w-7 text-accent-foreground" />
                </div>
                <h3 className="font-headline text-xl font-bold text-primary">{tea.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
