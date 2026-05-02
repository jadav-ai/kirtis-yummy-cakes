"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState, useCallback } from "react"
import { useLowPerf } from "@/hooks/use-low-perf"

export function LoadingScreen() {
  const [done, setDone] = useState(false)
  const low = useLowPerf()

  const finish = useCallback(() => {
    setDone(true)
    document.body.style.overflow = ""
    document.documentElement.style.overflow = ""
  }, [])

  useEffect(() => {
    // Lock scroll while loading
    document.body.style.overflow = "hidden"
    document.documentElement.style.overflow = "hidden"

    // standard timeout for the "wow" reveal
    const t = setTimeout(finish, 1600)

    // Fail-safe: forced removal after 4s even if something hangs
    const failSafe = setTimeout(finish, 4000)

    // Alternative: finish on window load if it happens sooner
    if (document.readyState === "complete") {
      // already loaded
    } else {
      window.addEventListener("load", finish)
    }

    return () => {
      clearTimeout(t)
      clearTimeout(failSafe)
      window.removeEventListener("load", finish)
      // ensure we don't leave the body locked if component unmounts unexpectedly
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""
    }
  }, [finish])

  return (
    <AnimatePresence mode="wait">
      {!done && (
        <motion.div
          id="global-loader"
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-void overflow-hidden"
          style={{ backgroundColor: "var(--void)" }}
          aria-hidden="true"
        >
          {/* Skip heavy aurora animation on mobile/low-perf to prevent main-thread blockage */}
          {!low && <div className="aurora-bg" style={{ opacity: 0.5 }} />}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 flex flex-col items-center"
          >
            <motion.h1
              className="font-script text-[clamp(40px,7vw,56px)] leading-none text-champagne"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            >
              Kirti&apos;s Cake Studio
            </motion.h1>

            <motion.div
              className="h-px mt-4 origin-center bg-champagne/40"
              style={{
                width: "240px",
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
            />

            <motion.p
              className="mt-6 text-[10px] tracking-[0.45em] uppercase text-ivory/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              Handcrafted with Love · VADODARA
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
