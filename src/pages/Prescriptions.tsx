import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Pill as PillIcon } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import SearchInput from '../components/ui/SearchInput'
import StatusChip from '../components/ui/StatusChip'
import Avatar from '../components/ui/Avatar'
import { prescriptions, kpiStats } from '../lib/mock'

/** Prescriptions module (IA stub — PRD §5): active scripts + expiring flags. */
export default function Prescriptions() {
  const navigate = useNavigate()
  const [q, setQ] = useState('')

  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return prescriptions
    return prescriptions.filter(
      (p) =>
        p.medication.toLowerCase().includes(s) ||
        p.patient.toLowerCase().includes(s) ||
        p.dose.toLowerCase().includes(s),
    )
  }, [q])

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Prescriptions"
        description={`${kpiStats.activePrescriptions} active scripts · ${kpiStats.expiringPrescriptions} expiring soon.`}
        actions={
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-primary-700"
          >
            <Plus size={16} /> New prescription
          </button>
        }
      />

      <div className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-black/[0.02]">
        <div className="border-b border-neutral-100 p-4">
          <SearchInput
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search medication, patient, or dose…"
            aria-label="Search prescriptions"
            containerClassName="w-full sm:w-80"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-neutral-100 text-left text-xs font-bold uppercase tracking-wide text-neutral-400">
                <th className="px-5 py-3">Patient</th>
                <th className="px-4 py-3">Medication</th>
                <th className="px-4 py-3">Dose / Freq</th>
                <th className="px-4 py-3">Started</th>
                <th className="px-4 py-3">Refills</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {list.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => navigate(`/patients/${p.patientId}`)}
                  className="cursor-pointer transition hover:bg-neutral-50"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={p.patient} size={36} />
                      <span className="font-bold text-neutral-900">{p.patient}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-2 font-bold text-neutral-800">
                      <span className="grid h-6 w-6 place-items-center rounded-lg bg-accent-100 text-accent-600">
                        <PillIcon size={14} />
                      </span>
                      {p.medication}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-neutral-500">
                    {p.dose} · {p.frequency}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-neutral-500">
                    {p.started}
                  </td>
                  <td className="px-4 py-3 text-neutral-500">{p.refills}</td>
                  <td className="px-4 py-3">
                    <StatusChip tone={p.status === 'expiring' ? 'warning' : 'success'}>
                      {p.status === 'expiring' ? 'Expiring soon' : 'Active'}
                    </StatusChip>
                  </td>
                </tr>
              ))}
              {list.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-sm font-semibold text-neutral-400">
                    No prescriptions match “{q.trim()}”.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
