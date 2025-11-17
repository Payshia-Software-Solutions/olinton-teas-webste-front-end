"use client";

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Leaf } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

async function subscribeUser(prevState: any, formData: FormData) {
  const email = formData.get('email');
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return { message: "Please enter a valid email address.", success: false };
  }
  
  // Simulate API call
  console.log(`New subscriber: ${email}`);
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return { message: 'Thank you for subscribing!', success: true };
}

const initialState = {
  message: "",
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button 
      type="submit" 
      aria-disabled={pending}
      className="bg-accent text-accent-foreground hover:bg-accent/90"
    >
      {pending ? "Subscribing..." : "Subscribe"}
    </Button>
  );
}

export default function SubscriptionSection() {
  const [state, formAction] = useFormState(subscribeUser, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? 'Success!' : 'Oops!',
        description: state.message,
        variant: state.success ? 'default' : 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <Leaf className="h-12 w-12 text-accent mx-auto mb-4" />
          <h2 className="font-headline text-4xl md:text-5xl font-bold">Stay in the Loop</h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Subscribe to our newsletter for new arrivals, exclusive offers, and the latest trends in the world of tea.
          </p>
          <form action={formAction} className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              name="email"
              placeholder="Enter your email address"
              required
              className="flex-grow bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 placeholder:text-primary-foreground/60 focus:bg-primary-foreground/20"
            />
            <SubmitButton />
          </form>
        </div>
      </div>
    </section>
  );
}
