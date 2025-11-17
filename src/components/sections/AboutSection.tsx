import Image from 'next/image';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed">
              Linton Tea began in 2003 as a single shop, founded by Mr. Linton Premawardane, and has grown into a full-scale manufacturing company. Driven by a commitment to quality and customer satisfaction, the company collects fresh teas from various high-altitude factories in Sri Lanka to create its unique, fresh blends. Now a registered company in Sri Lanka (since 2019), Linton Tea markets its products under two brands: Olinton and K&K. The company has been recognized with several prestigious awards, including the Gold award in the National Industry Excellence Awards 2023, and contributes to economic development by providing employment and supporting local customers and distributors.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
              <div className="relative w-48 h-24">
                  <Image 
                      src="https://www.olinton.lk/wp-content/uploads/2025/02/olinton.jpg" 
                      alt="Olinton Logo" 
                      fill
                      className="object-contain"
                  />
              </div>
              <div className="relative w-48 h-32">
                  <Image 
                      src="https://www.olinton.lk/wp-content/uploads/2025/02/WhatsApp-Image-2025-02-20-at-15.47.19-480x350.jpeg" 
                      alt="K&K Logo" 
                      fill
                      className="object-contain"
                  />
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
