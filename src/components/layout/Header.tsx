import Link from 'next/link';
import { Search, User, ShoppingCart, Menu, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '#products', label: 'Teas' },
  { href: '/blog', label: 'Blog' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white">
      <div className="bg-primary text-primary-foreground">
        <div className="container flex h-10 items-center justify-between text-sm">
          <p className="hidden sm:block">Free Shipping On Orders Over $50</p>
          <div className="flex gap-6">
            <a href="mailto:contact@ceylondelights.com" className="flex items-center gap-2 hover:underline">
              <Mail className="h-4 w-4" />
              <span>contact@ceylondelights.com</span>
            </a>
            <a href="tel:+94812345678" className="hidden md:flex items-center gap-2 hover:underline">
              <Phone className="h-4 w-4" />
              <span>+94 81 234 5678</span>
            </a>
          </div>
        </div>
      </div>
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center gap-2 mr-auto">
          <Image
            src="https://content-provider.payshia.com/olinton/navbar-logo.webp"
            alt="O'linton Logo"
            width={120}
            height={40}
            className="object-contain"
          />
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-lg mx-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors hover:text-primary ${link.label === 'Teas' ? 'text-primary font-semibold' : 'text-foreground/60'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 ml-auto">
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Search className="h-6 w-6" />
              <span className="sr-only">Search</span>
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-6 w-6" />
              <span className="sr-only">Account</span>
            </Button>
            <div className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-6 w-6" />
                <span className="sr-only">Shopping Cart</span>
              </Button>
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0 rounded-full bg-accent text-accent-foreground">
                2
              </Badge>
            </div>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link href="/" className="mr-6 flex items-center space-x-2">
                 <Image
                    src="https://content-provider.payshia.com/olinton/navbar-logo.webp"
                    alt="O'linton Logo"
                    width={120}
                    height={40}
                    className="object-contain"
                  />
              </Link>
              <div className="flex flex-col gap-4 mt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg text-foreground/80 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
