import { MapPin } from 'lucide-react'
import Reveal from './ui/Reveal'
import { Eyebrow } from './ui/Divider'
import wedding from '../data/wedding'

export default function Venue() {
  return (
    <section className="bg-forest py-20 sm:py-28 md:py-32 px-5">
      <Reveal direction="up" className="mx-auto max-w-2xl text-center">
        <Eyebrow className="justify-center flex">Celebration Location</Eyebrow>
        <h2 className="mt-4 font-display text-4xl sm:text-5xl text-ivory">Venue</h2>

        <div className="mt-10">
          <p className="font-display text-2xl text-ivory">{wedding.venue.name}</p>
          {wedding.venue.addressLines.map((line) => (
            <p key={line} className="mt-1 text-sm text-gold-light/90">
              {line}
            </p>
          ))}
        </div>

        <a
          href={wedding.venue.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-10 inline-flex max-w-full items-center justify-center gap-2 whitespace-normal rounded-sm border border-gold/70 px-6 sm:px-8 py-3.5 sm:py-4 text-center text-[0.65rem] sm:text-xs uppercase tracking-wider sm:tracking-widest2 text-gold-light transition-colors duration-500 hover:bg-gold hover:text-forest"
        >
          <MapPin size={16} className="shrink-0 transition-transform duration-500 group-hover:scale-110" />
          Open in Google Maps
        </a>
      </Reveal>
    </section>
  )
}
