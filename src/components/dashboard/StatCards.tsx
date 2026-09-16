import {
  Users,
  CalendarDays,
  FlaskConical,
  Pill,
  TrendingUp,
  AlertTriangle,
  Clock,
} from 'lucide-react'
import StatCard from './StatCard'
import IconBadge from './IconBadge'
import { kpiStats } from '../../lib/mock'
import { formatNumber } from '../../lib/format'

/**
 * The 4-across KPI row (PRD §6.6). Each card is a summary with a drill-down:
 * clicking routes into the matching module, pre-filtered where applicable.
 */
export default function StatCards({ loading = false }: { loading?: boolean }) {
  const s = kpiStats

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        loading={loading}
        label="Total Patients"
        value={formatNumber(s.totalPatients)}
        tone="primary"
        to="/patients"
        icon={
          <IconBadge tone="primary">
            <Users size={22} />
          </IconBadge>
        }
        delta={
          <span className="inline-flex items-center gap-1 text-success-600">
            <TrendingUp size={14} />
            +{s.patientsDeltaPct}% from last month
          </span>
        }
      />

      <StatCard
        loading={loading}
        label="Today's Appointments"
        value={formatNumber(s.todayAppointments)}
        tone="success"
        to="/appointments?date=today"
        icon={
          <IconBadge tone="success">
            <CalendarDays size={22} />
          </IconBadge>
        }
        delta={
          <span className="inline-flex items-center gap-1 text-warning-600">
            <Clock size={14} />
            {s.pendingAppointments} pending
          </span>
        }
      />

      <StatCard
        loading={loading}
        label="Pending Lab Results"
        value={formatNumber(s.pendingLabs)}
        tone="accent"
        to="/labs?filter=pending"
        icon={
          <IconBadge tone="accent">
            <FlaskConical size={22} />
          </IconBadge>
        }
        delta={
          <span className="inline-flex items-center gap-1 text-danger-600">
            <AlertTriangle size={14} />
            {s.urgentLabs} urgent
          </span>
        }
      />

      <StatCard
        loading={loading}
        label="Active Prescriptions"
        value={formatNumber(s.activePrescriptions)}
        tone="accent"
        to="/prescriptions"
        icon={
          <IconBadge tone="accent">
            <Pill size={22} />
          </IconBadge>
        }
        delta={
          <span className="inline-flex items-center gap-1 text-warning-600">
            <Clock size={14} />
            {s.expiringPrescriptions} expiring soon
          </span>
        }
      />
    </div>
  )
}
