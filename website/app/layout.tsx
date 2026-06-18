import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ClinetLayout from "@/components/client-sections/ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "optional",
  preload: false,
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
  display: "optional",
  preload: true,
});

export const metadata: Metadata = {
  title: "VIPPROW",
  description: "VIPPROW Landing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* dns-prefetch resolves the domain early without holding a TCP+TLS connection open.
            Only cloudinary is kept — it serves images that appear on scroll.
            Unsplash is removed: Lighthouse confirmed it receives zero requests on this page. */}
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />

        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NVZPK258');
          `}
        </Script>

        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){
            if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
            t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)
            }(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1305760707629374');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} antialiased bg-black`}
      >
        {/* Google Tag Manager (noscript) - must be right after body */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NVZPK258"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Meta Pixel noscript */}
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1305760707629374&ev=PageView&noscript=1"
            alt="meta-pixel"
          />
        </noscript>

        <ClinetLayout>{children}</ClinetLayout>
      </body>
    </html>
  );
}
