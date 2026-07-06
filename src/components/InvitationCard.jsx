import Reveal from './ui/Reveal'
import { LineDivider, Eyebrow } from './ui/Divider'
import wedding from '../data/wedding'

function CornerLeaf({ className = '' }) {
  return (
    <div className={`absolute h-24 w-24 rotate-45 bg-forest-light/40 ${className}`} aria-hidden="true">
      <svg viewBox="0 0 100 100" className="h-full w-full p-4 opacity-40">
        <path
          d="M50 10 C 65 30, 65 50, 50 90 C 35 50, 35 30, 50 10 Z"
          fill="none"
          stroke="#C9A66B"
          strokeWidth="1"
        />
        <path d="M50 20 L50 80" stroke="#C9A66B" strokeWidth="0.6" />
      </svg>
    </div>
  )
}

export default function InvitationCard() {
  return (
    <section className="relative bg-forest py-20 sm:py-28 md:py-32 px-5 overflow-hidden">
      <CornerLeaf className="-left-10 -top-10 sm:left-4 sm:top-10" />
      <CornerLeaf className="-right-10 -bottom-10 sm:right-6 sm:bottom-12" />

      <Reveal direction="up" duration={1.1} className="relative mx-auto max-w-invitation">
        <div className="relative rounded-sm border border-gold/70 p-1.5 shadow-card">
          <div className="card-border relative rounded-[2px] bg-ivory px-7 py-12 sm:px-12 sm:py-16">
            {/* Arabic verse */}
            <div className="text-center">
              <p dir="rtl" className="font-arabic text-3xl sm:text-4xl text-gold-dark leading-relaxed">
                {wedding.arabicVerse}
              </p>
              <p className="mt-4 text-[0.7rem] tracking-widest2 uppercase text-forest/60">
                {wedding.verseTranslation}
              </p>
              <p className="mt-1 text-[0.65rem] tracking-widest2 uppercase text-gold-dark/80">
                — {wedding.verseReference} —
              </p>
            </div>

            <p className="mt-10 text-center eyebrow text-gold-dark">
              Together With Their Families
            </p>

            <h2 className="mt-4 text-center font-display font-semibold text-forest leading-[1.05] text-4xl sm:text-5xl">
              {wedding.groom}
            </h2>
            <div className="my-2 flex items-center justify-center gap-3 text-gold">
              <span className="h-px w-8 bg-gold/50" />
              <span className="font-serif italic text-lg text-gold-dark">&amp;</span>
              <span className="h-px w-8 bg-gold/50" />
            </div>
            <h2 className="text-center font-display font-semibold text-forest leading-[1.05] text-4xl sm:text-5xl">
              {wedding.bride}
            </h2>

            <p className="mt-8 text-center text-sm sm:text-base text-forest/70 leading-relaxed">
              Request the honour of your presence
              <br /> at their wedding ceremony
            </p>

            <LineDivider className="my-10" />

            <div className="text-center">
              <Eyebrow>{wedding.weekday}</Eyebrow>
              <div className="mt-3 flex items-end justify-center gap-2">
                <span className="font-display text-6xl sm:text-7xl text-forest leading-none">
                  {wedding.day}
                </span>
                <span className="pb-1.5 text-left">
                  <span className="block text-xs uppercase tracking-widest2 text-forest/70">
                    {wedding.month}
                  </span>
                  <span className="block font-display text-2xl text-forest">
                    {wedding.year}
                  </span>
                </span>
              </div>
              <p className="mt-2 text-xs uppercase tracking-widest2 text-gold-dark">
                {wedding.time}
              </p>
            </div>

            <LineDivider className="my-10" />

            <div className="text-center">
              <Eyebrow>Venue</Eyebrow>
              <p className="mt-3 font-medium text-forest">{wedding.venue.name}</p>
              {wedding.venue.addressLines.map((line) => (
                <p key={line} className="text-sm text-forest/60">
                  {line}
                </p>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="font-serif italic text-xl text-gold-dark">Insha Allah</p>
              <p className="mt-1 text-sm text-forest/60">Looking forward to celebrating with you</p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
