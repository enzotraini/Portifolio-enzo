import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScrollGradient from './components/ScrollGradient'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import ProjectsPage from './pages/ProjectsPage'
import SystemPage from './pages/SystemPage'

function App() {
  return (
    <>
      <ScrollGradient />
      <Navbar />
      <WhatsAppButton />
      <main className="relative z-10 w-full max-w-[100vw] overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projetos" element={<ProjectsPage />} />
          <Route path="/sistema-gestao" element={<SystemPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
