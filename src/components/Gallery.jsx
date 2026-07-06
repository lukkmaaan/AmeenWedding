import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Reveal, { RevealGroup, RevealItem } from './ui/Reveal'
import { Eyebrow } from './ui/Divider'

// Placeholder tones — swap each with a real photo path (e.g. /src/assets/gallery-1.jpg)
const images = [
  { id: 1, label: 'The Proposal', tone: 'from-olive-light to-forest' },
  { id: 2, label: 'Family Blessing', tone: 'from-forest to-olive-dark' },
  { id: 3, label: 'The Mehendi', tone: 'from-gold-dark to-forest' },
  { id: 4, label: 'Golden Hour', tone: 'from-olive to-forest-dark' },
]

export default function Gallery() {
  const [active, setActive] = useState(null)

  return (
    <section className="bg-ivory py-20 sm:py-28 md:py-32 px-5">
      <Reveal direction="up" className="mx-auto max-w-2xl text-center">
        <Eyebrow className="justify-center flex">Moments Captured</Eyebrow>
        <h2 className="mt-4 font-display text-4xl sm:text-5xl text-forest">Gallery</h2>
      </Reveal>

      <RevealGroup
        stagger={0.15}
        className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2"
      >
        {images.map((img) => (
          <RevealItem key={img.id}>
            <button
              onClick={() => setActive(img)}
              className={`group relative block w-full overflow-hidden rounded-2xl bg-gradient-to-br ${img.tone} aspect-[4/5] shadow-soft`}
            >
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors duration-500 group-hover:bg-black/25">
                <span className="font-display text-lg text-ivory/85 tracking-wide transition-transform duration-500 group-hover:scale-105">
                  {img.label}
                </span>
              </div>
            </button>
          </RevealItem>
        ))}
      </RevealGroup>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-forest-dark/90 p-6"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={`relative w-full max-w-xl overflow-hidden rounded-2xl bg-gradient-to-br ${active.tone} aspect-[4/5] shadow-card`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-2xl text-ivory/90">{active.label}</span>
              </div>
              <button
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 rounded-full bg-black/30 p-2 text-ivory transition-colors hover:bg-black/50"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
