import { useNavigate, useParams } from 'react-router-dom'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts'
import { FlaskConical, TrendingUp, TrendingDown, Minus, User, CalendarDays, Stethoscope } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Panel from '../components/ui/Panel'
import Avatar from '../components/ui/Avatar'
import StatusChip from '../components/ui/StatusChip'
import { testResults } from '../lib/mock'
import { chart } from '../lib/tokens'
import NotFound from './NotFound'

const RANGES: Record<string, string> = {
  Glucose: '70 – 140 mg/dL',
  'Glycosylated HGB': '4.0 – 5.6 %',
  'Ketone Bodies': '0 – 8 mg/dL',
  'C-reactive protein': '0.0 – 3.0 mg/L',
  'Blood Pressure': '< 130/85 mmHg',
  'LDL Cholesterol': '0 – 100 mg/dL',
}

function DetailTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg bg-neutral-900 px-3 py-2 text-xs text-white shadow-dropdown">
      <span className="font-bold">{payload[0].value}</span> {payload[0].payload.unit}
    </div>
  )
}

/** Lab Result Detail (drill-down target — PRD §5 / §7.2). */
export default function LabResultDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const result = testResults.find((r) => r.id === id)
  if (!result) return <NotFound />

  const meta =
    result.flag === 'high'
      ? { tone: 'danger' as const, label: 'High', icon: <TrendingUp size={13} /> }
      : result.flag === 'elevated'
      ? { tone: 'warning' as const, label: 'Elevated', icon: <TrendingUp size={13} /> }
      : { tone: 'success' as const, label: 'In range', icon: <Minus size={13} /> }

  const series = result.spark.map((v, i) => ({
    label: `${i + 1}`,
    value: v,
    unit: result.unit,
  }))

  return (
    <div className="animate-fade-in">
      <PageHeader title={result.name} backLabel="Back to Lab Results" backTo="/labs" />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Panel className="lg:col-span-2" title="Result trend">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="text-4xl font-extrabold tracking-tight text-neutral-900">
                {result.value}
                <span className="ml-1.5 text-base font-bold text-neutral-400">{result.unit}</span>
              </div>
              <div className="mt-2">
                <StatusChip tone={meta.tone} icon={meta.icon}>
                  {meta.label}
                </StatusChip>
              </div>
            </div>
            <div className="text-right text-sm">
              <div className="font-bold text-neutral-700">Reference range</div>
              <div className="text-neutral-400">{RANGES[result.name] ?? '—'}</div>
            </div>
          </div>

          <div className="mt-5 h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={series} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                <defs>
                  <linearGradient id="lrFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={result.color} stopOpacity={0.25} />
                    <stop offset="100%" stopColor={result.color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: chart.axis }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: chart.axis }} axisLine={false} tickLine={false} width={40} domain={['auto', 'auto']} />
                <Tooltip content={<DetailTooltip />} cursor={{ stroke: result.color, opacity: 0.4 }} />
                <Area type="monotone" dataKey="value" stroke={result.color} strokeWidth={2.5} fill="url(#lrFill)" dot={false} activeDot={{ r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <div className="space-y-5">
          <Panel title="Patient">
            <div className="flex items-center gap-3">
              <Avatar name={result.patient} size={44} />
              <div>
                <button
                  type="button"
                  onClick={() => navigate('/patients')}
                  className="text-sm font-bold text-neutral-900 hover:text-primary-600"
                >
                  {result.patient}
                </button>
                <div className="text-xs text-neutral-400">View full chart →</div>
              </div>
            </div>
          </Panel>

          <Panel title="Details">
            <dl className="space-y-3 text-sm">
              <Row icon={<CalendarDays size={16} />} label="Collected" value={result.date} />
              <Row icon={<FlaskConical size={16} />} label="Test" value={result.name} />
              <Row icon={<Stethoscope size={16} />} label="Ordered by" value="Dr. Sarah Wilson" />
              <Row icon={<User size={16} />} label="Result" value={`${result.value} ${result.unit}`} />
            </dl>
          </Panel>
        </div>
      </div>
    </div>
  )
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="flex items-center gap-2 font-semibold text-neutral-400">
        <span className="text-neutral-400">{icon}</span>
        {label}
      </dt>
      <dd className="font-bold text-neutral-800">{value}</dd>
    </div>
  )
}
