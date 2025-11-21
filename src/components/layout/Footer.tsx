
import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer id="contact" className="bg-card text-card-foreground border-t">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div>
            <h3 className="font-headline text-lg font-semibold mb-4 uppercase tracking-wider">About O'linton</h3>
            <p className="text-muted-foreground text-sm">
              O'linton Exports (Pvt.) Ltd is a subsidiary of O'linton Group, which commenced operations in 1974, and is a well-established tea exporter with an excellent track record for trading in expertly blended and original garden teas for shipment in bulk form to blenders and packers worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-headline text-lg font-semibold mb-4 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Our Plantation</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors">Our Teas</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Teas in Bulk Packaging</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Request for Quote</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms and Conditions</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Sitemap</Link></li>
            </ul>
          </div>

          {/* Newsletter Sign-up */}
          <div>
            <h3 className="font-headline text-lg font-semibold mb-4 uppercase tracking-wider">Newsletter Sign-up</h3>
            <p className="text-muted-foreground text-sm mb-4">
              To sign up to receive our emails, fill in the following fields and hit submit. Thanks, and welcome!
            </p>
            <form className="flex flex-col gap-4">
              <div>
                <label htmlFor="email-signup" className="text-muted-foreground text-sm">Email *</label>
                <Input
                  id="email-signup"
                  type="email"
                  name="email"
                  required
                  className="mt-1 flex-grow bg-background text-foreground border-border placeholder:text-muted-foreground focus:bg-background h-10 px-3 py-2 text-sm"
                  placeholder="Your email"
                />
                <p className="text-xs text-muted-foreground/80 mt-2">* = required field</p>
              </div>
              <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
                Submit
              </Button>
            </form>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-headline text-lg font-semibold mb-4 uppercase tracking-wider">Contacts</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-4">
                <MapPin className="h-5 w-5 mt-1 flex-shrink-0 text-muted-foreground" />
                <span className="text-muted-foreground">Industrial Estate, Bodhimaluwa,<br />Parakaduwa, 70550,<br />Sabaragamuwa,<br />Sri Lanka.</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">+94 77 357 4540</span>
              </li>
               <li className="flex items-center gap-4">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">+94 70 246 1877</span>
              </li>
               <li className="flex items-center gap-4">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">+94 77 504 1464</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <a href="mailto:linttea@yahoo.com" className="text-muted-foreground hover:text-primary transition-colors">
                  linttea@yahoo.com
                </a>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <a href="mailto:linttea9@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                  linttea9@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-border/20 flex justify-between items-center text-xs text-muted-foreground/80">
          <p>&copy; {new Date().getFullYear()} O'linton Exports (Pvt) Limited. All rights reserved.</p>
          <a href="https://www.paysha.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
            Powered by Payshia Software Solutions
          </a>
        </div>
      </div>
    </footer>
  );
}
