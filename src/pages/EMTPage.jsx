import { Link } from 'react-router-dom'
import EMT from '../components/EMT'
import Footer from '../components/Footer'

export default function EMTPage() {
  return (
    <>
      <div className="pt-24">
        <div className="px-5 sm:px-6 md:px-12 lg:px-24 py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar
          </Link>
        </div>
        <EMT />
      </div>
      <Footer />
    </>
  )
}
