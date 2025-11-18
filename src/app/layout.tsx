
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import WhatsAppButton from '@/components/WhatsAppButton';
import { CartProvider } from '@/hooks/use-cart';
import PageProgressBar from '@/components/PageProgressBar';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import MetaPixel from '@/components/MetaPixel';

export const metadata: Metadata = {
  title: {
    default: 'Home | Olinton - Elegance in every sip',
    template: '%s | Olinton - Elegance in every sip',
  },
  description: "Experience the finest Ceylon tea, crafted with passion and tradition. Explore our collection of premium black, green, and white teas, sourced directly from the lush plantations of Sri Lanka.",
  openGraph: {
    title: 'OLINTON Elegance in every sip',
    description: "Experience the finest Ceylon tea, crafted with passion and tradition.",
    images: [
      {
        url: 'https://content-provider.payshia.com/olinton/new-olinton-logo.webp',
        width: 1200,
        height: 630,
        alt: "O'linton Tea Logo",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OLINTON Elegance in every sip',
    description: "Experience the finest Ceylon tea, crafted with passion and tradition.",
    images: ['https://content-provider.payshia.com/olinton/new-olinton-logo.webp'],
  },
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
        <GoogleAnalytics />
        <MetaPixel />
      </head>
      <body className="font-body antialiased">
        <PageProgressBar />
        <CartProvider>
          {children}
        </CartProvider>
        <Toaster />
        <WhatsAppButton />
      </body>
    </html>
  );
}
