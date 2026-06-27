import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, Great_Vibes, DM_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
})

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kirtiscakestudio.com"),
  title: {
    default: "Best Cakes & Bakery in Vadodara / Baroda | Kirti's Cake Studio",
    template: "%s | Kirti's Cake Studio",
  },
  description:
    "Voted the best bakery in Vadodara / Baroda. Premium custom cakes by Kirti — sculpted, fondant, tier, theme, baby shower, and chocolate drip cakes. 100% vegetarian. Order on WhatsApp.",
  generator: "v0.app",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Best Cakes & Bakery in Vadodara / Baroda | Kirti's Cake Studio",
    description:
      "Voted the best bakery in Vadodara / Baroda. Premium custom cakes by Kirti — sculpted, fondant, tier, theme, baby shower, and chocolate drip cakes. 100% vegetarian. Order on WhatsApp.",
    type: "website",
    locale: "en_IN",
    siteName: "Kirti's Cake Studio",
    images: [{ url: "/images/hero-cake.jpg", width: 1200, height: 630, alt: "Kirti's Cake Studio signature cake" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Cakes & Bakery in Vadodara / Baroda | Kirti's Cake Studio",
    description: "Voted the best bakery in Vadodara / Baroda. Premium custom cakes by Kirti. 100% vegetarian. Order on WhatsApp.",
    images: ["/images/hero-cake.jpg"],
  },
  keywords: [
    "custom cakes Vadodara",
    "best cakes in Vadodara",
    "best cakes in Baroda",
    "cake baker Vadodara",
    "bakery in Vadodara",
    "best bakery in Vadodara",
    "best bakery in Baroda",
    "theme cakes Vadodara",
    "wedding cakes Vadodara",
    "fondant cakes Vadodara",
    "chocolate drip cakes Vadodara",
  ],
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#1A0A0E",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kirtiscakestudio.com"

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Kirti's Cake Studio",
    url: siteUrl,
    logo: `${siteUrl}/icon.png`,
    telephone: "+917990797634",
    image: [`${siteUrl}/images/hero-cake.jpg`],
    priceRange: "₹₹",
    description:
      "Recognized as the best bakery in Vadodara / Baroda for premium 100% vegetarian custom cakes. Specializing in sculpted, fondant, theme, and wedding cakes. Handcrafted with love.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Vadodara",
      addressRegion: "Gujarat",
      postalCode: "390001",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "22.3072",
      longitude: "73.1812",
    },
    areaServed: [
      { "@type": "City", name: "Vadodara" },
      { "@type": "City", name: "Baroda" },
      { "@type": "City", name: "Alkapuri" },
      { "@type": "City", name: "Gotri" },
      { "@type": "City", name: "Akota" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "10:00",
        closes: "21:00",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+917990797634",
      contactType: "customer service",
      availableLanguage: ["English", "Hindi", "Gujarati"],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "84",
      bestRating: "5",
    },
    review: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Priya M." },
        reviewBody: "Gorgeous fondant cake for my daughter's birthday. Pure edible art!",
        reviewRating: { "@type": "Rating", ratingValue: "5" },
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Irfan Pathan" },
        reviewBody: "Amazing cake for my birthday. Every detail was perfect.",
        reviewRating: { "@type": "Rating", ratingValue: "5" },
      },
    ],
    sameAs: ["https://www.instagram.com/kirtis_yummy_cake_class/"],
  }

  return (
    <html lang="en" className={`${cormorant.variable} ${greatVibes.variable} ${dmSans.variable} bg-cream`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          // JSON-LD must be a string. Keep it deterministic for crawling.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        {process.env.NODE_ENV === "development" && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  const style = document.createElement('style');
                  style.innerHTML = '[data-nextjs-static-indicator], [data-nextjs-static-indicator-container], #nextjs-static-indicator-root { display: none !important; visibility: hidden !important; opacity: 0 !important; pointer-events: none !important; }';
                  document.head.appendChild(style);
                  
                  const removeIndicators = () => {
                    const indicators = document.querySelectorAll('[data-nextjs-static-indicator], [data-nextjs-static-indicator-container], #nextjs-static-indicator-root');
                    indicators.forEach(el => el.remove());
                  };
                  
                  const observer = new MutationObserver(removeIndicators);
                  observer.observe(document.documentElement, { childList: true, subtree: true });
                  removeIndicators();
                })();
              `,
            }}
          />
        )}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('error', function() {
                const loader = document.getElementById('global-loader');
                if (loader) {
                  loader.style.display = 'none';
                  document.body.style.overflow = '';
                  document.documentElement.style.overflow = '';
                }
              });
            `,
          }}
        />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
