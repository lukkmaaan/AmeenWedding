import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import wedding from '../data/wedding'
import marbleBg from '../assets/marble-bg.jpg'

export default function Hero() {
  const marbleRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    // Slow ambient drift on the marble background, independent of scroll.
    const driftTween = gsap.to(marbleRef.current, {
      backgroundPosition: '52% 48%',
      scale: 1.06,
      duration: 18,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })

    // Subtle mouse parallax.
    const section = sectionRef.current
    function handleMove(e) {
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth - 0.5) * 14
      const y = (e.clientY / innerHeight - 0.5) * 14
      gsap.to(marbleRef.current, {
        x,
        y,
        duration: 1.2,
        ease: 'power2.out',
      })
    }
    section?.addEventListener('mousemove', handleMove)

    return () => {
      driftTween.kill()
      section?.removeEventListener('mousemove', handleMove)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] w-full overflow-hidden flex flex-col items-center justify-center"
    >
      <div
        ref={marbleRef}
        className="absolute -inset-6 bg-cover bg-[position:48%_52%] will-change-transform"
        style={{ backgroundImage: `url(${marbleBg})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/55" aria-hidden="true" />
      <div className="absolute inset-0 bg-grain" aria-hidden="true" style={{ position: 'absolute' }} />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-5 sm:gap-8"
        >
          <span className="font-display text-6xl sm:text-8xl md:text-9xl text-ivory">
            {wedding.initials[0]}
          </span>
          <span className="h-px w-8 sm:w-12 bg-gold" />
          <span className="font-display text-6xl sm:text-8xl md:text-9xl text-ivory">
            {wedding.initials[1]}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 flex items-center gap-3"
        >
          <span className="h-px w-8 bg-gold/60" />
          <span className="eyebrow tracking-widest3 text-gold-light">
            {wedding.day} {wedding.month.toUpperCase()} {wedding.year}
          </span>
          <span className="h-px w-8 bg-gold/60" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 text-[0.7rem] sm:text-xs uppercase tracking-widest2 text-ivory/85"
        >
          {wedding.groom} &amp; {wedding.bride}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-9 z-10 flex flex-col items-center gap-3"
      >
        <span className="text-[0.65rem] uppercase tracking-widest2 text-ivory/70">
          Scroll to Begin
        </span>
        <span className="relative h-10 w-px overflow-hidden bg-ivory/20">
          <span className="absolute inset-x-0 top-0 h-full w-full origin-top bg-gold animate-scrollLine" />
        </span>
      </motion.div>
    </section>
  )
}
