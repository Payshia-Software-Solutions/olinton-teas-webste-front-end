
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function BulkPackagingSection() {
    return (
        <section id="packaging" className="py-20 md:py-28 bg-white dark:bg-card">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-headline text-4xl md:text-5xl font-black text-primary uppercase">Explore Our Services</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        We offer a range of services to meet the diverse needs of our clients, from bulk tea exports to private labeling solutions.
                    </p>
                </div>
                <div className="grid lg:grid-cols-2 gap-8 items-stretch">
                    
                    {/* Bulk Packaging Card */}
                    <div className="grid md:grid-cols-2 overflow-hidden rounded-lg">
                        <div className="p-8 flex flex-col justify-center">
                            <h3 className="text-xl font-bold text-muted-foreground tracking-widest">BULK PACKAGING</h3>
                            <h2 className="text-4xl font-extrabold text-black/15 dark:text-white/15 leading-tight mt-2">EXPERTLY BLENDED BULK TEA FOR EXPORT</h2>
                            <p className="text-muted-foreground pt-4">
                                O'linton Exports (Pvt.) Ltd focusses on providing an efficient and reliable service to bulk tea importers around the world who prefer to work with superior quality teas.
                            </p>
                            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 mt-6 self-start">Read More</Button>
                        </div>
                        <div className="relative min-h-[300px] md:min-h-0">
                            <Image
                                src="https://content-provider.payshia.com/olinton/bulk-packaging.webp"
                                alt="Bulk tea packaging"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Private Labeling Card */}
                    <div className="grid md:grid-cols-2 overflow-hidden rounded-lg">
                         <div className="p-8 flex flex-col justify-center">
                            <h3 className="text-xl font-bold text-muted-foreground tracking-widest">PRIVATE LABELING</h3>
                            <h2 className="text-4xl font-extrabold text-black/15 dark:text-white/15 leading-tight mt-2">MULTIPLE PACKAGING OPTIONS</h2>
                            <p className="text-muted-foreground pt-4">
                                With the highest dedication and care for the quality, we undertake private label packaging in several formats such as loose leaf tea, string and tag bags, pot bags, luxury leaf tea bags.
                            </p>
                            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 mt-6 self-start">Read More</Button>
                        </div>
                        <div className="relative min-h-[300px] md:min-h-0">
                            <Image
                                src="https://content-provider.payshia.com/olinton/private-labellng.webp"
                                alt="Private labeling process"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
