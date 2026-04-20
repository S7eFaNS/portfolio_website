import { useState, useEffect } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import Loader from './components/ui/Loader'
import Navbar from './components/layout/Navbar'
import ScrollProgress from './components/layout/ScrollProgress'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Experience from './components/sections/Experience'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'

export default function App() {
  const [loading, setLoading] = useState(true)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), reduced ? 0 : 1200)
    return () => clearTimeout(t)
  }, [reduced])

  return (
    // MotionConfig: respects OS prefers-reduced-motion across all motion components
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {loading && <Loader key="loader" reduced={reduced} />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar />
          <ScrollProgress />
          <main style={{ paddingBottom: '2rem' }}>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </MotionConfig>
  )
}
