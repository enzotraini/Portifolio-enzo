import { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import HeroMobile from '../components/HeroMobile'
import TrustBar from '../components/TrustBar'
import Solutions from '../components/Solutions'
import HowWeWork from '../components/HowWeWork'
import About from '../components/About'
import WhyHireMe from '../components/WhyHireMe'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import FinalCTA from '../components/FinalCTA'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

function useMinWidth(px) {
  const query = `(min-width: ${px}px)`
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const media = window.matchMedia(query)
    const onChange = () => setMatches(media.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [query])

  return matches
}

export default function Home() {
  const isDesktop = useMinWidth(768)

  return (
    <>
      {isDesktop ? <Hero /> : <HeroMobile />}
      <TrustBar />
      <Solutions />
      <HowWeWork />
      <About />
      <WhyHireMe />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Contact />
      <Footer />
    </>
  )
}
