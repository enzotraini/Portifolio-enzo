import { lazy, Suspense, useLayoutEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScrollGradient from './components/ScrollGradient'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'

const SitesPage = lazy(() => import('./pages/SitesPage'))
const SystemPage = lazy(() => import('./pages/SystemPage'))
const CrmPage = lazy(() => import('./pages/CrmPage'))

function useInstantHashScroll() {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    let frame = 0
    let tries = 0
    let settled = false
    let cancelled = false

    const run = () => {
      if (cancelled) return
      if (!hash) {
        window.scrollTo(0, 0)
        return
      }
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) {
        el.scrollIntoView({ block: 'start' })
        if (!settled) {
          settled = true
          frame = requestAnimationFrame(run)
        }
        return
      }
      if (tries < 45) {
        tries += 1
        frame = requestAnimationFrame(run)
      }
    }

    run()
    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
    }
  }, [pathname, hash])
}

function AppShell() {
  const location = useLocation()
  const isSitesPage = location.pathname === '/sites'
  useInstantHashScroll()

  return (
    <>
      {!isSitesPage && <ScrollGradient />}
      <Navbar />
      {!isSitesPage && <WhatsAppButton />}
      <main className={`relative z-10 w-full max-w-[100vw] ${isSitesPage ? '' : 'overflow-x-clip'}`}>
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
