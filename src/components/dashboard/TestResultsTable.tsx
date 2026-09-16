import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, AlertTriangle, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import Panel from '../ui/Panel'
import Skeleton from '../ui/Skeleton'
import Sparkline from '../ui/Sparkline'
import SearchInput from '../ui/SearchInput'
import StatusChip from '../ui/StatusChip'
import { testResults } from '../../lib/mock'

function flagMeta(flag: 'in' | 'elevated' | 'high') {
  if (flag === 'high')
    return { tone: 'danger' as const, label: 'High', icon: <TrendingUp size={13} /> }
  if (flag === 'elevated')
    return { tone: 'warning' as const, label: 'Elevated', icon: <TrendingUp size={13} /> }
  return { tone: 'success' as const, label: 'In range', icon: <Minus size={13} /> }
}

function trendOf(values: number[]): 'up' | 'down' | 'flat' {
  const first = values[0]
  const last = values[values.length - 1]
  if (last > first * 1.05) return 'up'
  if (last < first * 0.95) return 'down'
  return 'flat'
}

/**
 * Test Results table (PRD §6.11): scoped client-side search, inline sparkline
 * per row, and an explicit out-of-range flag (v1.1 enhancement, PRD §9).
 */
export default function TestResultsTable({ loading = false }: { loading?: boolean }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return testResults
    return testResults.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.patient.toLowerCase().includes(q) ||
        r.unit.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <Panel
      title="Test Results"
      action={
        <div className="w-40">
          <SearchInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            aria-label="Search test results"
            containerClassName="!py-0"
            className="!bg-surface-app/50 text-[13px]"
          />
        </div>
      }
      bodyClassName="px-2 pb-3"
    >
      {loading ? (
        <div className="space-y-2 px-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-9 w-full rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-sm">
            <thead>
              <tr className="text-left text-xs font-bold uppercase tracking-wide text-neutral-400">
                <th className="px-3 py-2 font-bold">Name</th>
                <th className="px-3 py-2 font-bold">Date</th>
                <th className="px-3 py-2 font-bold">Average</th>
                <th className="px-3 py-2 font-bold">Indicator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-3 py-8 text-center text-sm font-semibold text-neutral-400">
                    No test results match “{query.trim()}”.
                  </td>
                </tr>
              ) : (
                rows.map((r) => {
                  const meta = flagMeta(r.flag)
                  const trend = trendOf(r.spark)
                  return (
                    <tr
                      key={r.id}
                      onClick={() => navigate(`/labs/${r.id}`)}
                      className="cursor-pointer transition hover:bg-neutral-50"
                    >
                      <td className="px-3 py-2.5">
                        <div className="font-bold text-neutral-900">{r.name}</div>
                        <div className="text-[11px] text-neutral-400">{r.patient}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-2.5 text-neutral-500">
                        {r.date}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-neutral-800">
                            {r.value}
                            <span className="ml-1 text-xs font-semibold text-neutral-400">
                              {r.unit}
                            </span>
                          </span>
                          <StatusChip tone={meta.tone} icon={meta.icon}>
                            {meta.label}
                          </StatusChip>
                        </div>
                      </td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <Sparkline data={r.spark} color={r.color} width={96} height={30} />
                          <span
                            className={
                              trend === 'up'
                                ? 'text-success-600'
                                : trend === 'down'
                                ? 'text-danger-600'
                                : 'text-neutral-400'
                            }
                            aria-label={`Trend ${trend}`}
                          >
                            {trend === 'up' ? (
                              <TrendingUp size={15} />
                            ) : trend === 'down' ? (
                              <TrendingDown size={15} />
                            ) : (
                              <Minus size={15} />
                            )}
                          </span>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      )}
      <div className="flex items-center justify-end gap-1.5 px-3 pt-2 text-[11px] font-semibold text-neutral-400">
        <Search size={12} />
        Click a row to open the full lab detail
      </div>
    </Panel>
  )
}
