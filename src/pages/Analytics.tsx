import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import PageHeader from '../components/ui/PageHeader'
import Panel from '../components/ui/Panel'
import IconBadge from '../components/dashboard/IconBadge'
import { Users, HeartPulse, Activity, AlertCircle } from 'lucide-react'
import { patientStats, healthTrend } from '../lib/mock'
import { chart } from '../lib/tokens'
import { formatNumber } from '../lib/format'

const visitMix = [
  { name: 'Routine Checkup', value: 42, color: chart.primary },
  { name: 'Follow-ups', value: 31, color: chart.success },
  { name: 'Consults', value: 17, color: chart.accent },
  { name: 'Screenings', value: 10, color: chart.warning },
]

/** Analytics module (IA stub — PRD §5): practice-level reporting. */
export default function Analytics() {
  const cards = [
    { label: 'Total Patients', value: formatNumber(1248), icon: <Users size={22} />, tone: 'primary' as const, delta: '+12% MoM' },
    { label: 'Avg. HbA1c', value: '6.4%', icon: <Activity size={22} />, tone: 'success' as const, delta: '-0.3% QoQ' },
    { label: 'Care Quality', value: '85%', icon: <HeartPulse size={22} />, tone: 'accent' as const, delta: '+0.75%' },
    { label: 'Active Alerts', value: '2', icon: <AlertCircle size={22} />, tone: 'danger' as const, delta: 'urgent' },
  ]

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Analytics"
        description="Practice-level trends and population insights."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className="flex items-start justify-between gap-3 rounded-2xl bg-white p-5 shadow-card ring-1 ring-black/[0.02]"
          >
            <div>
              <div className="text-sm font-semibold text-neutral-500">{c.label}</div>
              <div className="mt-1 text-[28px] font-extrabold leading-none tracking-tight text-neutral-900">
                {c.value}
              </div>
              <div className="mt-2 text-[13px] font-bold text-success-600">{c.delta}</div>
            </div>
            <IconBadge tone={c.tone}>{c.icon}</IconBadge>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Panel title="New Patients vs. Follow-ups" bodyClassName="px-3 pb-4">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={patientStats} barGap={4} margin={{ top: 8, right: 4, left: -10, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke={chart.grid} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: chart.axis }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: chart.axis }} axisLine={false} tickLine={false} width={40} />
                <Tooltip cursor={{ fill: 'rgba(47,90,240,0.05)' }} />
                <Bar dataKey="newPatients" name="New Patients" fill={chart.primary} radius={[5, 5, 0, 0]} maxBarSize={16} />
                <Bar dataKey="followUps" name="Follow-ups" fill={chart.success} radius={[5, 5, 0, 0]} maxBarSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Visit Mix" bodyClassName="flex flex-col items-center pb-4">
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={visitMix}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={52}
                  outerRadius={80}
                  paddingAngle={3}
                  stroke="none"
                >
                  {visitMix.map((v) => (
                    <Cell key={v.name} fill={v.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid w-full grid-cols-2 gap-2">
            {visitMix.map((v) => (
              <div key={v.name} className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: v.color }} />
                {v.name}
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          title="Health Trend (7d)"
          menu={<span className="text-xs font-semibold text-neutral-400">{healthTrend.headline}%</span>}
          bodyClassName="px-3 pb-3"
        >
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={healthTrend['7d']} margin={{ top: 8, right: 4, left: -18, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke={chart.grid} />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: chart.axis }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: chart.axis }} axisLine={false} tickLine={false} domain={[75, 90]} />
                <Tooltip />
                <Bar dataKey="value" name="Score" fill={chart.primary} radius={[5, 5, 0, 0]} maxBarSize={26} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>
    </div>
  )
}
