
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function BulkPackagingSection() {
    const bulkImage = PlaceHolderImages.find(p => p.id === 'bulk-packaging');
    const privateLabelImage = PlaceHolderImages.find(p => p.id === 'private-labeling');
    
    return (
        <section id="packaging" className="py-20 md:py-28 bg-white">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-headline text-4xl md:text-5xl font-black text-primary uppercase">Explore Our Services</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        We offer a range of services to meet the diverse needs of our clients, from bulk tea exports to private labeling solutions.
                    </p>
                </div>
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-start">
                    
                    {/* Bulk Packaging Column */}
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4 text-left">
                             <h3 className="text-2xl font-bold text-muted-foreground tracking-widest">BULK PACKAGING</h3>
                            <h2 className="text-5xl font-extrabold text-black/15 leading-tight">EXPERTLY BLENDED BULK TEA FOR EXPORT</h2>
                            <p className="text-muted-foreground pt-4">
                                O'linton Exports (Pvt.) Ltd focusses on providing an efficient and reliable service to bulk tea importers around the world who prefer to work with superior quality teas.
                            </p>
                            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">Read More</Button>
                        </div>
                        <div className="relative aspect-square">
                            {bulkImage && (
                                <Image
                                    src="https://www.olinton.lk/wp-content/uploads/2024/01/vithanakanda-katalu-1.jpg"
                                    alt="Bulk tea packaging"
                                    fill
                                    className="object-cover rounded-lg"
                                    data-ai-hint={bulkImage.imageHint}
                                />
                            )}
                        </div>
                    </div>

                    {/* Private Labeling Column */}
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                         <div className="space-y-4 text-left">
                            <h3 className="text-2xl font-bold text-muted-foreground tracking-widest">PRIVATE LABELING</h3>
                            <h2 className="text-5xl font-extrabold text-black/15 leading-tight">MULTIPLE PACKAGING OPTIONS</h2>
                            <p className="text-muted-foreground pt-4">
                                With the highest dedication and care for the quality, we undertake private label packaging in several formats such as loose leaf tea, string and tag bags, pot bags, luxury leaf tea bags.
                            </p>
                            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">Read More</Button>
                        </div>
                        <div className="relative aspect-square">
                            {privateLabelImage && (
                                <Image
                                    src="https://www.olinton.lk/wp-content/uploads/2023/12/3-scaled.jpg"
                                    alt="Private labeling process"
                                    fill
                                    className="object-cover rounded-lg"
                                    data-ai-hint={privateLabelImage.imageHint}
                                />
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
