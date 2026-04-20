import { motion } from 'framer-motion'
import { fadeUp } from '../../lib/motion'

export default function SectionHeading({ children, label, id }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="flex flex-col gap-3"
    >
      {label && (
        <p className="font-mono text-sm tracking-widest uppercase text-purple-primary">
          {label}
        </p>
      )}
      <h2
        id={id}
        className="font-display font-semibold text-text-primary"
        style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
      >
        {children}
      </h2>
      <div
        className="w-16 h-0.5 rounded-full"
        style={{ background: 'linear-gradient(to right, var(--purple-primary), var(--purple-glow))' }}
      />
    </motion.div>
  )
}
