
'use client'

import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Script from 'next/script'

export default function MetaPixel() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const pathname = usePathname();

  useEffect(() => {
    if (pixelId && window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [pathname, pixelId]);

  if (!pixelId || pixelId === "YOUR_META_PIXEL_ID_HERE") {
    console.warn("Meta Pixel ID is not set. Please set NEXT_PUBLIC_META_PIXEL_ID in your .env.local file.");
    return null;
  }

  return (
    <>
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  )
}

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}
