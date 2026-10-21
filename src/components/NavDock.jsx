import { createElement } from 'react'
import { LayoutGroup, motion, useReducedMotion } from 'framer-motion'
import { Building2, Globe, LayoutDashboard, Mail, Users, Workflow } from 'lucide-react'
import { Link } from 'react-router-dom'
import SteelFlowLink from './SteelFlowLink'

const SPRING = { type: 'spring', stiffness: 480, damping: 34, mass: 0.8 }

const products = [
  { id: 'erp', to: '/sistema-gestao', label: 'ERP', name: 'EMT ERP', icon: LayoutDashboard },
  { id: 'crm', to: '/crm', label: 'CRM', name: 'EMT CRM', icon: Users },
  { id: 'steel', label: 'Steel', name: 'SteelFlow', icon: Workflow, confirm: true },
  { id: 'sites', to: '/sites', label: 'Sites', name: 'Criador de sites', icon: Globe },
]

const pages = [
  { id: 'sobre', to: '/#sobre', label: 'Sobre', name: 'Sobre', icon: Building2 },
  { id: 'contato', to: '/#contato', label: 'Contato', name: 'Contato', icon: Mail },
]

function DockSlot({ active, tone, label, name, icon, to, confirm }) {
  const reduce = useReducedMotion()
  const light = tone === 'light'
  const className = `relative flex h-[62px] w-[74px] flex-col items-center justify-center gap-1.5 rounded-2xl outline-none transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 ${
    light
      ? 'text-[var(--color-navy)] hover:bg-[var(--color-surface-muted)] focus-visible:ring-[var(--color-primary)]'
      : 'text-white hover:bg-white/10 focus-visible:ring-white'
  }`

  const body = (
    <>
      {active ? (
        <motion.span
          layoutId="emt-nav-dock-pill"
          className={`pointer-events-none absolute inset-1 rounded-[14px] ${
            light ? 'bg-[var(--color-primary)]/12' : 'bg-white/25'
          }`}
          transition={reduce ? { duration: 0 } : SPRING}
        />
      ) : null}
      {createElement(icon, {
        className: 'relative h-5 w-5',
        strokeWidth: 1.75,
        'aria-hidden': true,
      })}
      <span className="relative text-[11px] font-semibold leading-none tracking-tight">{label}</span>
    </>
  )

  if (confirm) {
    return (
      <SteelFlowLink className={className}>
        {body}
      </SteelFlowLink>
    )
  }

  return (
    <Link to={to} className={className} aria-label={name} aria-current={active ? 'page' : undefined}>
      {body}
    </Link>
  )
}

export default function NavDock({ tone = 'dark', activeId, vertical = false }) {
  const light = tone === 'light'

  return (
    <LayoutGroup id="emt-nav-dock">
      <div
        className={`inline-flex gap-1 border backdrop-blur-xl transition-colors duration-300 ${
          vertical ? 'flex-col items-center rounded-[26px] px-1.5 py-2' : 'items-center rounded-[26px] px-2 py-1.5'
        } ${
          light
            ? 'border-[var(--color-border)] bg-white/90 shadow-md'
            : 'border-white/20 bg-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.22)]'
        }`}
        role="navigation"
        aria-label="Atalhos"
      >
        {products.map((item) => (
          <DockSlot key={item.id} {...item} active={activeId === item.id} tone={tone} />
        ))}
        <span
          aria-hidden
          className={`self-center ${vertical ? 'my-1 h-px w-7' : 'mx-1 h-7 w-px'} ${light ? 'bg-[var(--color-border)]' : 'bg-white/30'}`}
        />
        {pages.map((item) => (
          <DockSlot key={item.id} {...item} active={activeId === item.id} tone={tone} />
        ))}
      </div>
    </LayoutGroup>
  )
}
