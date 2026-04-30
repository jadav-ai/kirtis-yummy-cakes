"use client"

import { WA_LINK } from "../whatsapp-button"

const NAV = [
  { label: "OUR CAKES", href: "#cakes" },
  { label: "ABOUT", href: "#about" },
  { label: "REVIEWS", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "ORDER", href: WA_LINK, external: true },
]

export function Footer() {
  return (
    <footer className="relative w-full" style={{ backgroundColor: "var(--void)" }}>
      <div className="gold-rule" />
      <div className="relative grain-overlay grain-dark">
        <div className="max-w-[900px] mx-auto px-6 py-16 md:py-20 text-center">
          <h3
            className="font-script text-[36px] md:text-[44px] leading-none"
            style={{ color: "var(--champagne)" }}
          >
            Kirti&apos;s Cake Studio
          </h3>
          <p
            className="mt-3 text-[13px] tracking-wide"
            style={{ color: "rgba(253,250,246,0.4)" }}
          >
            Baked fresh. Served with love.
          </p>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 mt-8">
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                target={n.external ? "_blank" : undefined}
                rel={n.external ? "noopener noreferrer" : undefined}
                className="text-[11px] tracking-[0.2em] uppercase transition-colors"
                style={{ color: "rgba(253,250,246,0.5)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(253,250,246,0.95)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(253,250,246,0.5)")}
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="gold-rule mt-10" />

          <div className="mt-6 flex flex-col gap-1.5">
            <p className="text-[11px]" style={{ color: "rgba(253,250,246,0.3)" }}>
              © 2025 Kirti&apos;s Cake Studio · All rights reserved
            </p>
            <p
              className="text-[11px] tracking-wide"
              style={{ color: "rgba(253,250,246,0.35)" }}
            >
              Handcrafted with ♥ in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
