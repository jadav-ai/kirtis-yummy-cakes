"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { WhatsAppIcon, WA_LINK } from "./whatsapp-button"

export function MobileFab() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.9)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          key="fab"
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-[55] pulse-blush flex items-center gap-2 px-5 py-3 rounded-full shadow-lg"
          style={{
            background: "var(--blush)",
            color: "var(--dark-rose)",
          }}
        >
          <WhatsAppIcon size={18} />
          <span className="font-script text-[20px] leading-none pt-1">Order on WhatsApp</span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
