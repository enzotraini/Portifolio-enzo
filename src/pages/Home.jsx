import Hero from '../components/Hero'
import HeroMobile from '../components/HeroMobile'
import About from '../components/About'
import Projects from '../components/Projects'
import WhyHireMe from '../components/WhyHireMe'
import Testimonials from '../components/Testimonials'
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
      <About />
      <Projects />
      <WhyHireMe />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  )
}
