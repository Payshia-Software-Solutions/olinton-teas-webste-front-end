import Link from 'next/link';
import { Search, User, ShoppingCart, Menu, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/shop', label: 'Shop' },
  { href: '/blog', label: 'Blog' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm">
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
      
      <div className="container relative flex h-16 md:h-20 items-center justify-between">
        
        <div className="absolute left-4 top-0 z-10">
            <Link href="/" className="flex items-center justify-center bg-white p-2 rounded-b-xl shadow-lg">
                <Image
                    src="https://content-provider.payshia.com/olinton/navbar-logo.webp"
                    alt="O'linton Logo"
                    width={120}
                    height={40}
                    className="object-contain w-[160px] h-[65px] md:w-[180px] md:h-[80px]"
                />
            </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-lg w-full justify-end">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors hover:text-primary ${link.label === 'Shop' ? 'text-primary font-semibold' : 'text-foreground/60'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 ml-auto md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link href="/" className="mr-6 flex items-center space-x-2 mb-6">
                 <Image
                    src="https://content-provider.payshia.com/olinton/navbar-logo.webp"
                    alt="O'linton Logo"
                    width={120}
                    height={40}
                    className="object-contain"
                  />
              </Link>
              <div className="flex flex-col gap-4">
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

        <div className="hidden md:flex items-center gap-2">
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
      </div>
      <div className="border-b border-border/40"></div>
    </header>
  );
}
