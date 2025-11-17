import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Nimali Perera',
    rating: 5,
    comment: "Truly the taste of home. The aroma of O'linton's black tea reminds me of the beautiful tea estates in Nuwara Eliya. Superb quality!",
  },
  {
    id: 2,
    name: 'Rohan Jayasuriya',
    rating: 5,
    comment: "As a lifelong tea drinker in Colombo, I can say this is one of the finest Ceylon teas I have ever had. The flavour is authentic and robust.",
  },
  {
    id: 3,
    name: 'Anusha Fernando',
    rating: 4,
    comment: "I gifted a pack of the silver tips to my family abroad, and they were amazed. It's a wonderful representation of Sri Lankan quality. Thank you!",
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1 text-accent">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`h-5 w-5 ${i < rating ? 'fill-current' : 'text-muted'}`} />
    ))}
  </div>
);

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-20 md:py-28 bg-card">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary uppercase">From Our Customers</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See what tea lovers are saying about their Ceylon Delights experience.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => {
            return (
              <Card key={review.id} className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-0 flex flex-col h-full">
                  <div className="mb-4">
                    <p className="font-semibold text-primary">{review.name}</p>
                    <StarRating rating={review.rating} />
                  </div>
                  <blockquote className="italic text-muted-foreground flex-grow">
                    "{review.comment}"
                  </blockquote>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
