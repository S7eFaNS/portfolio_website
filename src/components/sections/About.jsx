import { useRef } from 'react'
import { motion } from 'framer-motion'
import * as Si from 'react-icons/si'
import { profile, stats, techStack } from '../../data/portfolio'
import { fadeUp, stagger } from '../../lib/motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import SectionHeading from '../ui/SectionHeading'
import GlassCard from '../ui/GlassCard'

export default function About() {
  const trackRef = useRef()
  const reduced = usePrefersReducedMotion()

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-[min(10rem,15vh)]"
    >
      <div
        className="w-full"
        style={{ padding: '0 clamp(1rem, 5vw, 4rem)' }}
      >
        <SectionHeading id="about-heading" label="// WHO I AM">
          About Me
        </SectionHeading>

        {/* Two-column */}
        <div className="mt-16 grid lg:grid-cols-[3fr_2fr] gap-16 items-start">

          {/* Left — bio */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="flex flex-col gap-5"
          >
            {profile.bio.map((para, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                className="text-text-secondary leading-relaxed"
              >
                {para}
              </motion.p>
            ))}
          </motion.div>

          {/* Right — stat cards */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={fadeUp}>
                <GlassCard className="p-6 flex flex-col gap-1 text-center">
                  <span
                    className="font-display font-bold text-text-primary"
                    style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}
                  >
                    {stat.value}
                  </span>
                  <span className="font-mono text-xs text-text-muted tracking-wide uppercase">
                    {stat.label}
                  </span>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Tech marquee */}
        <div className="mt-20">
          <p className="font-mono text-xs tracking-widest uppercase text-text-muted mb-6 text-center">
            Technologies I work with
          </p>

          {/* Screen-reader list — hidden visually, visible to assistive tech */}
          <ul className="sr-only">
            {techStack.map((t) => <li key={t.name}>{t.name}</li>)}
          </ul>

          {reduced ? (
            /* Static wrap when reduced motion is on */
            <div className="flex flex-wrap justify-center gap-4" aria-hidden="true">
              {techStack.map((tech) => {
                const Icon = Si[tech.icon]
                return (
                  <div key={tech.name} className="flex items-center gap-2 text-text-muted shrink-0">
                    {Icon && <Icon size={18} aria-hidden="true" />}
                    <span className="font-mono text-sm">{tech.name}</span>
                  </div>
                )
              })}
            </div>
          ) : (
            /* Animated marquee — decorative duplicate hidden from AT */
            <div
              className="overflow-hidden"
              aria-hidden="true"
              onMouseEnter={() => { if (trackRef.current) trackRef.current.style.animationPlayState = 'paused' }}
              onMouseLeave={() => { if (trackRef.current) trackRef.current.style.animationPlayState = 'running' }}
            >
              <div
                ref={trackRef}
                className="flex items-center gap-10"
                style={{ animation: 'marquee 40s linear infinite', width: 'max-content' }}
              >
                {[...techStack, ...techStack].map((tech, i) => {
                  const Icon = Si[tech.icon]
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 text-text-muted hover:text-purple-primary transition-colors duration-200 shrink-0 cursor-default"
                    >
                      {Icon && <Icon size={20} aria-hidden="true" />}
                      <span className="font-mono text-sm whitespace-nowrap">{tech.name}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
