"use client"

import { motion } from "framer-motion"
import Image from "next/image"

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
      "The vegan chocolate drip cake was so incredibly moist and rich — our entire family is completely obsessed. Ordering again!",
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

function FeaturedReview() {
  return (
    <div className="mx-auto max-w-[1000px] mb-24 md:mb-32 flex flex-col md:flex-row items-center gap-10 md:gap-16 px-6">
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full md:w-1/2 flex justify-center"
      >
        <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
          <Image 
            src="/images/reviews/irfan-pathan.jpg" 
            alt="Irfan Pathan with Kirti's Cake" 
            fill 
            className="object-cover" 
            sizes="(max-width: 768px) 100vw, 380px"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-[rgba(255,255,255,0.2)] rounded-2xl"></div>
        </div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="w-full md:w-1/2 text-center md:text-left"
      >
        <h3 className="text-[12px] tracking-[0.2em] uppercase mb-4" style={{ color: "var(--champagne)" }}>
          Featured Customer
        </h3>
        <p className="font-serif italic text-[28px] md:text-[36px] leading-[1.3]" style={{ color: "var(--dark-rose)" }}>
          "Trusted by Celebrities. Loved by Everyone."
        </p>
        <p className="mt-6 text-[15px] leading-relaxed" style={{ color: "var(--muted)" }}>
          We were honored to bake a special birthday cake for former Indian cricketer Irfan Pathan. Every cake we make receives the same star treatment and dedication to perfection.
        </p>
        <div className="mt-8">
          <div className="text-[18px] font-medium tracking-wide" style={{ color: "var(--void)" }}>
            Irfan Pathan
          </div>
          <div className="text-[13px] mt-1" style={{ color: "var(--champagne)" }}>
            Former Indian Cricketer
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function WhatsAppGallery() {
  const screenshots = [
    "/images/reviews/wa-1.jpg", 
    "/images/reviews/wa-2.jpg", 
    "/images/reviews/wa-3.jpg", 
    "/images/reviews/wa-4.jpg"
  ]
  return (
    <div className="mb-24 md:mb-32">
      <div className="text-center mb-12 px-6">
        <h3 className="font-serif italic text-[28px] md:text-[36px] leading-[1.3]" style={{ color: "var(--dark-rose)" }}>
          Real Words. Real Smiles.
        </h3>
        <p className="text-[13px] mt-3 tracking-[0.1em] uppercase" style={{ color: "var(--champagne)" }}>
          Straight from our WhatsApp chats
        </p>
      </div>
      
      <div className="flex overflow-x-auto hide-scroll snap-x snap-mandatory px-6 md:px-12 pb-6 gap-6 md:gap-8 items-center">
        {/* Empty spacer for centering first item on mobile if needed */}
        <div className="shrink-0 w-1 md:w-[10vw] snap-center"></div>
        
        {screenshots.map((src, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="shrink-0 w-[260px] md:w-[300px] snap-center relative rounded-xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-transform hover:-translate-y-2 duration-300 border border-[rgba(212,175,55,0.1)]"
          >
            <Image 
              src={src} 
              alt={`Customer WhatsApp Review ${i+1}`} 
              width={300} 
              height={600} 
              className="w-full h-auto object-contain" 
            />
          </motion.div>
        ))}
        
        {/* Empty spacer for centering last item on mobile if needed */}
        <div className="shrink-0 w-1 md:w-[10vw] snap-center"></div>
      </div>
      
      {/* Swipe indicator for mobile */}
      <div className="flex md:hidden justify-center gap-1.5 mt-2 opacity-40">
        <div className="text-[10px] tracking-[0.2em] uppercase">Swipe to see more</div>
      </div>
    </div>
  )
}

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
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 text-center mb-16 md:mb-24">
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

      <FeaturedReview />
      
      <WhatsAppGallery />

      <div className="flex flex-col gap-6">
        <div className="text-center mb-6">
           <h3 className="text-[12px] tracking-[0.2em] uppercase" style={{ color: "var(--champagne)" }}>
             More Sweet Words
           </h3>
        </div>
        
        {/* Desktop: Marquees */}
        <div className="hidden md:flex flex-col gap-6">
          <Row items={REVIEWS} dir="left" />
          <Row items={[...REVIEWS].reverse()} dir="right" />
        </div>

        {/* Mobile: Slidable Track */}
        <div className="flex md:hidden overflow-x-auto hide-scroll snap-x snap-mandatory px-6 pb-6 gap-5">
          {REVIEWS.map((r, i) => (
            <div key={`mobile-review-${i}`} className="shrink-0 snap-center">
              <Card r={r} />
            </div>
          ))}
        </div>
        <div className="flex md:hidden justify-center gap-1.5 opacity-40">
           <div className="text-[10px] tracking-[0.2em] uppercase">Swipe to read more</div>
        </div>
      </div>
    </section>
  )
}
