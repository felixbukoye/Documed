import { useRef, useState } from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import { MoreHorizontal, TrendingUp, TrendingDown } from 'lucide-react'
import Panel from '../ui/Panel'
import Skeleton from '../ui/Skeleton'
import StatusChip from '../ui/StatusChip'
import { healthTrend } from '../../lib/mock'
import { chart } from '../../lib/tokens'
import { useClickOutside } from '../../hooks/useClickOutside'

type Range = '7d' | '30d' | '90d'

function TrendTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  const p = payload[0]
  return (
    <div className="rounded-lg bg-neutral-900 px-3 py-2 text-xs text-white shadow-dropdown">
      <div className="font-bold">{p.payload.label}</div>
      <div className="mt-0.5 text-neutral-300">
        Health score: <span className="font-bold text-white">{p.value}%</span>
      </div>
    </div>
  )
}

/** Health Trend chart (PRD §6.9): headline % + semantic delta chip + range switcher. */
export default function HealthTrendChart({ loading = false }: { loading?: boolean }) {
  const [range, setRange] = useState<Range>('7d')
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  useClickOutside(menuRef, () => setMenuOpen(false), menuOpen)

  const data = healthTrend[range]
  const delta = healthTrend.deltaPct
  const isUp = delta >= 0

  return (
    <Panel
      title="Health Trend Chart"
      menu={
        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="grid h-8 w-8 place-items-center rounded-lg text-neutral-400 transition hover:bg-neutral-100"
            aria-label="Chart options"
            aria-expanded={menuOpen}
          >
            <MoreHorizontal size={18} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-full z-30 mt-1 w-32 overflow-hidden rounded-xl border border-neutral-100 bg-white py-1 shadow-dropdown animate-fade-in">
              {(['7d', '30d', '90d'] as Range[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setRange(r)
                    setMenuOpen(false)
                  }}
                  className={`flex w-full items-center justify-between px-3 py-1.5 text-sm font-semibold transition hover:bg-neutral-50 ${
                    r === range ? 'text-primary-600' : 'text-neutral-600'
                  }`}
                >
                  {r === '7d' ? 'Last 7 days' : r === '30d' ? 'Last 30 days' : 'Last 90 days'}
                  {r === range && <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />}
                </button>
              ))}
            </div>
          )}
        </div>
      }
      bodyClassName="px-3 pb-3"
    >
      {loading ? (
        <div className="space-y-3 px-2">
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 px-2 pt-1">
            <span className="text-3xl font-extrabold tracking-tight text-neutral-900">
              {healthTrend.headline}%
            </span>
            <StatusChip tone={isUp ? 'success' : 'danger'}>
              {isUp ? (
                <TrendingUp size={13} />
              ) : (
                <TrendingDown size={13} />
              )}
              {isUp ? '+' : ''}
              {delta}%
            </StatusChip>
          </div>
          <div className="mt-2 h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 6, right: 6, left: 6, bottom: 0 }}>
                <defs>
                  <linearGradient id="htFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={chart.primary} stopOpacity={0.22} />
                    <stop offset="100%" stopColor={chart.primary} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chart.grid} />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 11, fill: chart.axis }}
                  axisLine={false}
                  tickLine={false}
                  interval={range === '7d' ? 0 : 'preserveStartEnd'}
                  minTickGap={16}
                />
                <YAxis
                  hide
                  domain={['dataMin - 3', 'dataMax + 2']}
                  tick={{ fontSize: 11, fill: chart.axis }}
                />
                <Tooltip content={<TrendTooltip />} cursor={{ stroke: chart.primarySoft }} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={chart.primary}
                  strokeWidth={2.5}
                  fill="url(#htFill)"
                  dot={false}
                  activeDot={{ r: 4, strokeWidth: 2, stroke: '#fff' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </Panel>
  )
}
