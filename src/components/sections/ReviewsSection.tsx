import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const reviews = [
  {
    id: 1,
    name: 'Alice Johnson',
    avatarId: 'review-avatar-1',
    rating: 5,
    comment: "Absolutely divine! The Royal Black Tea has become my daily ritual. The quality is simply unmatched.",
  },
  {
    id: 2,
    name: 'David Smith',
    avatarId: 'review-avatar-2',
    rating: 5,
    comment: "I'm so impressed with the freshness of the Serene Green Tea. It's like a peaceful garden in a cup. Highly recommended!",
  },
  {
    id: 3,
    name: 'Maria Garcia',
    avatarId: 'review-avatar-3',
    rating: 4,
    comment: "The Golden Herbal Infusion is my go-to for evenings. So calming and flavorful. I just wish the bag was bigger!",
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
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">From Our Customers</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See what tea lovers are saying about their Ceylon Delights experience.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => {
            const avatarImage = PlaceHolderImages.find(p => p.id === review.avatarId);
            return (
              <Card key={review.id} className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-0 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar>
                       {avatarImage && <AvatarImage src={avatarImage.imageUrl} alt={review.name} data-ai-hint={avatarImage.imageHint}/>}
                      <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-primary">{review.name}</p>
                      <StarRating rating={review.rating} />
                    </div>
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
