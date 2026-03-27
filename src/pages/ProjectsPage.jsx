import ProjectShowcase from '../components/ProjectShowcase'
import Footer from '../components/Footer'

export default function ProjectsPage() {
  return (
    <>
      <div className="pt-24 bg-[var(--color-void)] min-h-screen">
        <ProjectShowcase />
      </div>
      <Footer />
    </>
  )
}
