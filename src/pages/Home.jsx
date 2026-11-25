import Palco from '../components/palco/Palco'
import Solutions from '../components/Solutions'
import HeroClientMarquee from '../components/HeroClientMarquee'
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
      <Palco />
      <section className="bg-[var(--color-surface-muted)] px-5 py-14 sm:px-8">
        <HeroClientMarquee lightText={false} />
      </section>
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
