import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import Reveal from './ui/Reveal'
import { Eyebrow } from './ui/Divider'
import wedding from '../data/wedding'

const attendOptions = ['Joyfully Accepts', 'Regretfully Declines']

export default function RSVP() {
  const [form, setForm] = useState({ name: '', attend: attendOptions[0], message: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim()) return

    // TODO: wire this up to your form backend of choice
    // (e.g. Formspree, Google Sheets via Apps Script, or your own API)
    // fetch(wedding.rsvpEmail endpoint, { method: 'POST', body: JSON.stringify(form) })

    setSubmitted(true)
  }

  return (
    <section className="bg-olive py-20 sm:py-28 md:py-32 px-5">
      <Reveal direction="up" className="mx-auto max-w-2xl text-center">
        <Eyebrow className="justify-center flex">Kindly Respond</Eyebrow>
        <h2 className="mt-4 font-display text-4xl sm:text-5xl text-ivory">RSVP</h2>
        <p className="mt-4 text-ivory/70">We'd be honoured to know if you'll be joining us.</p>
      </Reveal>

      <Reveal direction="up" scale delay={0.15} className="mx-auto mt-12 max-w-lg">
        <div className="rounded-sm border border-gold/70 p-1.5 shadow-card">
          <div className="card-border rounded-[2px] bg-ivory px-6 py-10 sm:px-10 sm:py-12">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center py-6 text-center"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold-dark">
                    <Check size={22} />
                  </span>
                  <p className="mt-5 font-display text-2xl text-forest">Thank You</p>
                  <p className="mt-2 text-sm text-forest/60">
                    Your response has been received with gratitude.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div>
                    <label className="eyebrow text-gold-dark" htmlFor="name">
                      Guest Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="mt-3 w-full border-b border-forest/20 bg-transparent pb-2 text-forest placeholder:text-forest/30 focus:border-gold focus:outline-none"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <span className="eyebrow text-gold-dark">Will Attend</span>
                    <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:gap-6">
                      {attendOptions.map((option) => (
                        <label
                          key={option}
                          className="flex cursor-pointer items-center gap-2 text-sm text-forest/80"
                        >
                          <input
                            type="radio"
                            name="attend"
                            value={option}
                            checked={form.attend === option}
                            onChange={(e) => setForm((f) => ({ ...f, attend: e.target.value }))}
                            className="accent-gold-dark"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="eyebrow text-gold-dark" htmlFor="message">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className="mt-3 w-full resize-none border-b border-forest/20 bg-transparent pb-2 text-forest placeholder:text-forest/30 focus:border-gold focus:outline-none"
                      placeholder="A note for the couple (optional)"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-2 w-full rounded-sm bg-forest py-4 text-xs uppercase tracking-widest2 text-ivory transition-colors duration-500 hover:bg-gold-dark hover:text-forest"
                  >
                    Submit RSVP
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
