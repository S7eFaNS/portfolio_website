import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiHome, FiUser, FiCode, FiBriefcase, FiFolder, FiMail } from 'react-icons/fi'

const SECTIONS = [
  { id: 'hero',       label: 'Top',        icon: FiHome      },
  { id: 'about',      label: 'About',      icon: FiUser      },
  { id: 'skills',     label: 'Skills',     icon: FiCode      },
  { id: 'experience', label: 'Experience', icon: FiBriefcase },
  { id: 'projects',   label: 'Projects',   icon: FiFolder    },
  { id: 'contact',    label: 'Contact',    icon: FiMail      },
]

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const inputRef = useRef()
  const containerRef = useRef()

  const filtered = SECTIONS.filter((s) =>
    s.label.toLowerCase().includes(query.toLowerCase())
  )

  // Focus input and reset state on open
  useEffect(() => {
    if (!isOpen) return
    setQuery('')
    setIndex(0)
    requestAnimationFrame(() => inputRef.current?.focus())
  }, [isOpen])

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Keyboard: arrows, enter, escape, tab trap
  useEffect(() => {
    if (!isOpen || !containerRef.current) return
    const el = containerRef.current

    const onKey = (e) => {
      switch (e.key) {
        case 'Escape':
          onClose()
          break

        case 'ArrowDown':
          e.preventDefault()
          setIndex((i) => Math.min(i + 1, filtered.length - 1))
          break

        case 'ArrowUp':
          e.preventDefault()
          setIndex((i) => Math.max(i - 1, 0))
          break

        case 'Enter': {
          e.preventDefault()
          const id = filtered[index]?.id
          if (id) {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
            onClose()
          }
          break
        }

        case 'Tab': {
          const focusable = [...el.querySelectorAll('button:not([disabled]), input')]
          const first = focusable[0]
          const last  = focusable[focusable.length - 1]
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault()
            last.focus()
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
          break
        }

        default:
          break
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, filtered, index, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cmd-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            key="cmd-dialog"
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation command palette"
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 top-[15vh] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[480px] z-50 rounded-2xl overflow-hidden"
            style={{
              border: '1px solid rgba(107,33,168,0.45)',
              background: 'var(--bg-elevated)',
              boxShadow: '0 0 60px rgba(168,85,247,0.18), 0 32px 64px rgba(0,0,0,0.6)',
            }}
          >
            {/* Search row */}
            <div
              className="flex items-center gap-3 px-4 py-3.5"
              style={{ borderBottom: '1px solid rgba(107,33,168,0.25)' }}
            >
              <FiSearch size={15} className="text-text-muted shrink-0" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setIndex(0) }}
                placeholder="Jump to section…"
                className="flex-1 bg-transparent text-text-primary placeholder:text-text-muted font-mono text-sm outline-none"
                aria-label="Search sections"
                aria-autocomplete="list"
                aria-controls="cmd-results"
                aria-activedescendant={filtered[index] ? `cmd-item-${filtered[index].id}` : undefined}
              />
              <kbd
                aria-label="Press Escape to close"
                className="font-mono text-[10px] text-text-muted border border-purple-deep/40 rounded px-1.5 py-0.5 shrink-0"
              >
                ESC
              </kbd>
            </div>

            {/* Results */}
            <ul
              id="cmd-results"
              role="listbox"
              aria-label="Sections"
              className="py-1.5"
            >
              {filtered.map((section, i) => {
                const Icon = section.icon
                const isSelected = i === index
                return (
                  <li
                    key={section.id}
                    id={`cmd-item-${section.id}`}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <button
                      onClick={() => {
                        document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })
                        onClose()
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors duration-100 ${
                        isSelected
                          ? 'text-text-primary'
                          : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                      }`}
                      style={isSelected ? { background: 'rgba(168,85,247,0.12)' } : undefined}
                    >
                      <Icon
                        size={14}
                        aria-hidden="true"
                        className={isSelected ? 'text-purple-primary' : 'text-text-muted'}
                      />
                      <span className="font-display">{section.label}</span>
                      {isSelected && (
                        <span className="ml-auto font-mono text-[10px] text-text-muted" aria-hidden="true">
                          ↵ enter
                        </span>
                      )}
                    </button>
                  </li>
                )
              })}

              {filtered.length === 0 && (
                <li className="px-4 py-4 text-sm text-text-muted font-mono text-center">
                  No results for &ldquo;{query}&rdquo;
                </li>
              )}
            </ul>

            {/* Footer hint */}
            <div
              className="px-4 py-2.5 flex items-center gap-4"
              style={{ borderTop: '1px solid rgba(107,33,168,0.2)' }}
              aria-hidden="true"
            >
              {[
                ['↑↓', 'navigate'],
                ['↵', 'go'],
                ['esc', 'close'],
              ].map(([key, desc]) => (
                <span key={key} className="flex items-center gap-1.5 font-mono text-[10px] text-text-muted">
                  <kbd className="border border-purple-deep/40 rounded px-1 py-0.5">{key}</kbd>
                  {desc}
                </span>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
