import { motion } from 'framer-motion'
import { Leaf } from 'lucide-react'
import Reveal from './ui/Reveal'
import { Eyebrow } from './ui/Divider'
import coupleImage from '../assets/couple.jpg'
import wedding from '../data/wedding'

function LeafDivider() {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className="h-px w-10 bg-gold/40" />
      <Leaf size={14} strokeWidth={1.5} className="text-gold/80" />
      <span className="h-px w-10 bg-gold/40" />
    </div>
  )
}

export default function Celebration() {
  return (
    <section className="bg-ivory py-20 sm:py-28 md:py-32 px-5">
      <Reveal direction="up" className="mx-auto max-w-3xl text-center">
        <Eyebrow className="justify-center flex">A Blessed Beginning</Eyebrow>
        <h2 className="mt-4 font-display text-4xl sm:text-5xl text-forest">Celebrate With Us</h2>
      </Reveal>

      <Reveal direction="none" scale duration={1.2} delay={0.15} className="mx-auto mt-12 max-w-sm sm:max-w-md">
        <div className="mx-auto aspect-[2773/3408] w-full overflow-hidden rounded-[32px] shadow-soft">
          <img
            src={coupleImage}
            alt={`${wedding.groom} and ${wedding.bride}`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </Reveal>

      <div className="mx-auto mt-14 max-w-xl space-y-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-forest/75 leading-relaxed"
        >
          We warmly invite you to celebrate one of the most cherished moments of our lives.
        </motion.p>
        <LeafDivider />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-forest/75 leading-relaxed"
        >
          Your presence, love, and prayers will make our celebration truly special.
        </motion.p>
        <LeafDivider />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-forest/75 leading-relaxed"
        >
          We look forward to celebrating together with our family and friends.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="pt-2 font-serif italic text-lg text-gold-dark"
        >
          We look forward to celebrating with you.
        </motion.p>
      </div>
    </section>
  )
}
