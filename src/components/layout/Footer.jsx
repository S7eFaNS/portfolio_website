import { FiArrowUp } from 'react-icons/fi'
import { profile } from '../../data/portfolio'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-20 ">
      {/* Gradient hairline border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'var(--gradient-hero)' }}
      />

      <div
        className="w-full flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ padding: '1.5rem clamp(1rem, 5vw, 4rem)' }}
      >
        <p className="font-mono text-xs text-text-muted order-2 sm:order-1">
          © {year} {profile.name}
        </p>


        <button
          onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
          className="order-3 p-2 rounded-lg text-text-muted hover:text-purple-primary hover:bg-purple-primary/10 transition-all duration-200"
          aria-label="Back to top"
        >
          <FiArrowUp size={16} />
        </button>
      </div>
    </footer>
  )
}
