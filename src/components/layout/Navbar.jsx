import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiDownload } from 'react-icons/fi'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { profile } from '../../data/portfolio'

const NAV_LINKS = [
  { label: 'About',      id: 'about'      },
  { label: 'Skills',     id: 'skills'     },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects',   id: 'projects'   },
  { label: 'Contact',    id: 'contact'    },
]

const ALL_IDS = ['hero', 'about', 'skills', 'experience', 'projects', 'contact']

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const activeId = useScrollSpy(ALL_IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-bg-elevated/80 backdrop-blur-md border-b border-purple-deep/30'
            : 'bg-transparent'
        }`}
      >
        <div
          className="w-full h-16 flex items-center justify-between"
          style={{ padding: '0 clamp(1rem, 5vw, 3rem)' }}
        >
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="font-mono text-sm font-medium text-purple-primary hover:text-purple-glow transition-colors tracking-widest"
            aria-label="Back to top"
          >
            SN<span className="text-purple-glow"></span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(({ label, id }) => {
              const isActive = activeId === id
              return (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`relative text-sm transition-colors duration-200 ${
                    isActive
                      ? 'text-text-primary'
                      : 'text-text-muted hover:text-text-secondary'
                  }`}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-purple-primary"
                      style={{ boxShadow: '0 0 6px rgba(168,85,247,0.7)' }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Resume button */}
          <a
            href={profile.resumeUrl}
            download
            className="hidden md:inline-flex items-center justify-center gap-2 min-w-[140px] px-6 py-2.5 text-sm font-medium text-purple-primary border border-purple-deep rounded-full hover:bg-purple-deep/20 hover:border-purple-primary transition-all duration-200"
          >
            <FiDownload size={13} />
            Resume
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-64 flex flex-col md:hidden"
              style={{
                background: 'var(--bg-elevated)',
                borderLeft: '1px solid rgba(107,33,168,0.3)',
              }}
            >
              <div
                className="flex items-center justify-between px-6 h-16 shrink-0"
                style={{ borderBottom: '1px solid rgba(107,33,168,0.3)' }}
              >
                <span className="font-mono text-sm text-purple-primary tracking-wider">
                  Navigation
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 text-text-muted hover:text-text-primary transition-colors"
                  aria-label="Close menu"
                >
                  <FiX size={18} />
                </button>
              </div>

              <nav className="flex flex-col gap-1 p-4 flex-1" aria-label="Mobile navigation">
                {NAV_LINKS.map(({ label, id }) => {
                  const isActive = activeId === id
                  return (
                    <button
                      key={id}
                      onClick={() => { scrollTo(id); setMobileOpen(false) }}
                      className={`text-left px-4 py-3 rounded-lg text-sm transition-all duration-150 ${
                        isActive
                          ? 'bg-purple-primary/10 text-text-primary border border-purple-deep/50'
                          : 'text-text-muted hover:text-text-secondary hover:bg-white/5'
                      }`}
                    >
                      {label}
                    </button>
                  )
                })}
              </nav>

              <div
                className="p-4 shrink-0 flex flex-col gap-3"
                style={{ borderTop: '1px solid rgba(107,33,168,0.3)' }}
              >
                <a
                  href={profile.resumeUrl}
                  download
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-purple-primary border border-purple-deep rounded-lg hover:bg-purple-deep/20 transition-all"
                >
                  <FiDownload size={13} />
                  Download Resume
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
