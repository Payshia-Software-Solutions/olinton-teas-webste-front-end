import Link from 'next/link';
import { Leaf, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="h-8 w-8" />
              <span className="font-headline text-3xl font-bold">Ceylon Delights</span>
            </Link>
            <p className="text-primary-foreground/80">
              Bringing the authentic taste of Sri Lankan tea gardens to your cup.
            </p>
          </div>
          <div>
            <h3 className="font-headline text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
                <span>123 Tea Leaf Lane, Kandy, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5" />
                <span>+94 81 234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5" />
                <a href="mailto:contact@ceylondelights.com" className="hover:underline">
                  contact@ceylondelights.com
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><Link href="#products" className="hover:underline">Products</Link></li>
              <li><Link href="#reviews" className="hover:underline">Reviews</Link></li>
              <li><a href="#" className="hover:underline">Our Story</a></li>
              <li><a href="#" className="hover:underline">FAQs</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Ceylon Delights. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
