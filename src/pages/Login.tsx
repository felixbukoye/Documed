import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { HeartPulse, Lock, Mail, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Avatar from '../components/ui/Avatar'
import { clinician } from '../lib/mock'

/**
 * Login screen (PRD §7.1 entry point + §7.4 target). In this demo any
 * non-empty credentials authenticate the seeded clinician session.
 */
export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState(clinician.email)
  const [password, setPassword] = useState('documed')
  const [showPw, setShowPw] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email.trim() || !password.trim()) return
    setSubmitting(true)
    // Simulated auth round-trip.
    setTimeout(() => {
      login(email.trim(), clinician.name, clinician.role)
      navigate('/', { replace: true })
    }, 450)
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden overflow-hidden bg-primary-600 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.25), transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.18), transparent 45%)',
          }}
        />
        <div className="relative flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/30 backdrop-blur">
            <HeartPulse size={24} strokeWidth={2.2} />
          </span>
          <div className="leading-tight">
            <div className="text-lg font-extrabold tracking-tight">DocuMed</div>
            <div className="text-xs font-semibold text-white/70">
              Healthcare Records
            </div>
          </div>
        </div>

        <div className="relative max-w-md">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight">
            Your entire patient panel, in one calm workspace.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/80">
            Today's schedule, urgent labs, and population trends — a fast
            situational read before your first visit.
          </p>
          <ul className="mt-8 space-y-3 text-sm font-semibold text-white/90">
            {[
              'Glanceable urgent-lab triage',
              'Room-ready appointment flow',
              'Live population health trends',
            ].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative text-xs font-semibold text-white/60">
          © 2024 DocuMed Health · HIPAA-ready EMR platform
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center bg-surface-app p-6">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-600 text-white">
              <HeartPulse size={24} strokeWidth={2.2} />
            </span>
            <div className="leading-tight">
              <div className="text-lg font-extrabold tracking-tight text-neutral-900">
                DocuMed
              </div>
              <div className="text-xs font-semibold text-neutral-400">
                Healthcare Records
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900">
            Welcome back
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Sign in to your clinician workspace.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-bold text-neutral-700">
                Email
              </span>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-neutral-200 bg-white py-2.5 pl-9 pr-3 text-sm text-neutral-800 shadow-sm transition focus:border-primary-400 focus:shadow-ring"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-bold text-neutral-700">
                Password
              </span>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="w-full rounded-xl border border-neutral-200 bg-white py-2.5 pl-9 pr-10 text-sm text-neutral-800 shadow-sm transition focus:border-primary-400 focus:shadow-ring"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                >
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            <div className="flex items-center justify-between text-xs">
              <label className="inline-flex items-center gap-2 font-semibold text-neutral-500">
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                />
                Keep me signed in
              </label>
              <button
                type="button"
                className="font-bold text-primary-600 hover:text-primary-700"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-bold text-white shadow-[0_8px_18px_rgba(47,90,240,0.28)] transition hover:bg-primary-700 disabled:opacity-70"
            >
              {submitting ? 'Signing in…' : 'Sign in'}
              {!submitting && (
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              )}
            </button>
          </form>

          <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-card ring-1 ring-black/[0.02]">
            <Avatar name={clinician.name} size={40} />
            <div className="min-w-0">
              <div className="truncate text-sm font-bold text-neutral-900">
                {clinician.name}
              </div>
              <div className="truncate text-xs font-semibold text-neutral-400">
                {clinician.role} · demo session
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
