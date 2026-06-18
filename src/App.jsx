import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScrollGradient from './components/ScrollGradient'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import SitesPage from './pages/SitesPage'
import SystemPage from './pages/SystemPage'

function AppShell() {
  const location = useLocation()
  const isSitesPage = location.pathname === '/sites'

  return (
    <>
      {!isSitesPage && <ScrollGradient />}
      <Navbar />
      {!isSitesPage && <WhatsAppButton />}
      <main className={`relative z-10 w-full max-w-[100vw] ${isSitesPage ? '' : 'overflow-x-hidden'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sites" element={<SitesPage />} />
          <Route path="/projetos" element={<Navigate to="/sites" replace />} />
          <Route path="/sistema-gestao" element={<SystemPage />} />
        </Routes>
      </main>
    </>
  )
}

function App() {
  return <AppShell />
}

export default App
