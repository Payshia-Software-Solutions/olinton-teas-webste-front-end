
'use client';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { AnimateOnScroll } from "@/components/AnimateOnScroll"
import { useCart } from "@/hooks/use-cart"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Separator } from "@/components/ui/separator"

const formSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  address: z.string().min(5),
  city: z.string().min(2),
  country: z.string().min(2),
  postalCode: z.string().min(4),
  cardName: z.string().min(2),
  cardNumber: z.string().min(16).max(16),
  cardExpiry: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/),
  cardCVC: z.string().min(3).max(4),
})

export default function CheckoutPage() {
  const { toast } = useToast()
  const { cart, cartTotal, cartItemCount } = useCart();
  
  const getPriceAsNumber = (price: string) => {
    return parseFloat(price.replace(/[^0-9.-]+/g,""));
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      country: "Sri Lanka",
      postalCode: "",
      cardName: "",
      cardNumber: "",
      cardExpiry: "",
      cardCVC: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    toast({
      title: "Order Placed!",
      description: "Thank you for your order. We will process it shortly.",
    })
    // Here you would typically process the payment and create the order
    form.reset()
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <AnimateOnScroll>
          <section className="py-20 md:py-28">
            <div className="container">
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="font-headline text-4xl md:text-5xl font-black text-primary uppercase">Checkout</h1>
              </div>

              <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Order Summary */}
                <div className="bg-card p-8 rounded-lg shadow-lg order-last lg:order-first">
                    <h2 className="font-headline text-3xl font-bold text-primary mb-6">Order Summary</h2>
                    <div className="space-y-4">
                        {cart.map(item => {
                            const productImage = PlaceHolderImages.find(p => p.id === `product-${item.product.id}`);
                            return (
                                <div key={item.product.id} className="flex items-center gap-4">
                                    <div className="relative h-16 w-16 rounded-md overflow-hidden border">
                                        <Image src={productImage?.imageUrl || ''} alt={item.product.name} fill className="object-cover" />
                                        <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-6 w-6 flex items-center justify-center">{item.quantity}</span>
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-semibold">{item.product.name}</p>
                                        <p className="text-sm text-muted-foreground">{item.product.price}</p>
                                    </div>
                                    <p className="font-semibold">LKR {(getPriceAsNumber(item.product.price) * item.quantity).toFixed(2)}</p>
                                </div>
                            )
                        })}
                    </div>
                    <Separator className="my-6" />
                     <div className="space-y-2">
                        <div className="flex justify-between">
                            <p className="text-muted-foreground">Subtotal</p>
                            <p>LKR {cartTotal.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-muted-foreground">Shipping</p>
                            <p>Free</p>
                        </div>
                         <div className="flex justify-between">
                            <p className="text-muted-foreground">Taxes</p>
                            <p>Calculated at next step</p>
                        </div>
                    </div>
                    <Separator className="my-6" />
                    <div className="flex justify-between font-bold text-xl">
                        <p>Total</p>
                        <p>LKR {cartTotal.toFixed(2)}</p>
                    </div>
                </div>

                {/* Checkout Form */}
                <div className="bg-card p-8 rounded-lg shadow-lg">
                  <h2 className="font-headline text-3xl font-bold text-primary mb-6">Shipping & Payment</h2>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Contact Information</h3>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl><Input placeholder="your.email@example.com" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Shipping Address</h3>
                         <div className="grid grid-cols-2 gap-4">
                             <FormField control={form.control} name="firstName" render={({ field }) => (<FormItem><FormLabel>First Name</FormLabel><FormControl><Input placeholder="John" {...field} /></FormControl><FormMessage /></FormItem>)} />
                             <FormField control={form.control} name="lastName" render={({ field }) => (<FormItem><FormLabel>Last Name</FormLabel><FormControl><Input placeholder="Doe" {...field} /></FormControl><FormMessage /></FormItem>)} />
                         </div>
                        <FormField control={form.control} name="address" render={({ field }) => (<FormItem><FormLabel>Address</FormLabel><FormControl><Input placeholder="123 Main St" {...field} /></FormControl><FormMessage /></FormItem>)} />
                         <div className="grid grid-cols-3 gap-4">
                            <FormField control={form.control} name="city" render={({ field }) => (<FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="Colombo" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="country" render={({ field }) => (<FormItem><FormLabel>Country</FormLabel><FormControl><Input placeholder="Sri Lanka" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="postalCode" render={({ field }) => (<FormItem><FormLabel>Postal Code</FormLabel><FormControl><Input placeholder="10100" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        </div>
                      </div>

                       <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Payment Details</h3>
                        <FormField control={form.control} name="cardName" render={({ field }) => (<FormItem><FormLabel>Name on Card</FormLabel><FormControl><Input placeholder="John M Doe" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="cardNumber" render={({ field }) => (<FormItem><FormLabel>Card Number</FormLabel><FormControl><Input placeholder="XXXX XXXX XXXX XXXX" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <div className="grid grid-cols-2 gap-4">
                            <FormField control={form.control} name="cardExpiry" render={({ field }) => (<FormItem><FormLabel>Expiration (MM/YY)</FormLabel><FormControl><Input placeholder="MM/YY" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="cardCVC" render={({ field }) => (<FormItem><FormLabel>CVC</FormLabel><FormControl><Input placeholder="123" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        </div>
                       </div>
                      
                      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-lg py-6">Place Order</Button>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </section>
        </AnimateOnScroll>
      </main>
      <Footer />
    </div>
  );
}
