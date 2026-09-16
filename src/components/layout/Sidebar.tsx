import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Pill,
  FlaskConical,
  BarChart3,
  Settings as SettingsIcon,
  LogOut,
  HeartPulse,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import ConfirmModal from '../ui/ConfirmModal'
import { useState } from 'react'
import type { ReactNode } from 'react'

interface NavItem {
  to: string
  label: string
  icon: ReactNode
  end?: boolean
}

const NAV: NavItem[] = [
  { to: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} />, end: true },
  { to: '/patients', label: 'Patients', icon: <Users size={20} /> },
  { to: '/appointments', label: 'Appointments', icon: <CalendarDays size={20} /> },
  { to: '/prescriptions', label: 'Prescriptions', icon: <Pill size={20} /> },
  { to: '/labs', label: 'Lab Results', icon: <FlaskConical size={20} /> },
  { to: '/analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
  { to: '/settings', label: 'Settings', icon: <SettingsIcon size={20} /> },
]

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3 px-3">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary-600 text-white shadow-[0_6px_16px_rgba(47,90,240,0.35)]">
        <HeartPulse size={24} strokeWidth={2.2} />
      </span>
      {!compact && (
        <div className="leading-tight">
          <div className="text-[17px] font-extrabold tracking-tight text-neutral-900">
            DocuMed
          </div>
          <div className="text-xs font-semibold text-neutral-400">
            Healthcare Records
          </div>
        </div>
      )}
    </div>
  )
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#/" className="flex items-center py-5" aria-label="DocuMed home">
      <Logo compact={compact} />
    </a>
  )
}

interface SidebarProps {
  compact?: boolean
  onNavigate?: () => void
}

export default function Sidebar({ compact = false, onNavigate }: SidebarProps) {
  const { logout } = useAuth()
  const [confirmOpen, setConfirmOpen] = useState(false)

  return (
    <div className="flex h-full w-full flex-col bg-surface-white">
      <Brand compact={compact} />

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              [
                'group flex items-center gap-3 rounded-full px-3 py-2.5 text-sm font-bold transition-colors',
                compact ? 'justify-center' : '',
                isActive
                  ? 'bg-primary-600 text-white shadow-[0_8px_18px_rgba(47,90,240,0.28)]'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900',
              ].join(' ')
            }
            aria-label={item.label}
            title={compact ? item.label : undefined}
          >
            {({ isActive }) => (
              <>
                <span
                  className={
                    isActive
                      ? 'text-white'
                      : 'text-neutral-400 transition-colors group-hover:text-neutral-700'
                  }
                >
                  {item.icon}
                </span>
                {!compact && <span>{item.label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-neutral-100 p-3">
        <button
          type="button"
          onClick={() => setConfirmOpen(true)}
          className={`group flex w-full items-center gap-3 rounded-full px-3 py-2.5 text-sm font-bold text-danger-600 transition-colors hover:bg-danger-50 ${
            compact ? 'justify-center' : ''
          }`}
          aria-label="Sign out"
          title={compact ? 'Sign out' : undefined}
        >
          <span className="text-danger-500 transition-transform group-hover:-translate-x-0.5">
            <LogOut size={20} />
          </span>
          {!compact && <span>Sign out</span>}
        </button>
      </div>

      <ConfirmModal
        open={confirmOpen}
        danger
        title="Sign out of DocuMed?"
        description="Any unsaved changes will be lost and your session will be ended on this workstation."
        confirmLabel="Sign out"
        cancelLabel="Cancel"
        onConfirm={() => {
          setConfirmOpen(false)
          logout()
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  )
}
