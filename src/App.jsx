import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import WhyHireMe from './components/WhyHireMe'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import ScrollGradient from './components/ScrollGradient'

function App() {
  return (
    <>
      <CustomCursor />
      <ScrollGradient />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <WhyHireMe />
        <Contact />
        <Footer />
      </main>
    </>
  )
}

export default App
