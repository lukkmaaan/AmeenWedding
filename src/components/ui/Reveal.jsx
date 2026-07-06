import { motion } from 'framer-motion'

const directionOffsets = {
  up: { y: 36, x: 0 },
  down: { y: -36, x: 0 },
  left: { x: 36, y: 0 },
  right: { x: -36, y: 0 },
  none: { x: 0, y: 0 },
}

/**
 * Scroll-triggered fade/blur reveal. Wrap any section content in this
 * for the "premium editorial" motion language used across the site.
 */
export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.9,
  blur = true,
  scale = false,
  className = '',
  as = 'div',
  once = true,
  amount = 0.3,
}) {
  const offset = directionOffsets[direction] || directionOffsets.up
  const Component = motion[as] || motion.div

  return (
    <Component
      className={className}
      initial={{
        opacity: 0,
        ...offset,
        filter: blur ? 'blur(8px)' : 'blur(0px)',
        scale: scale ? 0.96 : 1,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        filter: 'blur(0px)',
        scale: 1,
      }}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </Component>
  )
}

/** Stagger container — pair with <RevealItem> children. */
export function RevealGroup({ children, className = '', stagger = 0.15, once = true, amount = 0.3 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({ children, className = '', direction = 'up' }) {
  const offset = directionOffsets[direction] || directionOffsets.up
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, ...offset, filter: 'blur(6px)' },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
