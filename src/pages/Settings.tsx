import { useState } from 'react'
import { Bell, LogOut, ShieldCheck, Save } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Panel from '../components/ui/Panel'
import Avatar from '../components/ui/Avatar'
import ConfirmModal from '../components/ui/ConfirmModal'
import { useAuth } from '../context/AuthContext'

function Toggle({
  on,
  onChange,
  label,
  hint,
}: {
  on: boolean
  onChange: (v: boolean) => void
  label: string
  hint: string
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <div className="text-sm font-bold text-neutral-800">{label}</div>
        <div className="text-xs text-neutral-400">{hint}</div>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={label}
        onClick={() => onChange(!on)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          on ? 'bg-primary-600' : 'bg-neutral-200'
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
            on ? 'left-[22px]' : 'left-0.5'
          }`}
        />
      </button>
    </div>
  )
}

/** Settings module (IA stub — PRD §5): profile + preferences + sign out. */
export default function Settings() {
  const { user, logout } = useAuth()
  const [urgent, setUrgent] = useState(true)
  const [appt, setAppt] = useState(true)
  const [digest, setDigest] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  return (
    <div className="animate-fade-in">
      <PageHeader title="Settings" description="Manage your profile and preferences." />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Panel title="Profile" className="lg:col-span-2">
          <div className="flex items-center gap-4">
            <Avatar name={user?.name ?? 'User'} size={64} />
            <div className="min-w-0 flex-1">
              <input
                defaultValue={user?.name}
                aria-label="Display name"
                className="w-full rounded-lg border border-transparent bg-transparent px-2 py-1 text-lg font-extrabold text-neutral-900 transition hover:border-neutral-200 focus:border-primary-400 focus:bg-white focus:shadow-ring"
              />
              <div className="px-2 text-sm font-semibold text-neutral-400">
                {user?.role} · {user?.email}
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Email" value={user?.email ?? ''} />
            <Field label="Role" value={user?.role ?? ''} />
            <Field label="Location" value="Cardiology — Outpatient" />
            <Field label="Clinic ID" value="CLN-0042" />
          </div>
          <div className="mt-5 flex justify-end">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-primary-700"
            >
              <Save size={16} /> Save changes
            </button>
          </div>
        </Panel>

        <Panel title="Notifications" menu={<Bell size={18} className="text-neutral-400" />}>
          <div className="divide-y divide-neutral-100">
            <Toggle on={urgent} onChange={setUrgent} label="Urgent lab alerts" hint="Immediate notification for high-priority results" />
            <Toggle on={appt} onChange={setAppt} label="Appointment changes" hint="Schedule updates and room reassignments" />
            <Toggle on={digest} onChange={setDigest} label="Daily summary" hint="Morning digest of today's panel" />
          </div>
        </Panel>
      </div>

      <Panel title="Session" className="mt-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-danger-50 text-danger-600">
              <ShieldCheck size={20} />
            </span>
            <div>
              <div className="text-sm font-bold text-neutral-800">Sign out of this workstation</div>
              <div className="text-xs text-neutral-400">
                Ends your session and clears cached patient data.
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-danger-200 bg-danger-50 px-4 py-2 text-sm font-bold text-danger-600 transition hover:bg-danger-100"
          >
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </Panel>

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

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-neutral-400">
        {label}
      </span>
      <input
        defaultValue={value}
        aria-label={label}
        className="w-full rounded-lg border border-neutral-200 bg-surface-app/50 px-3 py-2 text-sm font-semibold text-neutral-700 transition focus:border-primary-400 focus:bg-white focus:shadow-ring"
      />
    </label>
  )
}
