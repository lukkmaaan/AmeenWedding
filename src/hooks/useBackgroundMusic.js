import { useCallback, useEffect, useRef, useState } from 'react'

const TARGET_VOLUME = 0.3 // 30% — premium, subtle ambience
const FADE_DURATION_MS = 2500

/**
 * Drives a single persistent <audio> element for the whole site.
 * - Attempts autoplay (with fade-in) as soon as it mounts.
 * - If the browser blocks autoplay, exposes `needsInteraction` so the UI
 *   can show a "tap to begin" overlay; the first pointer interaction
 *   anywhere on the page starts playback.
 * - Because this hook (and its <audio> element) lives once at the App
 *   root, playback position is naturally preserved across scrolling —
 *   nothing here is tied to any section mounting/unmounting.
 */
export default function useBackgroundMusic() {
  const audioRef = useRef(null)
  const fadeIntervalRef = useRef(null)

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

  const attemptPlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return Promise.reject(new Error('no audio element'))

    audio.volume = 0
    return audio.play().then(() => {
      setIsPlaying(true)
      setNeedsInteraction(false)
      fadeVolumeTo(TARGET_VOLUME)
    })
  }, [fadeVolumeTo])

  // Try to start playback the moment the site loads.
  useEffect(() => {
    attemptPlay().catch(() => setNeedsInteraction(true))
    return () => clearInterval(fadeIntervalRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Fallback: start on the very first tap/click anywhere on the page.
  useEffect(() => {
    if (!needsInteraction) return

    const startOnInteraction = () => {
      attemptPlay()
        .catch(() => {
          // Still blocked, or the mp3 hasn't been added yet — fail quietly
          // rather than trapping the visitor behind the overlay forever.
        })
        .finally(() => setNeedsInteraction(false))
    }

    window.addEventListener('pointerdown', startOnInteraction, { once: true })
    return () => window.removeEventListener('pointerdown', startOnInteraction)
  }, [needsInteraction, attemptPlay])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      attemptPlay().catch(() => {})
    }
  }, [isPlaying, attemptPlay])

  const toggleMute = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    const next = !isMuted
    audio.muted = next
    setIsMuted(next)
  }, [isMuted])

  return { audioRef, isPlaying, isMuted, needsInteraction, togglePlay, toggleMute }
}
