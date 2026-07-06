export function DiamondDivider({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-10 bg-gold/50" />
      <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
      <span className="h-px w-10 bg-gold/50" />
    </div>
  )
}

export function LineDivider({ className = '' }) {
  return <div className={`h-px w-full bg-gold/30 ${className}`} />
}

export function Eyebrow({ children, className = '', light = false }) {
  return (
    <p
      className={`text-[0.7rem] sm:text-xs uppercase tracking-widest2 font-medium ${
        light ? 'text-gold-light' : 'text-gold'
      } ${className}`}
    >
      {children}
    </p>
  )
}
