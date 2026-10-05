import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScrollGradient from './components/ScrollGradient'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'

const SitesPage = lazy(() => import('./pages/SitesPage'))
const SystemPage = lazy(() => import('./pages/SystemPage'))
const CrmPage = lazy(() => import('./pages/CrmPage'))

function AppShell() {
  const location = useLocation()
  const isSitesPage = location.pathname === '/sites'

  return (
    <>
      {!isSitesPage && <ScrollGradient />}
      <Navbar />
      {!isSitesPage && <WhatsAppButton />}
      <main className={`relative z-10 w-full max-w-[100vw] ${isSitesPage ? '' : 'overflow-x-hidden'}`}>
        <Suspense fallback={<div className="min-h-svh" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sites" element={<SitesPage />} />
            <Route path="/projetos" element={<Navigate to="/sites" replace />} />
            <Route path="/sistema-gestao" element={<SystemPage />} />
            <Route path="/crm" element={<CrmPage />} />
          </Routes>
        </Suspense>
      </main>
    </>
  )
}

function App() {
  return <AppShell />
}

export default App
