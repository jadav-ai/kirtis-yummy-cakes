"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

const ITEMS = [
  {
    q: "How far in advance should I place my order?",
    a: "We recommend at least 3–5 days for most cakes. For wedding or large tiered cakes, 1–2 weeks ensures we can perfect every detail for you.",
  },
  {
    q: "Are all your cakes vegetarian?",
    a: "Yes, 100% vegetarian! All our cakes are crafted with plant-based or dairy ingredients. We also offer fully vegan options — just let us know your preference when you order.",
  },
  {
    q: "Can I share a photo reference for a design?",
    a: "Yes, please do! Send us any inspiration images on WhatsApp and we'll recreate or personalise it into something uniquely yours.",
  },
  {
    q: "Do you deliver or is it pick-up only?",
    a: "We offer local delivery within the city as well as pick-up. All delivery details are sorted personally over WhatsApp when you order.",
  },
  {
    q: "What flavours are available?",
    a: "Chocolate, vanilla, red velvet, butterscotch, mango, strawberry, black forest, and rotating seasonal specials. Ask us for the full current menu!",
  },
]

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section
      id="faq"
      className="relative w-full py-24 md:py-32"
      style={{ backgroundColor: "var(--cream)" }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: ITEMS.map((it) => ({
              "@type": "Question",
              name: it.q,
              acceptedAnswer: { "@type": "Answer", text: it.a },
            })),
          }),
        }}
      />
      <div className="max-w-[800px] mx-auto px-6 md:px-10">
        <div className="text-center mb-14">
          <h2
            className="font-serif italic text-[40px] md:text-[58px] lg:text-[72px] leading-[1.05] text-balance"
            style={{ color: "var(--dark-rose)" }}
          >
            Got Questions?
          </h2>
          <p className="mt-3 text-[15px]" style={{ color: "var(--muted)" }}>
            We&apos;ve got answers.
          </p>
        </div>

        <ul className="flex flex-col">
          {ITEMS.map((it, i) => {
            const isOpen = open === i
            return (
              <li
                key={i}
                className="border-t last:border-b"
                style={{ borderColor: "rgba(212,175,55,0.25)" }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-6 py-6 md:py-7 text-left"
                  data-cursor
                >
                  <span
                    className="font-serif text-[20px] md:text-[24px] leading-[1.3]"
                    style={{ color: "var(--dark-rose)" }}
                  >
                    {it.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="font-serif text-[28px] shrink-0"
                    style={{ color: "var(--champagne)" }}
                    aria-hidden="true"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                      className="overflow-hidden"
                    >
                      <p
                        className="pb-6 md:pb-7 text-[15px] leading-[1.8] max-w-[640px]"
                        style={{ color: "var(--muted)" }}
                      >
                        {it.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
