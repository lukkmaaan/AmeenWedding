import { useCallback, useEffect, useRef, useState } from 'react'

const TARGET_VOLUME = 0.3 // 30% — premium, subtle ambience
const FADE_DURATION_MS = 2500
const INTERACTION_EVENTS = ['pointerdown', 'touchstart', 'click', 'keydown', 'scroll', 'wheel']

/**
 * Drives a single persistent <audio> element for the whole site.
 *
 * Autoplay strategy (this is the actual fix):
 * 1. Try real, audible playback on mount.
 * 2. Browsers reject that unless the user already interacted with the page —
 *    so if it's rejected, immediately start the SAME track muted instead.
 *    Muted autoplay is always permitted with no gesture required, so the
 *    track is already running, in sync, from the moment the page loads.
 * 3. The very first scroll/click/touch/key anywhere on the page unmutes it
 *    and fades the volume in — no click on any button required.
 * 4. Only if even muted playback fails (very rare) do we fall back to the
 *    "tap to begin" overlay via `needsInteraction`.
 *
 * Because this hook (and its single <audio> element) lives once at the App
 * root, playback position is naturally preserved across scrolling — nothing
 * here is tied to any section mounting/unmounting.
 */
export default function useBackgroundMusic() {
  const audioRef = useRef(null)
  const fadeIntervalRef = useRef(null)
  const hasInitializedRef = useRef(false) // guards React StrictMode's double-invoke

  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [needsInteraction, setNeedsInteraction] = useState(false)

  const fadeVolumeTo = useCallback((target, duration = FADE_DURATION_MS) => {
    const audio = audioRef.current
    if (!audio) return
    clearInterval(fadeIntervalRef.current)

    const steps = 30
    const stepTime = duration / steps
    const startVolume = audio.volume
    let step = 0

    fadeIntervalRef.current = setInterval(() => {
      step += 1
      const progress = step / steps
      audio.volume = Math.min(1, Math.max(0, startVolume + (target - startVolume) * progress))
      if (step >= steps) {
        audio.volume = target
        clearInterval(fadeIntervalRef.current)
      }
    }, stepTime)
  }, [])

  // Real, audible playback attempt.
  const attemptPlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return Promise.reject(new Error('no audio element'))

    audio.muted = false
    audio.volume = 0
    return audio.play().then(() => {
      setIsPlaying(true)
      setIsMuted(false)
      setNeedsInteraction(false)
      fadeVolumeTo(TARGET_VOLUME)
    })
  }, [fadeVolumeTo])

  // Silent fallback — always allowed by every major browser, no gesture needed.
  const attemptMutedPlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return Promise.reject(new Error('no audio element'))

    audio.muted = true
    audio.volume = TARGET_VOLUME
    return audio.play().then(() => {
      setIsPlaying(true)
      setIsMuted(true)
    })
  }, [])

  useEffect(() => {
    if (hasInitializedRef.current) return
    hasInitializedRef.current = true

    let removeListeners = () => {}

    const armInteractionListeners = (handler) => {
      INTERACTION_EVENTS.forEach((evt) =>
        window.addEventListener(evt, handler, { once: true, passive: true })
      )
      removeListeners = () => {
        INTERACTION_EVENTS.forEach((evt) => window.removeEventListener(evt, handler))
      }
    }

    // Step 1: try real playback.
    attemptPlay().catch(() => {
      // Step 2: browser blocked sound — start muted instead, so the track
      // is already running in sync from page load.
      attemptMutedPlay()
        .then(() => {
          // Step 3: unmute the instant the visitor does anything at all.
          armInteractionListeners(() => {
            const audio = audioRef.current
            if (!audio) return
            audio.muted = false
            setIsMuted(false)
            fadeVolumeTo(TARGET_VOLUME)
          })
        })
        .catch(() => {
          // Step 4: even muted autoplay failed — genuinely need a tap.
          setNeedsInteraction(true)
          armInteractionListeners(() => {
            attemptPlay()
              .catch(() => {})
              .finally(() => setNeedsInteraction(false))
          })
        })
    })

    return () => {
      clearInterval(fadeIntervalRef.current)
      removeListeners()
    }
  }, [attemptPlay, attemptMutedPlay, fadeVolumeTo])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.muted) {
      // Currently running silently (the autoplay fallback) — this click
      // both unmutes it and guarantees it's actually playing.
      audio.muted = false
      setIsMuted(false)
      setNeedsInteraction(false)
      if (audio.paused) {
        attemptPlay().catch(() => {})
      } else {
        setIsPlaying(true)
        fadeVolumeTo(TARGET_VOLUME)
      }
      return
    }

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      attemptPlay().catch(() => {})
    }
  }, [isPlaying, attemptPlay, fadeVolumeTo])

  const toggleMute = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    const next = !isMuted
    audio.muted = next
    setIsMuted(next)
  }, [isMuted])

  return { audioRef, isPlaying, isMuted, needsInteraction, togglePlay, toggleMute }
}