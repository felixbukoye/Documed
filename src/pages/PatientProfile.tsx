import { useNavigate, useParams } from 'react-router-dom'
import {
  CalendarClock,
  Droplets,
  Gauge,
  HeartPulse,
  Stethoscope,
  ArrowRight,
} from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Panel from '../components/ui/Panel'
import Avatar from '../components/ui/Avatar'
import StatusChip from '../components/ui/StatusChip'
import Sparkline from '../components/ui/Sparkline'
import { patients, appointments, testResults } from '../lib/mock'
import NotFound from './NotFound'

/** Patient Profile (drill-down target — PRD §5 / §7.3). */
export default function PatientProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const patient = patients.find((p) => p.id === id)
  if (!patient) return <NotFound />

  const appt = appointments.find((a) => a.patientId === patient.id)
  const labs = testResults.filter((r) => r.patient === patient.name)

  const vitals = [
    { label: 'Blood Pressure', value: '128/82', unit: 'mmHg', icon: <Gauge size={18} />, tone: 'bg-primary-100 text-primary-600' },
    { label: 'Heart Rate', value: '72', unit: 'bpm', icon: <HeartPulse size={18} />, tone: 'bg-danger-100 text-danger-600' },
    { label: 'SpO₂', value: '98', unit: '%', icon: <Droplets size={18} />, tone: 'bg-accent-100 text-accent-600' },
  ]

  return (
    <div className="animate-fade-in">
      <PageHeader title={patient.name} backLabel="Back to Patients" backTo="/patients" />

      {/* Identity card */}
      <div className="mb-5 flex flex-wrap items-center gap-4 rounded-2xl bg-white p-5 shadow-card ring-1 ring-black/[0.02]">
        <Avatar name={patient.name} size={72} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-extrabold tracking-tight text-neutral-900">
              {patient.name}
            </h2>
            {patient.condition && <StatusChip tone="primary">{patient.condition}</StatusChip>}
          </div>
          <div className="mt-1 text-sm font-semibold text-neutral-400">
            {patient.mrn} · {patient.age}y · {patient.sex}
          </div>
        </div>
        <button
          type="button"
          onClick={() => navigate(`/appointments?patient=${patient.id}`)}
          className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-primary-700"
        >
          <CalendarClock size={16} /> Book visit
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Panel title="Vitals" className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {vitals.map((v) => (
              <div key={v.label} className="rounded-xl bg-surface-app/60 p-4">
                <div className="flex items-center gap-2">
                  <span className={`grid h-9 w-9 place-items-center rounded-xl ${v.tone}`}>
                    {v.icon}
                  </span>
                  <span className="text-xs font-bold text-neutral-400">{v.label}</span>
                </div>
                <div className="mt-3 text-2xl font-extrabold tracking-tight text-neutral-900">
                  {v.value}
                  <span className="ml-1 text-xs font-semibold text-neutral-400">{v.unit}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5">
            <div className="mb-2 text-sm font-bold text-neutral-700">Recent labs</div>
            {labs.length === 0 ? (
              <div className="rounded-xl bg-surface-app/60 px-4 py-6 text-center text-sm font-semibold text-neutral-400">
                No recent lab results on file.
              </div>
            ) : (
              <div className="space-y-2">
                {labs.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => navigate(`/labs/${r.id}`)}
                    className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-neutral-50"
                  >
                    <div>
                      <div className="text-sm font-bold text-neutral-900">{r.name}</div>
                      <div className="text-xs text-neutral-400">{r.date}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Sparkline data={r.spark} color={r.color} width={80} height={26} />
                      <span className="w-16 text-right text-sm font-bold text-neutral-800">
                        {r.value}
                        <span className="ml-1 text-xs font-semibold text-neutral-400">{r.unit}</span>
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </Panel>

        <div className="space-y-5">
          <Panel title="Upcoming">
            {appt ? (
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-50 text-primary-600">
                  <CalendarClock size={20} />
                </span>
                <div>
                  <div className="text-sm font-bold text-neutral-900">{appt.time} · {appt.room}</div>
                  <div className="text-xs text-neutral-400">{appt.type}</div>
                </div>
              </div>
            ) : (
              <div className="text-sm font-semibold text-neutral-400">No upcoming visits.</div>
            )}
            <button
              type="button"
              onClick={() => navigate('/appointments')}
              className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary-600 hover:text-primary-700"
            >
              View schedule <ArrowRight size={13} />
            </button>
          </Panel>

          <Panel title="Care">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-success-100 text-success-600">
                <Stethoscope size={18} />
              </span>
              <div>
                <div className="text-sm font-bold text-neutral-900">Dr. Sarah Wilson</div>
                <div className="text-xs text-neutral-400">Primary cardiologist</div>
                <div className="mt-2 text-xs text-neutral-400">Last visit {patient.lastVisit}</div>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}
