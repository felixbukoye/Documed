import Greeting from '../components/dashboard/Greeting'
import StatCards from '../components/dashboard/StatCards'
import UpcomingAppointments from '../components/dashboard/UpcomingAppointments'
import RecentPatients from '../components/dashboard/RecentPatients'
import HealthTrendChart from '../components/dashboard/HealthTrendChart'
import PatientStatistics from '../components/dashboard/PatientStatistics'
import TestResultsTable from '../components/dashboard/TestResultsTable'
import { useAsyncData } from '../lib/useAsyncData'
import {
  kpiStats,
  appointments,
  patients,
  healthTrend,
  patientStats,
  testResults,
} from '../lib/mock'

/**
 * Dashboard — the clinician's home screen (PRD §6). Every widget resolves
 * independently (PRD §7.1) so a slow chart never blocks the shell.
 */
export default function Dashboard() {
  const kpis = useAsyncData(() => Promise.resolve(kpiStats), [], 550)
  const appts = useAsyncData(() => Promise.resolve(appointments), [], 800)
  const recents = useAsyncData(() => Promise.resolve(patients), [], 950)
  const trend = useAsyncData(() => Promise.resolve(healthTrend), [], 750)
  const stats = useAsyncData(() => Promise.resolve(patientStats), [], 1050)
  const results = useAsyncData(() => Promise.resolve(testResults), [], 1200)

  return (
    <div className="space-y-5 animate-fade-in">
      <Greeting />

      {/* KPI row */}
      <StatCards loading={kpis.loading} />

      {/* Mixed panel row: list, list, chart */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <UpcomingAppointments loading={appts.loading} />
        <RecentPatients loading={recents.loading} />
        <HealthTrendChart loading={trend.loading} />
      </div>

      {/* Bar chart + table row */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <PatientStatistics loading={stats.loading} />
        <TestResultsTable loading={results.loading} />
      </div>
    </div>
  )
}
