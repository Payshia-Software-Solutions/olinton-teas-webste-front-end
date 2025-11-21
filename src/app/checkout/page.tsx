
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
import { useCart } from "@/hooks/use-cart"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AlertTriangle, CreditCard } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect } from "react";

// This is a client component, so we can't use static metadata.
// We can set the title using useEffect, but it's not ideal for SEO.
// For a better SEO approach, this page could be refactored to be a server component
// that wraps a client component for the form.
// For now, we'll set it on the client.
if (typeof document !== 'undefined') {
  document.title = "Checkout | Olinton - Elegance in every sip";
}


const formSchema = z.object({
  email: z.string().email(),
  emailOffers: z.boolean().default(false),
  country: z.string().min(2),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  address: z.string().min(5),
  apartment: z.string().optional(),
  city: z.string().min(2),
  postalCode: z.string().min(4),
  phone: z.string().optional(),
  saveInfo: z.boolean().default(false),
  billingAddress: z.enum(['same', 'different']).default('same'),
  paymentMethod: z.enum(['payhere', 'cod']).default('payhere'),
  discountCode: z.string().optional(),
})

const imageServerUrl = process.env.NEXT_PUBLIC_IMAGE_SERVER_URL;

export default function CheckoutPage() {
  const { toast } = useToast()
  const { cart, cartTotal } = useCart();
  
  const getPriceAsNumber = (price: string) => {
    return parseFloat(price.replace(/[^0-9.-]+/g,""));
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      emailOffers: false,
      country: "Sri Lanka",
      firstName: "",
      lastName: "",
      address: "",
      apartment: "",
      city: "",
      postalCode: "",
      phone: "",
      saveInfo: false,
      billingAddress: 'same',
      paymentMethod: 'payhere',
      discountCode: "",
    },
  })
    
  useEffect(() => {
    document.title = "Checkout | Olinton - Elegance in every sip";
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    toast({
      title: "Order Placed!",
      description: "Thank you for your order. We will process it shortly.",
    })
    form.reset()
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow bg-slate-50">
        <div className="container py-12 md:py-16">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24">

              {/* Left Column: Form */}
              <div className="order-last lg:order-first space-y-8">
                
                {/* Contact */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-lg">Contact</h2>
                    <p className="text-sm">
                      Have an account? <Link href="/login" className="text-primary hover:underline">Log in</Link>
                    </p>
                  </div>
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormControl><Input placeholder="Enter your email" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="emailOffers" render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                      <FormLabel className="font-normal text-sm">Email me with news and offers</FormLabel>
                    </FormItem>
                  )} />
                </div>

                {/* Delivery */}
                <div className="space-y-4">
                  <h2 className="font-semibold text-lg">Delivery</h2>
                  <FormField control={form.control} name="country" render={({ field }) => (
                    <FormItem>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Country/Region" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Sri Lanka">Sri Lanka</SelectItem>
                          <SelectItem value="USA">United States</SelectItem>
                          <SelectItem value="UK">United Kingdom</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="firstName" render={({ field }) => (<FormItem><FormControl><Input placeholder="First name (optional)" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="lastName" render={({ field }) => (<FormItem><FormControl><Input placeholder="Last name (optional)" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  </div>
                  <FormField control={form.control} name="address" render={({ field }) => (<FormItem><FormControl><Input placeholder="Address" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="apartment" render={({ field }) => (<FormItem><FormControl><Input placeholder="Apartment, suite, etc. (optional)" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="city" render={({ field }) => (<FormItem><FormControl><Input placeholder="City" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="postalCode" render={({ field }) => (<FormItem><FormControl><Input placeholder="Postal Code" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  </div>
                  <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormControl><Input placeholder="Phone" {...field} /></FormControl><FormMessage /></FormItem>)} />
                   <FormField control={form.control} name="saveInfo" render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                      <FormLabel className="font-normal text-sm">Save this information for next time</FormLabel>
                    </FormItem>
                  )} />
                </div>

                {/* Billing Address */}
                <div>
                  <h2 className="font-semibold text-lg mb-4">Billing Address</h2>
                  <FormField control={form.control} name="billingAddress" render={({ field }) => (
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-3">
                      <FormItem className="flex items-center space-x-3 space-y-0 p-4 border rounded-md has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
                        <FormControl><RadioGroupItem value="same" /></FormControl>
                        <FormLabel className="font-normal">Same as shipping address</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0 p-4 border rounded-md has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
                        <FormControl><RadioGroupItem value="different" /></FormControl>
                        <FormLabel className="font-normal">Use a different billing address</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  )} />
                </div>

                 {/* Payment */}
                <div className="space-y-4 pt-8">
                  <h2 className="font-semibold text-lg">Payment</h2>
                   <p className="text-sm text-muted-foreground">All transactions are secure and encrypted.</p>
                   <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-3">
                      <div className="border rounded-md has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
                        <FormItem className="flex items-center space-x-3 space-y-0 p-4">
                          <FormControl><RadioGroupItem value="payhere" /></FormControl>
                          <FormLabel className="font-normal flex justify-between w-full items-center">
                            <span>Bank Card / Bank Account - PayHere</span>
                            <CreditCard className="h-5 w-5 text-muted-foreground" />
                          </FormLabel>
                        </FormItem>
                         <div className="border-t p-4 text-sm text-muted-foreground">
                          After clicking "Pay now", you will be redirected to Bank Card / Bank Account - PayHere to complete your purchase securely.
                        </div>
                      </div>
                      <FormItem className="flex items-center space-x-3 space-y-0 p-4 border rounded-md has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
                        <FormControl><RadioGroupItem value="cod" /></FormControl>
                        <FormLabel className="font-normal">Cash On Delivery</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  )} />
                </div>
              </div>

              {/* Right Column: Summary */}
              <div className="space-y-8">
                <div className="bg-card p-6 rounded-lg shadow-sm border">
                  <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
                  <div className="space-y-4">
                    {cart.map(item => {
                        const imageUrl = item.product.product_image_url ? `${imageServerUrl}${item.product.product_image_url}` : '/placeholder.jpg'
                        return (
                            <div key={item.product.id} className="flex items-center gap-4">
                                <div className="relative h-16 w-16 rounded-md overflow-hidden border">
                                    <Image src={imageUrl} alt={item.product.name} fill className="object-cover" />
                                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-6 w-6 flex items-center justify-center">{item.quantity}</span>
                                </div>
                                <div className="flex-grow">
                                    <p className="font-semibold">{item.product.name}</p>
                                    <p className="text-sm text-muted-foreground">{item.product.price} x {item.quantity}</p>
                                </div>
                                <p className="font-semibold">LKR {(getPriceAsNumber(item.product.price) * item.quantity).toFixed(2)}</p>
                            </div>
                        )
                    })}
                  </div>
                  <Separator className="my-6" />
                  <div className="flex gap-4">
                      <FormField control={form.control} name="discountCode" render={({ field }) => (
                        <FormItem className="flex-grow"><FormControl><Input placeholder="Discount code or gift card" {...field} /></FormControl></FormItem>
                      )} />
                      <Button type="button" variant="secondary" disabled={!form.watch('discountCode')}>Apply</Button>
                  </div>
                   <Separator className="my-6" />
                   <div className="space-y-2">
                      <div className="flex justify-between">
                          <p className="text-muted-foreground">Subtotal</p>
                          <p>LKR {cartTotal.toFixed(2)}</p>
                      </div>
                      <div className="flex justify-between">
                          <p className="text-muted-foreground">Shipping</p>
                          <p>Rs 0.00</p>
                      </div>
                  </div>
                  <Separator className="my-6" />
                  <div className="flex justify-between font-bold text-lg">
                      <p>Total</p>
                      <p>LKR {cartTotal.toFixed(2)}</p>
                  </div>
                </div>
                
                <Alert variant="destructive" className="bg-yellow-100 border-yellow-300 text-yellow-800">
                  <AlertTriangle className="h-4 w-4 !text-yellow-800" />
                  <AlertTitle className="font-bold">Important Notice</AlertTitle>
                  <AlertDescription>
                    Please do not close your tab or browser after completing your payment. Kindly remain on this tab/browser until you are redirected to the order confirmation page to ensure that your transaction is processed successfully.
                  </AlertDescription>
                </Alert>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-lg py-6">Place the order</Button>
              </div>

            </form>
          </Form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

    