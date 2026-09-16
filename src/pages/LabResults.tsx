import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FlaskConical, TrendingUp, Minus } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import SearchInput from '../components/ui/SearchInput'
import StatusChip from '../components/ui/StatusChip'
import Sparkline from '../components/ui/Sparkline'
import Avatar from '../components/ui/Avatar'
import { testResults, kpiStats } from '../lib/mock'

type Filter = 'all' | 'pending' | 'urgent'

/** Lab Results module (IA stub — PRD §5). Pre-filtered by the ?filter= param. */
export default function LabResults() {
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const initial = (params.get('filter') as Filter) || 'all'
  const [filter, setFilter] = useState<Filter>(
    initial === 'pending' || initial === 'urgent' ? initial : 'all',
  )
  const [q, setQ] = useState('')

  const rows = useMemo(() => {
    const s = q.trim().toLowerCase()
    return testResults.filter((r) => {
      const matchesQuery =
        !s ||
        r.name.toLowerCase().includes(s) ||
        r.patient.toLowerCase().includes(s)
      if (!matchesQuery) return false
      if (filter === 'urgent') return r.flag === 'high'
      if (filter === 'pending') return r.flag !== 'in'
      return true
    })
  }, [filter, q])

  const setFilterAndNav = (f: Filter) => {
    setFilter(f)
    if (f === 'all') setParams({}, { replace: true })
    else setParams({ filter: f }, { replace: true })
  }

  const chips: { key: Filter; label: string }[] = [
    { key: 'all', label: 'All results' },
    { key: 'pending', label: `Pending (${kpiStats.pendingLabs})` },
    { key: 'urgent', label: `Urgent (${kpiStats.urgentLabs})` },
  ]

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Lab Results"
        description={`${kpiStats.pendingLabs} pending · ${kpiStats.urgentLabs} urgent.`}
      />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {chips.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => setFilterAndNav(c.key)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                filter === c.key
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'bg-white text-neutral-500 shadow-card ring-1 ring-black/[0.02] hover:text-neutral-800'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <SearchInput
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search tests…"
          aria-label="Search lab results"
          containerClassName="w-full sm:w-64"
        />
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-black/[0.02]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-neutral-100 text-left text-xs font-bold uppercase tracking-wide text-neutral-400">
                <th className="px-5 py-3">Test</th>
                <th className="px-4 py-3">Patient</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Average</th>
                <th className="px-4 py-3">Indicator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {rows.map((r) => (
                <tr
                  key={r.id}
                  onClick={() => navigate(`/labs/${r.id}`)}
                  className="cursor-pointer transition hover:bg-neutral-50"
                >
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center gap-2 font-bold text-neutral-900">
                      <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent-100 text-accent-600">
                        <FlaskConical size={14} />
                      </span>
                      {r.name}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Avatar name={r.patient} size={30} />
                      <span className="text-neutral-600">{r.patient}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-neutral-500">{r.date}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-neutral-800">
                        {r.value}
                        <span className="ml-1 text-xs font-semibold text-neutral-400">
                          {r.unit}
                        </span>
                      </span>
                      <StatusChip
                        tone={
                          r.flag === 'high' ? 'danger' : r.flag === 'elevated' ? 'warning' : 'success'
                        }
                        icon={
                          r.flag === 'high' ? (
                            <TrendingUp size={13} />
                          ) : (
                            <Minus size={13} />
                          )
                        }
                      >
                        {r.flag === 'high' ? 'High' : r.flag === 'elevated' ? 'Elevated' : 'In range'}
                      </StatusChip>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Sparkline data={r.spark} color={r.color} width={96} height={30} />
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-sm font-semibold text-neutral-400">
                    No lab results for this filter.
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
