import { motion } from 'framer-motion'
import { FiMapPin, FiCalendar } from 'react-icons/fi'
import { experience } from '../../data/portfolio'
import { fadeUp } from '../../lib/motion'
import SectionHeading from '../ui/SectionHeading'
import PillTag from '../ui/PillTag'

export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="py-[min(10rem,15vh)]"
    >
      <div
        className="w-full"
        style={{ padding: '0 clamp(1rem,5vw,4rem)' }}
      >
        <SectionHeading id="experience-heading" label="// CAREER">
          Experience
        </SectionHeading>

        <div className="relative mt-16">
          {/* Desktop center line */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: 'linear-gradient(to bottom, transparent, var(--purple-deep) 15%, var(--purple-deep) 85%, transparent)' }}
          />
          {/* Mobile left rail */}
          <div
            className="md:hidden absolute left-3 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, transparent, var(--purple-deep) 10%, var(--purple-deep) 90%, transparent)' }}
          />

          <div className="space-y-10">
            {experience.map((entry, i) => (
              <TimelineEntry key={entry.company + entry.start} entry={entry} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineEntry({ entry, index }) {
  const isLeft = index % 2 === 0

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="relative"
    >
      {/* ── Mobile layout ── */}
      <div className="md:hidden pl-10">
        <Dot />
        <EntryCard entry={entry} />
      </div>

      {/* ── Desktop layout ── */}
      <div className={`hidden md:flex items-start ${isLeft ? '' : 'flex-row-reverse'}`}>
        {/* Card — 45% */}
        <div className={`w-5/12 ${isLeft ? 'pr-10' : 'pl-10'}`}>
          <EntryCard entry={entry} />
        </div>
        {/* Center dot */}
        <div className="w-2/12 flex justify-center pt-7">
          <Dot />
        </div>
        {/* Fill — 45% */}
        <div
          className={`w-5/12 flex items-center justify-center ${isLeft ? 'pl-10' : 'pr-10'}`}
          style={{ paddingTop: 'min(5rem, 15vh)' }}
        >
          <TerminalBlock entry={entry} />
        </div>
      </div>
    </motion.div>
  )
}

function Dot() {
  return (
    <div
      className="absolute left-3 -translate-x-1/2 top-5 md:static md:translate-x-0 w-5 h-5 rounded-full flex items-center justify-center z-10 shrink-0"
      style={{
        background: 'var(--bg-base)',
        border: '2px solid var(--purple-primary)',
        boxShadow: '0 0 10px rgba(168,85,247,0.5)',
      }}
    >
      <div className="w-1.5 h-1.5 rounded-full bg-purple-primary" />
    </div>
  )
}

function EntryCard({ entry }) {
  return (
    <div
      className="rounded-xl border border-purple-deep/30 backdrop-blur-md p-6 flex flex-col gap-5"
      style={{ background: 'var(--bg-glass)' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h3 className="font-display font-semibold text-lg text-text-primary">
            {entry.role}
          </h3>
          <p className="font-display font-medium text-purple-primary mt-0.5">
            {entry.company}
          </p>
        </div>
        <span className="font-mono text-xs text-purple-glow bg-purple-primary/10 border border-purple-primary/20 px-2.5 py-1 rounded-full shrink-0">
          {entry.type}
        </span>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-muted font-mono">
        <span className="flex items-center gap-1.5">
          <FiCalendar size={12} />
          {entry.start} — {entry.end}
        </span>
        <span className="flex items-center gap-1.5">
          <FiMapPin size={12} />
          {entry.location}
        </span>
      </div>

      {/* Bullets */}
      <ul className="flex flex-col gap-2.5">
        {entry.bullets.map((bullet, i) => (
          <li key={i} className="flex gap-3 text-sm text-text-secondary leading-relaxed">
            <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-primary shrink-0" />
            {bullet}
          </li>
        ))}
      </ul>

      {/* Tech pills */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {entry.tech.map((t) => (
          <PillTag key={t} label={t} />
        ))}
      </div>
    </div>
  )
}

function TerminalBlock({ entry }) {
  const slug = entry.company.toLowerCase().replace(/\s+/g, '-')
  const lines = [
    { text: `$ cd ~/${slug}`,           color: 'text-purple-primary' },
    { text: `$ ls tech/`,               color: 'text-purple-primary' },
    ...entry.tech.slice(0, 4).map(t => ({
      text: `  → ${t}`,                 color: 'text-purple-glow',
    })),
    { text: `$ git log --oneline -3`,   color: 'text-purple-primary' },
    ...entry.bullets.slice(0, 2).map(b => ({
      text: `  ${b.length > 42 ? b.slice(0, 42) + '…' : b}`,
      color: 'text-text-muted',
    })),
  ]

  return (
    <div
      className="rounded-xl border border-purple-deep/30 overflow-hidden font-mono text-xs"
      style={{ background: 'rgba(10,6,18,0.85)' }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-1.5 px-4 py-2.5 border-b border-purple-deep/20"
        style={{ background: 'rgba(30,15,55,0.7)' }}
      >
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(239,68,68,0.55)' }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(234,179,8,0.55)' }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(34,197,94,0.55)' }} />
        <span className="ml-3 text-text-muted" style={{ fontSize: 10 }}>bash — {slug}</span>
      </div>

      {/* Lines */}
      <div className="p-4 flex flex-col gap-1.5">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.07, duration: 0.28, ease: 'easeOut' }}
            className={`leading-relaxed ${line.color}`}
          >
            {line.text}
          </motion.p>
        ))}

        {/* Blinking cursor */}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 1.1, ease: 'linear' }}
          className="text-purple-primary select-none"
        >
          █
        </motion.span>
      </div>
    </div>
  )
}

function CodeCommentBlock({ entry }) {
  const lines = [
    { text: '/**',                                    type: 'bracket' },
    { text: ` * @role     ${entry.role}`,             type: 'tag' },
    { text: ` * @company  ${entry.company}`,          type: 'tag' },
    { text: ` * @period   ${entry.start} → ${entry.end}`, type: 'tag' },
    { text: ' *',                                     type: 'plain' },
    ...entry.bullets.slice(0, 3).map(b => ({
      text: ` * ${b.length > 48 ? b.slice(0, 48) + '…' : b}`,
      type: 'body',
    })),
    { text: ' *',                                     type: 'plain' },
    { text: ` * @stack    ${entry.tech.slice(0, 3).join(' · ')}`, type: 'tag' },
    { text: ' */',                                    type: 'bracket' },
  ]

  return (
    <div
      className="rounded-xl border border-purple-deep/30 overflow-hidden font-mono text-xs p-5 flex flex-col gap-1"
      style={{ background: 'rgba(10,6,18,0.85)' }}
    >
      {lines.map((line, i) => {
        let className = 'leading-relaxed '
        if (line.type === 'bracket') className += 'text-purple-deep'
        else if (line.type === 'plain') className += 'text-purple-deep'
        else if (line.type === 'tag') className += ''
        else className += 'text-text-muted'

        if (line.type === 'tag') {
          const atIdx = line.text.indexOf('@')
          const spaceAfterTag = line.text.indexOf(' ', atIdx + 1)
          const prefix = line.text.slice(0, atIdx)          // " * "
          const tag = line.text.slice(atIdx, spaceAfterTag)  // "@role"
          const value = line.text.slice(spaceAfterTag)        // "  Backend Dev"

          return (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.07, duration: 0.28, ease: 'easeOut' }}
              className="leading-relaxed"
            >
              <span className="text-purple-deep">{prefix}</span>
              <span className="text-purple-primary">{tag}</span>
              <span className="text-text-secondary">{value}</span>
            </motion.p>
          )
        }

        return (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.07, duration: 0.28, ease: 'easeOut' }}
            className={className}
          >
            {line.text}
          </motion.p>
        )
      })}
    </div>
  )
}
