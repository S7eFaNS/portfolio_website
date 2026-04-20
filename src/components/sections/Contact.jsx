import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { profile } from '../../data/portfolio'
import { fadeUp, stagger } from '../../lib/motion'
import SectionHeading from '../ui/SectionHeading'

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-[min(10rem,15vh)] pb-24"
    >
      <div
        className="w-full"
        style={{ padding: '0 clamp(1rem,5vw,4rem)' }}
      >
        <SectionHeading id="contact-heading" label="// GET IN TOUCH">
          Contact me
        </SectionHeading>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 max-w-xl flex flex-col gap-6"
        >
          <motion.p variants={fadeUp} className="text-text-secondary leading-relaxed">
            Have an idea, a role to discuss, or just want to say hi? My inbox is open.
            I try to respond within a day or two.
          </motion.p>

          <motion.a
            variants={fadeUp}
            href={`mailto:${profile.email}`}
            className="font-mono text-text-primary hover:text-purple-primary transition-colors duration-200 break-all"
            style={{ fontSize: 'clamp(0.95rem, 2vw, 1.2rem)' }}
          >
            {profile.email}
          </motion.a>

          <motion.div variants={fadeUp} className="flex gap-3">
            <ContactIcon href={profile.social.github}      label="GitHub"   Icon={FiGithub}   />
            <ContactIcon href={profile.social.linkedin}    label="LinkedIn" Icon={FiLinkedin} />
            <ContactIcon href={`mailto:${profile.email}`} label="Email"    Icon={FiMail}     />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function ContactIcon({ href, label, Icon }) {
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
