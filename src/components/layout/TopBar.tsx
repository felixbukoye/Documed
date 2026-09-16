import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Bell,
  ChevronDown,
  Menu,
  Search,
  UserRound,
  Settings,
  LogOut,
  AlertTriangle,
  CalendarClock,
  FlaskConical,
  Info,
  Plus,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import {
  patients,
  buildNotifications,
  type AppNotification,
} from '../../lib/mock'
import { timeAgo } from '../../lib/format'
import Avatar from '../ui/Avatar'
import ConfirmModal from '../ui/ConfirmModal'
import { useClickOutside } from '../../hooks/useClickOutside'

function pageTitle(pathname: string): string {
  if (pathname === '/') return 'Dashboard'
  if (pathname.startsWith('/patients/')) return 'Patient Profile'
  if (pathname.startsWith('/patients')) return 'Patients'
  if (pathname.startsWith('/appointments')) return 'Appointments'
  if (pathname.startsWith('/prescriptions')) return 'Prescriptions'
  if (pathname.startsWith('/labs')) return 'Lab Results'
  if (pathname.startsWith('/analytics')) return 'Analytics'
  if (pathname.startsWith('/settings')) return 'Settings'
  return 'DocuMed'
}

type MenuKey = 'search' | 'notif' | 'profile' | null

const notifIcon = (t: AppNotification['type']) => {
  switch (t) {
    case 'urgent':
      return (
        <span className="grid h-9 w-9 place-items-center rounded-full bg-danger-100 text-danger-600">
          <AlertTriangle size={16} />
        </span>
      )
    case 'appointment':
      return (
        <span className="grid h-9 w-9 place-items-center rounded-full bg-primary-100 text-primary-600">
          <CalendarClock size={16} />
        </span>
      )
    case 'lab':
      return (
        <span className="grid h-9 w-9 place-items-center rounded-full bg-accent-100 text-accent-600">
          <FlaskConical size={16} />
        </span>
      )
    default:
      return (
        <span className="grid h-9 w-9 place-items-center rounded-full bg-neutral-100 text-neutral-500">
          <Info size={16} />
        </span>
      )
  }
}

export default function TopBar({ onOpenNav }: { onOpenNav: () => void }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const title = pageTitle(location.pathname)

  const [menu, setMenu] = useState<MenuKey>(null)
  const [signOutOpen, setSignOutOpen] = useState(false)

  // ---- Global patient search (PRD §6.2) ----
  const [query, setQuery] = useState('')
  const [debounced, setDebounced] = useState('')
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 300)
    return () => clearTimeout(t)
  }, [query])

  const results = useMemo(() => {
    const q = debounced.trim().toLowerCase()
    if (q.length < 2) return []
    return patients
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.mrn.toLowerCase().includes(q) ||
          p.dob.includes(q),
      )
      .slice(0, 6)
  }, [debounced])

  // ---- Notifications (PRD §6.3) ----
  const [notifications, setNotifications] = useState<AppNotification[]>(() =>
    buildNotifications(),
  )
  const unread = notifications.filter((n) => !n.read).length

  const searchRef = useRef<HTMLDivElement>(null)
  const notifRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  useClickOutside(searchRef, () => setMenu((m) => (m === 'search' ? null : m)), true)
  useClickOutside(notifRef, () => setMenu((m) => (m === 'notif' ? null : m)), true)
  useClickOutside(profileRef, () => setMenu((m) => (m === 'profile' ? null : m)), true)

  const selectPatient = (id: string) => {
    setMenu(null)
    setQuery('')
    navigate(`/patients/${id}`)
  }

  const markAllRead = () =>
    setNotifications((ns) => ns.map((n) => ({ ...n, read: true })))

  const openNotif = (n: AppNotification) => {
    setMenu(null)
    navigate(n.to)
  }

  // Mark viewed (now-open) items as read when the panel closes.
  const wasOpenNotif = useRef(false)
  useEffect(() => {
    if (menu === 'notif') wasOpenNotif.current = true
    else if (wasOpenNotif.current) {
      wasOpenNotif.current = false
      markAllRead()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menu])

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-neutral-200/70 bg-white/85 px-4 backdrop-blur-md sm:px-6">
      <button
        type="button"
        onClick={onOpenNav}
        className="grid h-9 w-9 place-items-center rounded-lg text-neutral-500 hover:bg-neutral-100 lg:hidden"
        aria-label="Open navigation"
      >
        <Menu size={20} />
      </button>

      <h1 className="text-lg font-extrabold tracking-tight text-neutral-900">
        {title}
      </h1>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        {/* Global search */}
        <div ref={searchRef} className="relative hidden md:block">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setMenu('search')
              }}
              onFocus={() => query.length >= 2 && setMenu('search')}
              placeholder="Search Patients……"
              aria-label="Search patients"
              className="w-56 rounded-xl border border-neutral-200 bg-surface-app/60 py-2 pl-9 pr-3 text-sm text-neutral-800 placeholder:text-neutral-400 transition focus:w-72 focus:border-primary-400 focus:bg-white focus:shadow-ring"
            />
          </div>

          {menu === 'search' && debounced.trim().length >= 2 && (
            <div className="absolute right-0 top-full z-40 mt-2 w-80 overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-dropdown animate-fade-in">
              <div className="px-3 py-2 text-xs font-bold uppercase tracking-wide text-neutral-400">
                {results.length} result{results.length === 1 ? '' : 's'}
              </div>
              {results.length > 0 ? (
                <ul className="max-h-80 overflow-y-auto pb-1">
                  {results.map((p) => (
                    <li key={p.id}>
                      <button
                        type="button"
                        onClick={() => selectPatient(p.id)}
                        className="flex w-full items-center gap-3 px-3 py-2 text-left transition hover:bg-neutral-50"
                      >
                        <Avatar name={p.name} size={36} />
                        <div className="min-w-0">
                          <div className="truncate text-sm font-bold text-neutral-900">
                            {p.name}
                          </div>
                          <div className="truncate text-xs text-neutral-400">
                            {p.mrn} · DOB {p.dob}
                          </div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-6 text-center">
                  <div className="text-sm font-semibold text-neutral-500">
                    No patients found for “{debounced.trim()}”
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setMenu(null)
                      setQuery('')
                      navigate('/patients?new=1')
                    }}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-primary-700"
                  >
                    <Plus size={14} /> Create new patient
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button
            type="button"
            onClick={() => setMenu((m) => (m === 'notif' ? null : 'notif'))}
            className="relative grid h-10 w-10 place-items-center rounded-xl text-neutral-500 transition hover:bg-neutral-100"
            aria-label={`Notifications${unread ? ` (${unread} unread)` : ''}`}
          >
            <Bell size={20} />
            {unread > 0 && (
              <span className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full bg-danger-500 ring-2 ring-white" />
            )}
          </button>

          {menu === 'notif' && (
            <div className="absolute right-0 top-full z-40 mt-2 w-80 overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-dropdown animate-fade-in">
              <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-3">
                <span className="text-sm font-bold text-neutral-900">Notifications</span>
                {unread > 0 && (
                  <button
                    type="button"
                    onClick={markAllRead}
                    className="text-xs font-bold text-primary-600 hover:text-primary-700"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <ul className="max-h-96 overflow-y-auto">
                {notifications.map((n) => (
                  <li key={n.id}>
                    <button
                      type="button"
                      onClick={() => openNotif(n)}
                      className={`flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-neutral-50 ${
                        n.read ? 'opacity-70' : ''
                      }`}
                    >
                      {notifIcon(n.type)}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-neutral-900">
                            {n.title}
                          </span>
                          {!n.read && (
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                          )}
                        </div>
                        <div className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-neutral-500">
                          {n.body}
                        </div>
                        <div className="mt-1 text-[11px] font-semibold text-neutral-400">
                          {timeAgo(n.time)}
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Profile chip */}
        <div ref={profileRef} className="relative">
          <button
            type="button"
            onClick={() => setMenu((m) => (m === 'profile' ? null : 'profile'))}
            className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-2 transition hover:bg-neutral-100"
          >
            <Avatar name={user?.name ?? 'User'} size={38} />
            <div className="hidden text-left leading-tight sm:block">
              <div className="text-sm font-bold text-neutral-900">
                {user?.name}
              </div>
              <div className="text-xs font-semibold text-neutral-400">
                {user?.role}
              </div>
            </div>
            <ChevronDown
              size={16}
              className={`hidden text-neutral-400 transition-transform sm:block ${
                menu === 'profile' ? 'rotate-180' : ''
              }`}
            />
          </button>

          {menu === 'profile' && (
            <div className="absolute right-0 top-full z-40 mt-2 w-60 overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-dropdown animate-fade-in">
              <div className="flex items-center gap-3 border-b border-neutral-100 px-4 py-3">
                <Avatar name={user?.name ?? 'User'} size={40} />
                <div className="min-w-0">
                  <div className="truncate text-sm font-bold text-neutral-900">
                    {user?.name}
                  </div>
                  <div className="truncate text-xs text-neutral-400">
                    {user?.email}
                  </div>
                </div>
              </div>
              <div className="p-1.5">
                <MenuItem
                  icon={<UserRound size={17} />}
                  label="View Profile"
                  onClick={() => {
                    setMenu(null)
                    navigate('/settings')
                  }}
                />
                <MenuItem
                  icon={<Settings size={17} />}
                  label="Settings"
                  onClick={() => {
                    setMenu(null)
                    navigate('/settings')
                  }}
                />
                <div className="my-1 h-px bg-neutral-100" />
                <MenuItem
                  icon={<LogOut size={17} />}
                  label="Sign out"
                  danger
                  onClick={() => setSignOutOpen(true)}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        open={signOutOpen}
        danger
        title="Sign out of DocuMed?"
        description="Any unsaved changes will be lost and your session will be ended on this workstation."
        confirmLabel="Sign out"
        cancelLabel="Cancel"
        onConfirm={() => {
          setSignOutOpen(false)
          logout()
        }}
        onCancel={() => setSignOutOpen(false)}
      />
    </header>
  )
}

function MenuItem({
  icon,
  label,
  onClick,
  danger = false,
}: {
  icon: React.ReactNode
  label: string
  onClick: () => void
  danger?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition ${
        danger
          ? 'text-danger-600 hover:bg-danger-50'
          : 'text-neutral-700 hover:bg-neutral-50'
      }`}
    >
      <span className={danger ? 'text-danger-500' : 'text-neutral-400'}>{icon}</span>
      {label}
    </button>
  )
}
