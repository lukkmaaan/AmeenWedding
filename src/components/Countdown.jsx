import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from './ui/Reveal'
import { Eyebrow } from './ui/Divider'
import wedding from '../data/wedding'

function getTimeLeft() {
  const target = new Date(wedding.weddingDateISO).getTime()
  const now = Date.now()
  const diff = Math.max(0, target - now)

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return { days, hours, minutes, seconds }
}

function TimeUnit({ value, label, isLast = false }) {
  return (
    <div
      className={`flex flex-1 flex-col items-center justify-center px-1 py-6 sm:py-8 md:py-10 ${
        !isLast ? 'border-r border-gold/25' : ''
      }`}
    >
      <div className="relative h-11 sm:h-14 md:h-16 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -18, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="block font-display text-4xl sm:text-5xl md:text-6xl text-ivory tabular-nums"
          >
            {String(value).padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2 text-[0.6rem] sm:text-xs uppercase tracking-wider sm:tracking-widest2 text-gold-light">
        {label}
      </span>
    </div>
  )
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft())

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="bg-olive py-20 sm:py-28 md:py-32 px-5">
      <Reveal direction="up" className="mx-auto max-w-3xl text-center">
        <Eyebrow className="justify-center flex">Our Special Day</Eyebrow>
        <h2 className="mt-4 font-display text-4xl sm:text-5xl text-ivory">Counting Down</h2>
      </Reveal>

      <Reveal
        direction="none"
        scale
        delay={0.2}
        className="mx-auto mt-12 max-w-2xl rounded-sm border border-gold/30 bg-forest/40 shadow-[0_0_60px_-10px_rgba(201,166,107,0.15)]"
      >
        <div className="flex divide-x-0">
          <TimeUnit value={time.days} label="Days" />
          <TimeUnit value={time.hours} label="Hours" />
          <TimeUnit value={time.minutes} label="Minutes" />
          <TimeUnit value={time.seconds} label="Seconds" isLast />
        </div>
      </Reveal>

      <Reveal direction="up" delay={0.3} className="mt-8 text-center">
        <p className="text-xs sm:text-sm uppercase tracking-widest2 text-ivory/70">
          {wedding.day} {wedding.month} {wedding.year} • {wedding.time}
        </p>
      </Reveal>
    </section>
  )
}
