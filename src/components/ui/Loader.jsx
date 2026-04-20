import { motion } from 'framer-motion'

export default function Loader({ reduced = false }) {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8"
      style={{ background: 'var(--bg-base)' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <div className="relative w-20 h-20">
        {/* Initials circle */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
          <circle cx="50" cy="50" r="38" fill="#13091f" stroke="#a855f7" strokeWidth="2" />
          <text
            x="50" y="60"
            textAnchor="middle"
            fontFamily="Space Grotesk, sans-serif"
            fontSize="28"
            fontWeight="700"
            fill="#a855f7"
          >
            SN
          </text>
        </svg>

        {/* Spinning arc — skipped when prefers-reduced-motion */}
        {!reduced && (
          <motion.svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <circle
              cx="50" cy="50" r="46"
              fill="none"
              stroke="#6b21a8"
              strokeWidth="1.5"
              strokeDasharray="60 230"
              strokeLinecap="round"
            />
          </motion.svg>
        )}
      </div>

      {/* Progress bar */}
      {!reduced && (
        <div
          className="w-40 h-px rounded-full overflow-hidden"
          style={{ background: 'var(--bg-elevated)' }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'var(--gradient-hero)' }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      )}
    </motion.div>
  )
}
