"use client"

import { useState, useEffect, useCallback } from "react"
import { AnimatePresence, motion } from "framer-motion"

export function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)

  const fadeOut = useCallback(() => {
    setFading(true)
    setTimeout(() => {
      setVisible(false)
    }, 600) // match the exit animation duration
  }, [])

  useEffect(() => {
    const timer = setTimeout(fadeOut, 2000)
    return () => clearTimeout(timer)
  }, [fadeOut])

  if (!visible) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-charcoal-deep"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ opacity: fading ? undefined : 1 }}
        >
          {/* Dossier stamp box */}
          <motion.div
            className="flex items-center justify-center w-24 h-24 border-2 border-gold/60"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <span className="font-display text-5xl text-gold leading-none select-none">
              R
            </span>
          </motion.div>

          {/* "WHERE EVIL DWELLS" subtitle */}
          <motion.p
            className="font-mono-dossier tracking-label text-paper-mute/40 text-xs mt-6 uppercase select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Where Evil Dwells
          </motion.p>

          {/* "CLASSIFIED DOSSIER — LOADING..." with blinking cursor */}
          <motion.p
            className="font-mono-dossier tracking-label-sm text-paper-mute/30 text-[10px] mt-3 uppercase select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            Classified Dossier — Loading
            <span className="inline-block w-[1px] h-3 bg-gold/60 align-middle ml-[2px] animate-[caret-blink_1.1s_step-end_infinite]" />
          </motion.p>

          {/* Gold horizontal line sweep */}
          <motion.div
            className="rule-gold w-48 mt-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 1.2, ease: "easeInOut" }}
            style={{ transformOrigin: "left" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}