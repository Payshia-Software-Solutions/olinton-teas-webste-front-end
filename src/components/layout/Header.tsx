
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, User, ShoppingCart, Menu, Mail, Phone, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from '@/lib/utils';
import React, { useState, useEffect } from 'react';
import { useCart } from '@/hooks/use-cart';
import CartSheet from '@/components/CartSheet';

type Collection = {
  id: string;
  title: string;
};

type TeaType = {
  id: string;
  name: string;
};

const shopTeaLinks = [
    { title: "Shop All Teas", href: "/shop" },
]

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartItemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [teaTypes, setTeaTypes] = useState<TeaType[]>([]);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    const fetchData = async () => {
      try {
        const companyId = process.env.NEXT_PUBLIC_COMPANY_ID || 15;
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
        if (!serverUrl) {
          console.error("Server URL is not defined in environment variables.");
          return;
        }
        
        // Fetch Collections
        const collectionsResponse = await fetch(`${serverUrl}/collections/company?company_id=${companyId}`);
        const collectionsData = await collectionsResponse.json();
        if (collectionsResponse.ok) {
          setCollections(collectionsData);
        } else {
          console.error("Failed to fetch collections:", collectionsData);
        }

        // Fetch Categories
        const categoriesResponse = await fetch(`${serverUrl}/categories/company?company_id=${companyId}`);
        const categoriesData = await categoriesResponse.json();
        if (categoriesResponse.ok) {
          setTeaTypes(categoriesData);
        } else {
          console.error("Failed to fetch categories:", categoriesData);
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLinkClass = (href: string) => {
    const isActive = pathname === href;
    return cn(
        "bg-transparent text-lg hover:text-primary",
        isActive ? 'text-primary font-bold' : 'text-foreground/60'
    );
  };
  
  const getShopLinkClass = () => {
    const isActive = pathname.startsWith('/shop');
    return cn(
        "bg-transparent text-lg hover:text-primary",
        isActive ? 'text-primary font-bold' : 'text-foreground/60'
    );
  }
  
  const formatUrl = (title: string) => title.toLowerCase().replace(/ /g, '-');

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
       <div className={cn(
        "bg-primary text-primary-foreground transition-all duration-300 ease-in-out",
        isScrolled ? 'h-0 overflow-hidden' : 'h-10'
        )}>
        <div className="container flex h-10 items-center justify-between text-sm">
          <p className="hidden sm:block">Free Shipping On Orders Over $50</p>
          <div className="flex gap-6">
            <a href="mailto:sales@olinton.lk" className="flex items-center gap-2 hover:underline">
              <Mail className="h-4 w-4" />
              <span>sales@olinton.lk</span>
            </a>
            <a href="tel:+94114822000" className="flex items-center gap-2 hover:underline">
              <Phone className="h-4 w-4" />
              <span>+94 11 482 2000</span>
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

        <div className="hidden md:flex items-center gap-8 text-lg w-full justify-end">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link href="/" legacyBehavior passHref>
                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), getLinkClass('/'))}>
                            <span className={cn("pb-1", pathname === '/' && "border-b-2 border-primary")}>Home</span>
                        </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>

                     <NavigationMenuItem>
                        <Link href="/about" legacyBehavior passHref>
                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), getLinkClass('/about'))}>
                             <span className={cn("pb-1", pathname === '/about' && "border-b-2 border-primary")}>About</span>
                        </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger className={cn(getShopLinkClass())}>
                             <span className={cn("pb-1", pathname.startsWith('/shop') && "border-b-2 border-primary")}>Shop</span>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="bg-card text-card-foreground">
                            <ul className="grid grid-cols-3 gap-6 p-6 w-[600px]">
                                <li className="flex flex-col space-y-4">
                                    <h3 className="font-bold text-sm uppercase text-muted-foreground">Shop Tea</h3>
                                    {shopTeaLinks.map((link) => (
                                        <ListItem key={link.title} href={link.href} title={link.title} />
                                    ))}
                                </li>
                                <li className="flex flex-col space-y-4">
                                    <h3 className="font-bold text-sm uppercase text-muted-foreground">Shop by Tea</h3>
                                    {teaTypes.map((type) => (
                                        <ListItem key={type.id} href={`/shop/${formatUrl(type.name)}`} title={type.name} />
                                    ))}
                                </li>
                                <li className="flex flex-col space-y-4">
                                    <h3 className="font-bold text-sm uppercase text-muted-foreground">Shop by Collection</h3>
                                    {collections.map((collection) => (
                                        <ListItem key={collection.id} href={`/shop/collection/${formatUrl(collection.title)}`} title={collection.title} />
                                    ))}
                                </li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    
                    <NavigationMenuItem>
                        <Link href="/tea-and-health" legacyBehavior passHref>
                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), getLinkClass('/tea-and-health'))}>
                            <span className={cn("pb-1", pathname === '/tea-and-health' && "border-b-2 border-primary")}>Tea & Health</span>
                        </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <Link href="/contact" legacyBehavior passHref>
                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), getLinkClass('/contact'))}>
                            <span className={cn("pb-1", pathname === '/contact' && "border-b-2 border-primary")}>Contact</span>
                        </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>


        <div className="flex items-center gap-2 ml-auto">
          <div className="relative md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(true)}>
                <ShoppingCart className="h-6 w-6" />
                <span className="sr-only">Shopping Cart</span>
              </Button>
              {cartItemCount > 0 &&
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0 rounded-full bg-accent text-accent-foreground">
                  {cartItemCount}
                </Badge>
              }
            </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
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
              <div className="flex flex-col gap-1">
                <Link href="/" className={cn("text-base px-2 py-2", pathname === '/' ? 'text-primary font-bold' : 'text-foreground/80 hover:text-primary')}>Home</Link>
                <Link href="/about" className={cn("text-base px-2 py-2", pathname === '/about' ? 'text-primary font-bold' : 'text-foreground/80 hover:text-primary')}>About</Link>
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-b-0">
                    <AccordionTrigger className={cn("text-base px-2 py-2 hover:no-underline", pathname.startsWith('/shop') ? 'text-primary font-bold' : 'text-foreground/80 hover:text-primary')}>
                      Shop
                    </AccordionTrigger>
                    <AccordionContent className="pl-4">
                      <div className="flex flex-col gap-2">
                        <h3 className="font-bold text-sm uppercase text-muted-foreground px-2 pt-2">Shop Tea</h3>
                        {shopTeaLinks.map((link) => (
                           <Link key={link.href} href={link.href} className="text-foreground/80 hover:text-primary px-2 py-1">{link.title}</Link>
                        ))}
                        <h3 className="font-bold text-sm uppercase text-muted-foreground px-2 pt-4">Shop by Tea</h3>
                        {teaTypes.map((type) => (
                          <Link key={type.id} href={`/shop/${formatUrl(type.name)}`} className="text-foreground/80 hover:text-primary px-2 py-1">{type.name}</Link>
                        ))}
                        <h3 className="font-bold text-sm uppercase text-muted-foreground px-2 pt-4">Shop by Collection</h3>
                        {collections.map((collection) => (
                           <Link key={collection.id} href={`/shop/collection/${formatUrl(collection.title)}`} className="text-foreground/80 hover:text-primary px-2 py-1">{collection.title}</Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Link href="/tea-and-health" className={cn("text-base px-2 py-2", pathname === '/tea-and-health' ? 'text-primary font-bold' : 'text-foreground/80 hover:text-primary')}>Tea & Health</Link>
                <Link href="/contact" className={cn("text-base px-2 py-2", pathname === '/contact' ? 'text-primary font-bold' : 'text-foreground/80 hover:text-primary')}>Contact</Link>
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
              <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(true)}>
                <ShoppingCart className="h-6 w-6" />
                <span className="sr-only">Shopping Cart</span>
              </Button>
              {cartItemCount > 0 &&
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0 rounded-full bg-accent text-accent-foreground">
                  {cartItemCount}
                </Badge>
              }
            </div>
        </div>
        <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />
      </div>
      <div className="border-b border-border/40"></div>
    </header>
  );
}


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent/10 focus:bg-accent/10 text-sm group",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none text-foreground flex items-center gap-2">
            <span className="transition-opacity opacity-100">
                <ChevronDown className="h-4 w-4 -rotate-90" />
            </span>
            <span>{title}</span>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground pl-6">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

    