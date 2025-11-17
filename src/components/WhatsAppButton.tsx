"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <Link 
      href="https://wa.me/94114822000"
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-6 right-6 z-50 p-3 rounded-full bg-green-500 shadow-lg hover:bg-green-600 transition-all duration-300 transform",
        isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
      )}
    >
      <div className="relative h-8 w-8">
        <Image
          src="https://content-provider.payshia.com/olinton/social%20(1)-optimized.webp"
          alt="WhatsApp"
          fill
          className="object-contain"
        />
      </div>
      <span className="sr-only">Chat on WhatsApp</span>
    </Link>
  );
}
