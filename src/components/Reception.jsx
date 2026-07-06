import Reveal from './ui/Reveal'

export default function Reception() {
  return (
    <section className="bg-ivory py-20 sm:py-28 md:py-32 px-5">
      <Reveal direction="none" scale duration={1.1} className="mx-auto max-w-3xl">
        <div className="relative mx-auto w-full sm:w-[85%] overflow-hidden rounded-2xl shadow-soft aspect-[16/10]">
          {/* Replace with a real reception photo at src/assets/reception.jpg */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,#5e6f57,transparent_60%),radial-gradient(circle_at_20%_80%,#283127,transparent_55%),linear-gradient(160deg,#3c4838,#1b211a)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-ivory/70 text-sm tracking-widest2 uppercase">
              Reception Photo
            </span>
          </div>
        </div>
      </Reveal>

      <Reveal direction="up" delay={0.2} className="mx-auto mt-12 max-w-xl text-center">
        <h2 className="font-display text-3xl sm:text-4xl text-forest">A Warm Welcome</h2>
        <p className="mt-5 leading-relaxed text-forest/75">
          Join us as we continue the celebration together — a gathering of family, friends,
          and gratitude, held close in the spirit of the day.
        </p>
      </Reveal>
    </section>
  )
}
