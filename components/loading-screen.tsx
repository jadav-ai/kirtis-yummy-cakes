"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"

export function LoadingScreen() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 2600)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-void overflow-hidden"
          style={{ backgroundColor: "var(--void)" }}
          aria-hidden="true"
        >
          <div className="aurora-bg" style={{ opacity: 0.5 }} />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 flex flex-col items-center"
          >
            <motion.h1
              className="font-script text-[clamp(40px,7vw,56px)] leading-none"
              style={{ color: "var(--champagne)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
            >
              Kirti&apos;s Yummy Cakes
            </motion.h1>

            <motion.div
              className="h-px mt-4 origin-center"
              style={{
                background: "linear-gradient(90deg, transparent, var(--champagne), transparent)",
                width: "240px",
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 1.6, ease: [0.76, 0, 0.24, 1] }}
            />

            <motion.p
              className="mt-6 text-[10px] tracking-[0.45em] uppercase"
              style={{ color: "rgba(253,250,246,0.5)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 2 }}
            >
              Handcrafted with Love · India
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
