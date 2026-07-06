import wedding from '../data/wedding'

export default function Footer() {
  return (
    <footer className="bg-forest-dark py-14 px-5 text-center">
      <p className="font-display text-2xl text-gold-light">
        {wedding.initials[0]} <span className="mx-1 text-gold/50">—</span> {wedding.initials[1]}
      </p>
      <p className="mt-2 text-xs uppercase tracking-widest2 text-ivory/50">
        {wedding.day} {wedding.month} {wedding.year}
      </p>
      <p className="mt-6 text-[0.65rem] uppercase tracking-widest2 text-ivory/30">
        Made with love
      </p>
    </footer>
  )
}
