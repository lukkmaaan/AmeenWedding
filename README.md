# Abdul Ameen & Fathima Fidha — Wedding Invitation

A luxury, editorial-style wedding invitation website built with React 19, Vite,
Tailwind CSS, Framer Motion, GSAP, and Lenis smooth scroll.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

## Project structure

```
src/
  data/wedding.js        <- couple names, date, venue, verses — edit this to reuse the template
  components/
    Hero.jsx             <- fullscreen marble hero with initials + parallax
    InvitationCard.jsx    <- the printed-invitation card (verse, names, date, venue)
    Celebration.jsx       <- "Celebrate With Us" photo + copy section
    Countdown.jsx         <- live countdown to the wedding date/time
    Venue.jsx             <- venue details + Google Maps button
    Gallery.jsx           <- responsive photo grid + lightbox
    Reception.jsx         <- reception photo + short invitation copy
    Blessings.jsx         <- Islamic Dua section
    RSVP.jsx              <- RSVP form (name, attendance, message)
    Footer.jsx            <- minimal footer
    ui/                   <- Reveal (scroll animations) + Divider helpers
  hooks/useLenis.js        <- Lenis smooth-scroll setup
```

## Customizing for a different couple

Everything text-based (names, date, verses, venue, dua) lives in
`src/data/wedding.js` — edit that one file and the whole site updates.

## Background music

The site plays a looping nasheed in the background via `src/components/BackgroundMusic.jsx`
and `src/hooks/useBackgroundMusic.js`.

- **Add your track**: drop an MP3 at `public/audio/wedding-nasheed.mp3` (exact name).
  Because it lives in `public/`, you can swap it for a different track later just by
  replacing that file — no code changes or rebuild needed.
- **Behavior**: fades in over ~2.5s to 30% volume as soon as the page loads, loops
  continuously, and keeps its position while scrolling (it's mounted once at the
  app root, not per-section).
- **Autoplay fallback**: if the browser blocks autoplay-with-sound, a minimal
  "Tap anywhere to begin the experience" overlay appears; the first tap/click
  starts the music and dismisses it.
- **Controls**: a floating control in the bottom-right corner — the rotating disc
  icon toggles play/pause, the speaker icon toggles mute.
- I didn't (and can't) include an actual nasheed audio file — you'll need to add
  one you have the rights to use. See `public/audio/README.txt`.

## Photos

- Hero background: `src/assets/marble-bg.jpg` (your uploaded texture).
- Celebration section: `src/assets/couple.jpg` (your uploaded couple photo).
- Gallery and Reception still use labeled CSS gradient placeholders — drop
  images into `src/assets/` and swap the placeholder `<div>` in
  `Gallery.jsx` / `Reception.jsx` for an
  `<img src={...} className="h-full w-full object-cover" />` the same way
  `Celebration.jsx` does.

## Wiring up the RSVP form

`RSVP.jsx` currently shows a success state locally without sending data
anywhere. To actually collect responses, connect the `handleSubmit` function
to a form backend (Formspree, a Google Sheet via Apps Script, Airtable, or
your own API endpoint) — there's a `TODO` comment marking exactly where.

## Notes

- All animations respect `prefers-reduced-motion`.
- The marble hero background and all card textures are pure CSS — no image
  downloads required, so the site is fast by default.
- Colors, fonts, and spacing tokens are all defined in `tailwind.config.js`.
