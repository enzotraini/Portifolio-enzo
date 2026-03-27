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

export default function Home() {
  return (
    <>
      <div className="md:hidden">
        <HeroMobile />
      </div>
      <div className="hidden md:block">
        <Hero />
      </div>
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
