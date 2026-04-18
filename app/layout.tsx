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
  title: "Kirti's Yummy Cakes — Handcrafted Cakes, Baked With Love",
  description:
    "Premium homemade cakes crafted by Kirti in India. 3D sculpted, fondant, tiered wedding, drip, cupcake tower, eggless and theme cakes. Order directly on WhatsApp.",
  generator: "v0.app",
  openGraph: {
    title: "Kirti's Yummy Cakes",
    description: "Every cake is a memory. Handcrafted with love — order on WhatsApp.",
    type: "website",
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
  return (
    <html lang="en" className={`${cormorant.variable} ${greatVibes.variable} ${dmSans.variable} bg-cream`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
