
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
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { AnimateOnScroll } from "@/components/AnimateOnScroll"
import { MapPin, Phone, Mail } from "lucide-react"
import { useEffect } from "react";


const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export default function ContactPage() {
  const { toast } = useToast()

  useEffect(() => {
    document.title = 'Contact | Olinton - Elegance in every sip';
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We will get back to you shortly.",
    })
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
                <h1 className="font-headline text-4xl md:text-5xl font-black text-primary uppercase">Contact Us</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                  We'd love to hear from you. Whether you have a question about our teas, pricing, or anything else, our team is ready to answer all your questions.
                </p>
              </div>

              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-card p-8 rounded-lg shadow-lg">
                  <h2 className="font-headline text-3xl font-bold text-primary mb-6">Get In Touch</h2>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Your Email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Your Message" className="min-h-[150px]" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-lg py-6">Send Message</Button>
                    </form>
                  </Form>
                </div>
                <div className="bg-card p-8 rounded-lg shadow-lg">
                    <h2 className="font-headline text-3xl font-bold text-primary mb-6">Our Information</h2>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <MapPin className="h-8 w-8 mt-1 flex-shrink-0 text-primary" />
                            <div>
                                <h3 className="font-semibold text-lg">Our Address</h3>
                                <p className="text-muted-foreground">Industrial Estate, Bodhimaluwa,<br />Parakaduwa, 70550,<br />Sabaragamuwa,<br />Sri Lanka.</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <Phone className="h-8 w-8 mt-1 flex-shrink-0 text-primary" />
                            <div>
                                <h3 className="font-semibold text-lg">Phone</h3>
                                <p className="text-muted-foreground">General line: +94 11 482 2000</p>
                                <p className="text-muted-foreground">+94 11 482 2001</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <Mail className="h-8 w-8 mt-1 flex-shrink-0 text-primary" />
                            <div>
                                <h3 className="font-semibold text-lg">Email</h3>
                                 <a href="mailto:sales@olinton.lk" className="text-muted-foreground hover:text-primary transition-colors">
                                    sales@olinton.lk
                                </a>
                                <br />
                                 <a href="mailto:info@olinton.lk" className="text-muted-foreground hover:text-primary transition-colors">
                                    info@olinton.lk
                                </a>
                                <br />
                                 <a href="mailto:linttea@yahoo.com" className="text-muted-foreground hover:text-primary transition-colors">
                                  linttea@yahoo.com
                                </a>
                            </div>
                        </div>
                    </div>
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
