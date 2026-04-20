import { useEffect, useState } from 'react'
import { useScrollSpy } from '../../hooks/useScrollSpy'

const SECTIONS = [
  { id: 'hero',       label: 'Top'        },
  { id: 'about',      label: 'About'      },
  { id: 'skills',     label: 'Skills'     },
  { id: 'experience', label: 'Experience' },
  { id: 'projects',   label: 'Projects'   },
  { id: 'contact',    label: 'Contact'    },
]

const IDS     = SECTIONS.map((s) => s.id)
const RAIL_H  = 224  // total widget height (px)
const PAD     = 12   // gap above first dot and below last dot (px)
const USABLE  = RAIL_H - PAD * 2

export default function ScrollProgress() {
  const activeId = useScrollSpy(IDS)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const activeIndex = SECTIONS.findIndex((s) => s.id === activeId)

  return (
    <div
      className="fixed left-2 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
      style={{ width: 24, height: RAIL_H }}
      aria-hidden="true"
    >
      {/* Background rail */}
      <div
        className="absolute"
        style={{
          left: '50%', transform: 'translateX(-50%)',
          top: PAD, bottom: PAD,
          width: 1,
          background: 'rgba(107,33,168,0.35)',
        }}
      />

      {/* Filled rail — grows from top with scroll */}
      <div
        className="absolute transition-all duration-150 ease-out"
        style={{
          left: '50%', transform: 'translateX(-50%)',
          top: PAD, width: 1,
          height: USABLE * progress,
          background: 'var(--purple-primary)',
          boxShadow: '0 0 6px rgba(168,85,247,0.45)',
        }}
      />

      {/* Dots */}
      {SECTIONS.map((section, i) => {
        const dotY    = PAD + (i * USABLE) / (SECTIONS.length - 1)
        const isActive = section.id === activeId
        const isPast   = i < activeIndex

        return (
          <button
            key={section.id}
            onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
            aria-label={`Go to ${section.label}`}
            className="absolute group flex items-center justify-center"
            style={{
              left: '50%', top: dotY,
              transform: 'translate(-50%, -50%)',
              width: 20, height: 20,
            }}
          >
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width:  isActive ? 10 : 6,
                height: isActive ? 10 : 6,
                background: isActive
                  ? 'var(--purple-primary)'
                  : isPast
                  ? 'rgba(168,85,247,0.5)'
                  : 'rgba(107,33,168,0.6)',
                boxShadow: isActive ? '0 0 8px rgba(168,85,247,0.8)' : 'none',
              }}
            />
            {/* Tooltip */}
            <span
              className="absolute pointer-events-none whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150"
              style={{
                left: 16, top: '50%', transform: 'translateY(-50%)',
                padding: '3px 8px',
                background: 'var(--bg-elevated)',
                border: '1px solid rgba(107,33,168,0.4)',
                borderRadius: 4,
                fontSize: 11,
                fontFamily: 'JetBrains Mono, monospace',
                color: 'var(--text-muted)',
              }}
            >
              {section.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
