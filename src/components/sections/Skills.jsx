import { motion } from 'framer-motion'
import { FiServer, FiShield, FiLayout } from 'react-icons/fi'
import { skills } from '../../data/portfolio'
import { fadeUp, stagger } from '../../lib/motion'
import SectionHeading from '../ui/SectionHeading'

const ICON_MAP = {
  server: FiServer,
  shield: FiShield,
  layout: FiLayout,
}

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      style={{
        paddingTop: 'min(5rem, 15vh)',
        paddingBottom: 'min(5rem, 15vh)',
        background: 'linear-gradient(to bottom, transparent, rgba(107,33,168,0.06) 50%, transparent)'
      }}
    >
      <div
        className="w-full"
        style={{ padding: '0 clamp(1rem, 5vw, 4rem)' }}
      >
        <SectionHeading id="skills-heading" label="// WHAT I DO">
          Skills
        </SectionHeading>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 grid md:grid-cols-3 gap-6"
        >
          {skills.map((skill) => (
            <SkillCard key={skill.title} skill={skill} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function SkillCard({ skill }) {
  const Icon = ICON_MAP[skill.icon] ?? FiServer

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -8, boxShadow: '0 0 40px rgba(168,85,247,0.25)' }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col gap-5 p-7 rounded-xl border border-purple-deep/30 backdrop-blur-md transition-colors duration-300 hover:border-purple-primary/50 cursor-default"
      style={{ background: 'var(--bg-glass)' }}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center text-purple-primary border border-purple-deep/40 group-hover:border-purple-primary/50 transition-colors duration-300 self-center"
        style={{ background: 'rgba(168,85,247,0.08)' }}
      >
        <Icon size={50} />
      </div>

      {/* Title */}
      <h3 className="font-display font-semibold text-lg text-text-primary text-center">
        {skill.title}
      </h3>

      {/* Description */}
      <p className="text-text-secondary text-sm leading-relaxed flex-1 text-center">
        {skill.description}
      </p>

      {/* Skill items */}
      <ul className="flex flex-wrap justify-center gap-2">
        {skill.items.map((item) => (
          <li key={item} className="flex items-center gap-1.5 font-mono text-xs text-text-muted px-2.5 py-1 rounded-full border border-purple-deep/30">
            <span className="w-1 h-1 rounded-full bg-purple-primary shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
