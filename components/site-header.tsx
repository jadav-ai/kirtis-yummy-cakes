"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { WhatsAppButton } from "./whatsapp-button"

const NAV = [
  { label: "OUR CAKES", href: "#cakes" },
  { label: "ABOUT", href: "#about" },
  { label: "REVIEWS", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 2.8, ease: [0.76, 0, 0.24, 1] }}
        className="fixed top-0 left-0 right-0 z-[60] flex justify-center pointer-events-none"
      >
        <div
          className={[
            "pointer-events-auto flex items-center gap-8 transition-[background-color,border-color] duration-500",
            "mt-4 md:mt-6 px-5 md:px-7 py-2.5 md:py-3 rounded-full border",
            scrolled
              ? "border-[rgba(212,175,55,0.25)]"
              : "border-transparent",
          ].join(" ")}
          style={{
            // Use a more opaque solid color when scrolled (no blur cost),
            // and a thin tint when at top. backdrop-filter dropped to 8px
            // — cheap on Iris Xe, still legible over the dark hero.
            background: scrolled
              ? "rgba(26,10,14,0.55)"
              : "rgba(255,248,240,0.04)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          {/* Monogram */}
          <a
            href="#top"
            className="font-serif font-medium text-[14px] md:text-[16px] tracking-[0.25em]"
            style={{ color: "var(--champagne)" }}
          >
            KCS
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="relative text-[11px] tracking-[0.2em] uppercase group"
                style={{ color: "rgba(253,250,246,0.82)" }}
              >
                {n.label}
                <span
                  className="absolute left-0 -bottom-1 h-px w-full origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100"
                  style={{ background: "var(--champagne)" }}
                />
              </a>
            ))}
          </nav>

          {/* CTA desktop */}
          <div className="hidden md:block">
            <WhatsAppButton
              variant="outline"
              magneticStrength={12}
              className="px-5 py-2 text-[13px] rounded-full"
            >
              ORDER ON WHATSAPP
            </WhatsAppButton>
          </div>

          {/* Hamburger mobile */}
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden relative w-7 h-6 flex flex-col justify-between"
            data-cursor
          >
            <span
              className="block h-px w-full transition-transform duration-300"
              style={{
                background: "var(--ivory)",
                transform: menuOpen ? "translateY(11px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block h-px w-full transition-opacity duration-300"
              style={{ background: "var(--ivory)", opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block h-px w-full transition-transform duration-300"
              style={{
                background: "var(--ivory)",
                transform: menuOpen ? "translateY(-12px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile 3-panel split menu */}
      <AnimatePresence>
        {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </>
  )
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const links = [
    { label: "HOME", href: "#top" },
    { label: "OUR CAKES", href: "#cakes" },
    { label: "ABOUT", href: "#about" },
    { label: "REVIEWS", href: "#reviews" },
    { label: "FAQ", href: "#faq" },
    { label: "ORDER", href: "https://wa.me/917990797634" },
    { label: "INSTAGRAM", href: "https://www.instagram.com/kirtis_yummy_cake_class/" },
  ]
  return (
    <motion.div
      className="fixed inset-0 z-[100] md:hidden flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Left darkened page */}
      <motion.div
        className="flex-[0_0_35%] relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ background: "rgba(26,10,14,0.7)", backdropFilter: "blur(4px)" }}
      />
      {/* Middle panel blush */}
      <motion.div
        className="flex-[0_0_10%]"
        style={{ background: "var(--blush)" }}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
      />
      {/* Right panel cream + nav */}
      <motion.div
        className="flex-1 flex flex-col justify-between p-8 pt-20"
        style={{ background: "var(--cream)" }}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.6, delay: 0.05, ease: [0.76, 0, 0.24, 1] }}
      >
        <button
          aria-label="Close menu"
          onClick={onClose}
          className="self-end text-[11px] tracking-[0.3em] uppercase px-4 py-2 rounded-full border"
          style={{ borderColor: "var(--dark-rose)", color: "var(--dark-rose)" }}
        >
          CLOSE ×
        </button>
        <nav className="flex flex-col gap-2">
          {links.map((l, i) => (
            <motion.a
              key={l.href}
              href={l.href}
              onClick={onClose}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.25 + i * 0.07,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="font-serif text-[44px] leading-[1.05]"
              style={{ color: "var(--dark-rose)" }}
            >
              {l.label}
            </motion.a>
          ))}
        </nav>
        <div
          className="text-[10px] tracking-[0.35em] uppercase pt-6"
          style={{ color: "var(--muted)" }}
        >
          Kirti&apos;s Cake Studio · Vadodara
        </div>
      </motion.div>
    </motion.div>
  )
}
