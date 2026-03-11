import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import CustomCursor from './components/CustomCursor'
import ScrollGradient from './components/ScrollGradient'
import Home from './pages/Home'
import EMTPage from './pages/EMTPage'

function App() {
  return (
    <>
      <CustomCursor />
      <ScrollGradient />
      <Navbar />
      <main className="relative z-10 w-full max-w-[100vw] overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/emt" element={<EMTPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
