import { lazy, Suspense, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiChevronDown } from 'react-icons/fi'
import { profile, roles } from '../../data/portfolio'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { fadeUp, stagger, slideInRight } from '../../lib/motion'

const NebulaBackground = lazy(() => import('../three/NebulaBackground'))

const ROLE_INTERVAL = 2500

export default function Hero() {
  const reduced = usePrefersReducedMotion()
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length)
    }, ROLE_INTERVAL)
    return () => clearInterval(id)
  }, [reduced])

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex flex-col min-h-[100svh] overflow-hidden"
    >
      {/* Content */}
      <div className="relative z-10 w-full flex-1 flex items-center" style={{ padding: '0 clamp(2rem, 8vw, 6rem)' }}>
      <div className="w-full flex flex-col lg:flex-row items-center gap-12 py-24">

        {/* Left — text */}
        <motion.div
          className="flex-1 lg:basis-3/5 flex flex-col gap-5 lg:pl-10"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Mono label */}
          <motion.p
            variants={fadeUp}
            className="font-mono text-sm tracking-widest uppercase text-purple-primary"
          >
            // HELLO WORLD
          </motion.p>

          {/* H1 */}
          <motion.h1
            id="hero-heading"
            variants={fadeUp}
            className="font-display font-bold leading-tight text-text-primary"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Hi, I&apos;m <span style={{ background: 'var(--gradient-hero)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{profile.name}</span>
          </motion.h1>

          {/* Rotating role subtitle — aria-live announces changes to screen readers */}
          <motion.div variants={fadeUp} className="h-9 overflow-hidden" aria-live="polite" aria-atomic="true">
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-2xl font-semibold text-purple-glow"
              >
                {roles[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Tagline */}
          <motion.p variants={fadeUp} className="text-text-secondary max-w-md leading-relaxed">
            {profile.tagline}
          </motion.p>

          {/* Meta row */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-muted font-mono">
            <span className="flex items-center gap-1.5"><FiMapPin size={18} aria-hidden="true" /> {profile.location}</span>
            <span aria-hidden="true">•</span>
            <a href={`mailto:${profile.email}`} className="hover:text-purple-primary transition-colors">{profile.email}</a>
            <span aria-hidden="true">•</span>
            <span>{profile.age} years old</span>
          </motion.div>

          {/* Social icons */}
          <motion.div variants={fadeUp} className="flex gap-4">
            <SocialLink href={profile.social.github} label="GitHub" Icon={FiGithub} />
            <SocialLink href={profile.social.linkedin} label="LinkedIn" Icon={FiLinkedin} />
            <SocialLink href={`mailto:${profile.email}`} label="Email" Icon={FiMail} />
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-1">
            <a
              href="#projects"
              className="inline-flex items-center justify-center min-w-[160px] px-8 py-4 rounded-full font-display font-semibold text-base text-white transition-all duration-200"
              style={{ background: 'var(--gradient-hero)', boxShadow: '0 0 24px rgba(168,85,247,0.35)' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 40px rgba(168,85,247,0.6)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 24px rgba(168,85,247,0.35)'}
            >
              View My Work
            </a>
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center justify-center min-w-[160px] px-8 py-4 rounded-full font-display font-semibold text-base text-purple-primary border border-purple-deep transition-all duration-200 hover:border-purple-primary hover:bg-purple-deep/20"
            >
              Download CV
            </a>
          </motion.div>
        </motion.div>

        {/* Right — Three.js nebula */}
        <motion.div
          variants={slideInRight}
          initial="hidden"
          animate="visible"
          className="hidden lg:block lg:basis-2/5 h-[600px] w-full"
          aria-hidden="true"
        >
          <Suspense fallback={<div className="w-full h-full" />}>
            <NebulaBackground reduced={reduced} />
          </Suspense>
        </motion.div>
      </div>
      </div>

      {/* Scroll indicator — sits at bottom of section, below content */}
      <motion.div
        aria-hidden="true"
        className="pb-8 flex flex-col items-center text-text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <motion.div
          animate={reduced ? {} : { y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <FiChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  )
}

function SocialLink({ href, label, Icon }) {
  return (
    <a
      href={href}
      aria-label={label}
      target={href.startsWith('mailto') ? undefined : '_blank'}
      rel="noopener noreferrer"
      className="p-2.5 rounded-lg text-text-muted border border-purple-deep/40 transition-all duration-200 hover:text-purple-primary hover:border-purple-primary"
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 16px rgba(168,85,247,0.3)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = ''}
    >
      <Icon size={26} />
    </a>
  )
}
