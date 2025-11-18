
'use client'

import Script from 'next/script'

export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  if (!gaId || gaId === "YOUR_GA_ID_HERE") {
    console.warn("Google Analytics ID is not set. Please set NEXT_PUBLIC_GA_ID in your .env.local file.");
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `,
        }}
      />
    </>
  )
}
