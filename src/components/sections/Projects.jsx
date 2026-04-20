import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { projects, profile } from '../../data/portfolio'
import { fadeUp, stagger } from '../../lib/motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import SectionHeading from '../ui/SectionHeading'
import PillTag from '../ui/PillTag'

const MAX_PILLS = 4

export default function Projects() {
  const reduced = usePrefersReducedMotion()

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-[min(10rem,15vh)]"
      style={{ 
        paddingBottom: 'min(5rem, 15vh)',
        background: 'linear-gradient(to bottom, transparent, rgba(107,33,168,0.06) 50%, transparent)' 
      }}
    >
      <div
        className="w-full"
        style={{ padding: '0 clamp(1rem,5vw,4rem)' }}
      >
        <SectionHeading id="projects-heading" label="// SELECTED WORK">
          Projects
        </SectionHeading>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} reduced={reduced} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ marginTop: '1.5rem' }}
          className="mt-12 flex justify-center"
        >
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 min-w-[170px] px-8 py-4 rounded-full font-display font-semibold text-sm text-purple-primary border border-purple-deep transition-all duration-200 hover:border-purple-primary hover:bg-purple-deep/20"          >
            <FiGithub size={16} />
            View all on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function ProjectCard({ project, reduced }) {
  const cardRef = useRef()
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 300, damping: 25, mass: 0.5 })
  const springY = useSpring(rotateY, { stiffness: 300, damping: 25, mass: 0.5 })

  const handleMouseMove = (e) => {
    if (reduced || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
    rotateY.set(dx * 5)
    rotateX.set(-dy * 5)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  const extraPills = project.tech.length - MAX_PILLS

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 800, background: 'var(--bg-glass)' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group flex flex-col rounded-xl border border-purple-deep/30 backdrop-blur-md overflow-hidden transition-colors duration-300 hover:border-purple-primary/50 cursor-default"
      whileHover={{ boxShadow: '0 8px 40px rgba(168,85,247,0.2)' }}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-44 shrink-0 bg-purple-deep/20">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(10,6,18,0.85) 0%, rgba(168,85,247,0.15) 60%, transparent 100%)' }}
        />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-4 p-5 flex-1">
        <h3 className="font-display font-semibold text-text-primary text-lg leading-snug">
          {project.title}
        </h3>

        <p className="text-text-secondary text-sm leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, MAX_PILLS).map((t) => (
            <PillTag key={t} label={t} />
          ))}
          {extraPills > 0 && (
            <span className="font-mono text-xs text-text-muted px-2 py-1">
              +{extraPills} more
            </span>
          )}
        </div>

        {/* Links */}
        {(project.github || project.demo) && (
          <div className="flex items-center gap-3 pt-1">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} source code`}
                className="flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-purple-primary transition-colors duration-200"
              >
                <FiGithub size={24} /> Source
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo`}
                className="flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-purple-primary transition-colors duration-200"
              >
                <FiExternalLink size={14} /> Live
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}
