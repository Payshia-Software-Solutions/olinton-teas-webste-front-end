
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

interface CartSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const imageServerUrl = process.env.NEXT_PUBLIC_IMAGE_SERVER_URL;

export default function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const { cart, updateQuantity, removeFromCart, cartTotal, cartItemCount } = useCart();

  const getPriceAsNumber = (price: string) => {
    return parseFloat(price.replace(/[^0-9.-]+/g,""));
  }
  
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-headline text-2xl">Shopping Cart ({cartItemCount})</SheetTitle>
        </SheetHeader>
        <Separator />
        {cart.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center">
            <p className="text-muted-foreground text-lg">Your cart is empty.</p>
            <Button asChild variant="link" onClick={() => onOpenChange(false)}>
                <Link href="/shop">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-grow -mx-6">
                <div className="px-6">
                    {cart.map((item) => {
                    const imageUrl = item.product.product_image_url ? `${imageServerUrl}${item.product.product_image_url}` : '/placeholder.jpg'
                    return (
                        <div key={item.product.id} className="flex items-center gap-4 py-4">
                        <div className="relative h-20 w-20 rounded-md overflow-hidden">
                            <Image
                            src={imageUrl}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            />
                        </div>
                        <div className="flex-grow">
                            <Link
                            href={`/shop/${item.product.id}`}
                            className="font-semibold hover:underline"
                             onClick={() => onOpenChange(false)}
                            >
                            {item.product.name}
                            </Link>
                            <p className="text-muted-foreground text-sm">LKR {item.product.price}</p>
                            <div className="flex items-center gap-2 mt-2">
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            >
                                <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                             <p className="font-semibold">
                                LKR {(getPriceAsNumber(item.product.price) * item.quantity).toFixed(2)}
                            </p>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-muted-foreground hover:text-destructive h-8 w-8"
                                onClick={() => removeFromCart(item.product.id)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                        </div>
                    );
                    })}
                </div>
            </ScrollArea>
            <Separator />
            <SheetFooter>
              <div className="w-full space-y-4">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Subtotal</span>
                  <span>LKR {cartTotal.toFixed(2)}</span>
                </div>
                <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-lg py-6" onClick={() => onOpenChange(false)}>
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
