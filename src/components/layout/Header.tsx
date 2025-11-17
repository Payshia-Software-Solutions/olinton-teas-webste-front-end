
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
import { cn } from '@/lib/utils';
import React from 'react';

const shopTeaLinks = [
    { title: "Shop All Teas", href: "/shop" },
    { title: "Advent Calender", href: "/shop/advent-calender" },
]

const shopByTeaLinks = [
    { title: "Black Tea", href: "/shop/black-tea" },
    { title: "Green Tea", href: "/shop/green-tea" },
    { title: "Herbal Tea", href: "/shop/herbal-tea" },
]

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/shop', label: 'Shop', isMenu: true },
    { href: '/tea-and-health', label: 'Tea & Health' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm">
      <div className="bg-primary text-primary-foreground">
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
                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent text-lg", pathname === '/' ? 'text-primary font-bold underline underline-offset-4' : 'text-foreground/60 hover:text-primary')}>
                            Home
                        </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>

                     <NavigationMenuItem>
                        <Link href="/about" legacyBehavior passHref>
                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent text-lg", pathname === '/about' ? 'text-primary font-bold underline underline-offset-4' : 'text-foreground/60 hover:text-primary')}>
                            About
                        </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger className={cn("bg-transparent text-lg", pathname.startsWith('/shop') ? 'text-primary font-bold' : 'text-foreground/60 hover:text-primary')}>Shop</NavigationMenuTrigger>
                        <NavigationMenuContent className="bg-card text-card-foreground">
                            <ul className="grid grid-cols-2 gap-6 p-6 w-[400px]">
                                <li className="flex flex-col space-y-4">
                                    <h3 className="font-bold text-sm uppercase text-muted-foreground">Shop Tea</h3>
                                    {shopTeaLinks.map((link) => (
                                        <ListItem key={link.title} href={link.href} title={link.title} />
                                    ))}
                                </li>
                                <li className="flex flex-col space-y-4">
                                    <h3 className="font-bold text-sm uppercase text-muted-foreground">Shop by Tea</h3>
                                    {shopByTeaLinks.map((link) => (
                                        <ListItem key={link.title} href={link.href} title={link.title} />
                                    ))}
                                </li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    
                    <NavigationMenuItem>
                        <Link href="/tea-and-health" legacyBehavior passHref>
                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent text-lg", pathname === '/tea-and-health' ? 'text-primary font-bold underline underline-offset-4' : 'text-foreground/60 hover:text-primary')}>
                            Tea & Health
                        </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <Link href="/contact" legacyBehavior passHref>
                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent text-lg", pathname === '/contact' ? 'text-primary font-bold underline underline-offset-4' : 'text-foreground/60 hover:text-primary')}>
                            Contact
                        </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>


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
                <Link href="/" className={cn("text-lg", pathname === '/' ? 'text-primary font-bold underline underline-offset-4' : 'text-foreground/80 hover:text-primary')}>Home</Link>
                <Link href="/about" className={cn("text-lg", pathname === '/about' ? 'text-primary font-bold underline underline-offset-4' : 'text-foreground/80 hover:text-primary')}>About</Link>
                <Link href="/shop" className={cn("text-lg", pathname.startsWith('/shop') ? 'text-primary font-bold underline underline-offset-4' : 'text-foreground/80 hover:text-primary')}>Shop</Link>
                <Link href="/tea-and-health" className={cn("text-lg", pathname === '/tea-and-health' ? 'text-primary font-bold underline underline-offset-4' : 'text-foreground/80 hover:text-primary')}>Tea & Health</Link>
                <Link href="/contact" className={cn("text-lg", pathname === '/contact' ? 'text-primary font-bold underline underline-offset-4' : 'text-foreground/80 hover:text-primary')}>Contact</Link>
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

    
    