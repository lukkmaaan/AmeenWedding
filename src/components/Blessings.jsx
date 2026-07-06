import Reveal from './ui/Reveal'
import { Eyebrow } from './ui/Divider'
import wedding from '../data/wedding'

export default function Blessings() {
  return (
    <section className="bg-forest py-20 sm:py-28 md:py-32 px-5">
      <Reveal direction="up" className="mx-auto max-w-xl text-center">
        <Eyebrow className="justify-center flex">A Prayer For Us</Eyebrow>
        <h2 className="mt-4 font-display text-3xl sm:text-4xl text-ivory">Blessings</h2>

        <p dir="rtl" className="mt-10 font-arabic text-2xl sm:text-3xl leading-loose text-gold-light">
          {wedding.dua.arabic}
        </p>
        <p className="mt-6 text-sm sm:text-base italic text-ivory/70 leading-relaxed">
          {wedding.dua.translation}
        </p>
        <p className="mt-3 text-[0.65rem] uppercase tracking-widest2 text-gold/70">
          — {wedding.dua.reference} —
        </p>
      </Reveal>
    </section>
  )
}
