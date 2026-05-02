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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Kirti's Cake Studio — Custom Cakes in Vadodara",
    template: "%s | Kirti's Cake Studio",
  },
  description:
    "Premium custom cakes in Vadodara by Kirti — sculpted, fondant, tier, theme, baby shower and chocolate drip cakes. 100% vegetarian. Order directly on WhatsApp.",
  generator: "v0.app",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kirti's Cake Studio — Custom Cakes in Vadodara",
    description:
      "Custom cakes in Vadodara: sculpted, fondant, tier, theme and chocolate drip cakes. Order on WhatsApp.",
    type: "website",
    locale: "en_IN",
    siteName: "Kirti's Cake Studio",
    images: [{ url: "/images/hero-cake.jpg", width: 1200, height: 630, alt: "Kirti's Cake Studio signature cake" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kirti's Cake Studio — Custom Cakes in Vadodara",
    description: "Premium custom cakes in Vadodara. Order on WhatsApp.",
    images: ["/images/hero-cake.jpg"],
  },
  keywords: [
    "custom cakes Vadodara",
    "best cakes in Vadodara",
    "cake baker Vadodara",
    "bakery in Vadodara",
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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Kirti's Cake Studio",
    url: siteUrl,
    telephone: "+917990797634",
    image: [`${siteUrl}/images/hero-cake.jpg`],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Vadodara",
      addressRegion: "Gujarat",
      addressCountry: "IN",
    },
    areaServed: [{ "@type": "City", name: "Vadodara" }],
    sameAs: ["https://www.instagram.com/kirtis_yummy_cake_class/"],
    priceRange: "₹₹",
    description:
      "Premium custom cakes in Vadodara — sculpted, fondant, tier, theme, baby shower, and chocolate drip cakes. 100% vegetarian. Order on WhatsApp.",
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
