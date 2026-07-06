import { motion, AnimatePresence } from 'framer-motion'
import { Disc3, Volume2, VolumeX } from 'lucide-react'
import useBackgroundMusic from '../hooks/useBackgroundMusic'

export default function BackgroundMusic() {
  const { audioRef, isPlaying, isMuted, needsInteraction, togglePlay, toggleMute } =
    useBackgroundMusic()

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} src="/audio/wedding-nasheed.mp3" loop preload="auto" />

      <AnimatePresence>
        {needsInteraction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-forest-dark/85 backdrop-blur-sm"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="px-6 text-center text-xs sm:text-sm uppercase tracking-widest2 text-ivory/90"
            >
              Tap anywhere to begin the experience
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50">
        <div className="flex items-center gap-1 rounded-full border border-gold/30 bg-forest/90 py-1.5 pl-1.5 pr-1.5 shadow-soft backdrop-blur-sm">
          <motion.button
            type="button"
            onClick={togglePlay}
            whileTap={{ scale: 0.92 }}
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-gold-light"
          >
            {isPlaying && (
              <motion.span
                aria-hidden="true"
                className="absolute inset-0 rounded-full border border-gold/40"
                animate={{ scale: [1, 1.4], opacity: [0.55, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
              />
            )}
            <motion.span
              animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
              transition={
                isPlaying
                  ? { duration: 6, repeat: Infinity, ease: 'linear' }
                  : { duration: 0.5, ease: 'easeOut' }
              }
              className={isPlaying ? 'opacity-100' : 'opacity-60'}
            >
              <Disc3 size={20} strokeWidth={1.5} />
            </motion.span>
          </motion.button>

          <span className="h-6 w-px bg-gold/25" aria-hidden="true" />

          <motion.button
            type="button"
            onClick={toggleMute}
            whileTap={{ scale: 0.92 }}
            aria-label={isMuted ? 'Unmute music' : 'Mute music'}
            className="flex h-10 w-10 items-center justify-center rounded-full text-gold-light/80 transition-colors hover:text-gold-light"
          >
            {isMuted ? (
              <VolumeX size={17} strokeWidth={1.5} />
            ) : (
              <Volume2 size={17} strokeWidth={1.5} />
            )}
          </motion.button>
        </div>
      </div>
    </>
  )
}
