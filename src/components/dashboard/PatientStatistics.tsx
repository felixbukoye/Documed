import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import Panel from '../ui/Panel'
import Skeleton from '../ui/Skeleton'
import { patientStats } from '../../lib/mock'
import { chart } from '../../lib/tokens'

function BarTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg bg-neutral-900 px-3 py-2 text-xs text-white shadow-dropdown">
      <div className="font-bold">{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="mt-1 flex items-center gap-2">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ background: p.fill }}
          />
          <span className="text-neutral-300">{p.name}:</span>
          <span className="font-bold text-white">{p.value}</span>
        </div>
      ))}
    </div>
  )
}

/** Patient Statistics grouped bar chart (PRD §6.10): New Patients vs Follow-ups. */
export default function PatientStatistics({ loading = false }: { loading?: boolean }) {
  return (
    <Panel title="Patient Statistics" bodyClassName="px-3 pb-4">
      {loading ? (
        <div className="space-y-3 px-2">
          <Skeleton className="h-56 w-full rounded-xl" />
          <div className="flex justify-center gap-6">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      ) : (
        <>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={patientStats}
                barGap={4}
                margin={{ top: 8, right: 4, left: -8, bottom: 0 }}
              >
                <CartesianGrid vertical={false} stroke={chart.grid} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: chart.axis }}
                  axisLine={false}
                  tickLine={false}
                  padding={{ left: 8, right: 8 }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: chart.axis }}
                  axisLine={false}
                  tickLine={false}
                  width={48}
                  label={{
                    value: 'Number of Patients',
                    angle: -90,
                    position: 'insideLeft',
                    style: { fontSize: 11, fill: chart.axis, textAnchor: 'middle' },
                    offset: 8,
                  }}
                />
                <Tooltip
                  content={<BarTooltip />}
                  cursor={{ fill: 'rgba(47,90,240,0.05)' }}
                />
                <Bar
                  dataKey="newPatients"
                  name="New Patients"
                  fill={chart.primary}
                  radius={[5, 5, 0, 0]}
                  maxBarSize={18}
                />
                <Bar
                  dataKey="followUps"
                  name="Follow-ups"
                  fill={chart.success}
                  radius={[5, 5, 0, 0]}
                  maxBarSize={18}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex items-center justify-center gap-6">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: chart.primary }} />
              New Patients
            </span>
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: chart.success }} />
              Follow-ups
            </span>
          </div>
        </>
      )}
    </Panel>
  )
}
