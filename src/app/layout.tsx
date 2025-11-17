
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import WhatsAppButton from '@/components/WhatsAppButton';
import { CartProvider } from '@/hooks/use-cart';

export const metadata: Metadata = {
  title: 'Ceylon Delights',
  description: 'Experience the finest Ceylon teas.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poppins:ital,wght@0,400;0,700;1,400;1,700&family=Roboto:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <CartProvider>
          {children}
        </CartProvider>
        <Toaster />
        <WhatsAppButton />
      </body>
    </html>
  );
}
