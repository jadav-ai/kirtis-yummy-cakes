"use client"

import { motion } from "framer-motion"

type Review = { quote: string; name: string; cake: string }

const REVIEWS: Review[] = [
  {
    quote:
      "Kirti made the most gorgeous fondant cake for my daughter's birthday. Everyone kept asking who made it — I felt like a superstar!",
    name: "PRIYA M.",
    cake: "Fondant Birthday Cake",
  },
  {
    quote:
      "The 3D car cake for my son was absolutely unbelievable. Pure edible art. It tasted even better than it looked!",
    name: "RAHUL S.",
    cake: "3D Sculpted Cake",
  },
  {
    quote:
      "Ordered a custom photo cake for my parents' anniversary. The quality and detail was far beyond anything I expected.",
    name: "SNEHA K.",
    cake: "Custom Photo Cake",
  },
  {
    quote:
      "The eggless chocolate drip cake was so incredibly moist and rich — our entire family is completely obsessed. Ordering again!",
    name: "MEERA P.",
    cake: "Drip & Choco Cake",
  },
  {
    quote:
      "The wedding tier cake was an absolute showstopper. Exactly what we envisioned, down to the very last hand-piped sugar flower.",
    name: "AMIT D.",
    cake: "4-Tier Wedding Cake",
  },
  {
    quote:
      "Every single cupcake was a tiny masterpiece. Our guests couldn't stop complimenting the tower — it was stunning!",
    name: "DIVYA R.",
    cake: "Cupcake Tower",
  },
]

function Card({ r }: { r: Review }) {
  return (
    <article
      className="shrink-0 w-[300px] md:w-[360px] min-h-[240px] p-6 md:p-7 mx-3 flex flex-col justify-between rounded-2xl"
      style={{
        background: "rgba(255,248,240,0.6)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(212,175,55,0.22)",
      }}
    >
      <div>
        <div
          className="text-[14px] tracking-[0.15em]"
          style={{ color: "var(--champagne)" }}
          aria-label="5 out of 5 stars"
        >
          ★★★★★
        </div>
        <p
          className="font-serif italic text-[18px] md:text-[20px] leading-[1.65] mt-4"
          style={{ color: "var(--dark-rose)" }}
        >
          “{r.quote}”
        </p>
      </div>
      <div className="mt-6">
        <div className="text-[12px] tracking-[0.2em]" style={{ color: "var(--champagne)" }}>
          {r.name}
        </div>
        <div className="text-[11px] mt-1" style={{ color: "var(--muted)" }}>
          {r.cake}
        </div>
      </div>
    </article>
  )
}

function Row({ items, dir }: { items: Review[]; dir: "left" | "right" }) {
  // duplicate for seamless loop
  const doubled = [...items, ...items]
  return (
    <div className="marquee-pause overflow-hidden w-full">
      <div
        className={dir === "left" ? "marquee-track-left" : "marquee-track-right"}
        style={{ display: "flex", width: "max-content" }}
      >
        {doubled.map((r, i) => (
          <Card key={`${dir}-${i}`} r={r} />
        ))}
      </div>
    </div>
  )
}

export function Testimonials() {
  return (
    <section
      id="reviews"
      className="relative w-full py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: "var(--cream)" }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 text-center mb-14 md:mb-20">
        <h2
          className="font-serif text-[44px] md:text-[64px] lg:text-[80px] leading-[1.02] text-balance"
          style={{ color: "var(--dark-rose)" }}
        >
          <motion.span
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="inline-block"
          >
            What Our Happy
          </motion.span>
          <br />
          <motion.span
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
            className="inline-block italic"
            style={{ color: "var(--blush)" }}
          >
            Customers Say.
          </motion.span>
        </h2>
      </div>

      <div className="flex flex-col gap-6">
        <Row items={REVIEWS} dir="left" />
        <Row items={[...REVIEWS].reverse()} dir="right" />
      </div>
    </section>
  )
}
