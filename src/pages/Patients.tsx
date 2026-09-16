import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Plus, ChevronRight } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import SearchInput from '../components/ui/SearchInput'
import StatusChip from '../components/ui/StatusChip'
import Avatar from '../components/ui/Avatar'
import { patients } from '../lib/mock'

/** Patients module (IA stub with a working, searchable list — PRD §5). */
export default function Patients() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const showNew = params.get('new') === '1'
  const [q, setQ] = useState('')

  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return patients
    return patients.filter(
      (p) =>
        p.name.toLowerCase().includes(s) ||
        p.mrn.toLowerCase().includes(s) ||
        (p.condition ?? '').toLowerCase().includes(s),
    )
  }, [q])

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Patients"
        description="Search, open, and manage every record in your panel."
        actions={
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-primary-700"
          >
            <Plus size={16} /> New patient
          </button>
        }
      />

      {showNew && (
        <div className="mb-4 flex items-center justify-between rounded-2xl border border-dashed border-primary-300 bg-primary-50 px-4 py-3 text-sm font-semibold text-primary-700">
          <span>Create new patient record — ready when the backend is connected.</span>
          <button
            type="button"
            onClick={() => navigate('/patients')}
            className="rounded-lg bg-white px-3 py-1 text-xs font-bold text-primary-700 shadow-sm hover:bg-primary-100"
          >
            Create
          </button>
        </div>
      )}

      <div className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-black/[0.02]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 p-4">
          <SearchInput
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, MRN, or condition…"
            aria-label="Search patients"
            containerClassName="w-full sm:w-80"
          />
          <span className="text-sm font-semibold text-neutral-400">
            {list.length} of {patients.length} patients
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-neutral-100 text-left text-xs font-bold uppercase tracking-wide text-neutral-400">
                <th className="px-5 py-3">Patient</th>
                <th className="px-4 py-3">MRN</th>
                <th className="px-4 py-3">Age / Sex</th>
                <th className="px-4 py-3">Condition</th>
                <th className="px-4 py-3">Last visit</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {list.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => navigate(`/patients/${p.id}`)}
                  className="cursor-pointer transition hover:bg-neutral-50"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={p.name} size={38} />
                      <div>
                        <div className="font-bold text-neutral-900">{p.name}</div>
                        <div className="text-xs text-neutral-400">{p.type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-neutral-500">{p.mrn}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-neutral-500">
                    {p.age} · {p.sex === 'Male' ? 'M' : 'F'}
                  </td>
                  <td className="px-4 py-3">
                    {p.condition ? (
                      <StatusChip tone="primary">{p.condition}</StatusChip>
                    ) : (
                      <span className="text-neutral-300">—</span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-neutral-500">
                    {p.lastVisit}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <ChevronRight size={18} className="ml-auto text-neutral-300" />
                  </td>
                </tr>
              ))}
              {list.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-sm font-semibold text-neutral-400"
                  >
                    No patients match “{q.trim()}”.
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
