import { useNavigate } from 'react-router-dom'
import { CalendarPlus, Clock } from 'lucide-react'
import Panel from '../ui/Panel'
import Skeleton from '../ui/Skeleton'
import AvatarListRow from './AvatarListRow'
import { appointments } from '../../lib/mock'

/**
 * Upcoming Appointments widget (PRD §6.7): next N today in chronological order,
 * each row clickable to the patient chart, "See Details" to the full module.
 */
export default function UpcomingAppointments({
  loading = false,
}: {
  loading?: boolean
}) {
  const navigate = useNavigate()
  const list = appointments
    .filter((a) => a.status !== 'completed')
    .sort((a, b) => a.minutes - b.minutes)
    .slice(0, 4)

  return (
    <Panel
      title="Upcoming Appointments"
      action={
        <button
          type="button"
          onClick={() => navigate('/appointments?date=today')}
          className="rounded-lg px-3 py-1.5 text-xs font-bold text-primary-600 transition hover:bg-primary-50"
        >
          See Details
        </button>
      }
      bodyClassName="px-3 pb-3"
    >
      {loading ? (
        <div className="space-y-2 px-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 py-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3.5 w-40" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-3.5 w-14" />
            </div>
          ))}
        </div>
      ) : list.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-4 py-10 text-center">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-neutral-100 text-neutral-400">
            <Clock size={22} />
          </div>
          <p className="mt-3 text-sm font-semibold text-neutral-500">
            No upcoming appointments today
          </p>
          <button
            type="button"
            onClick={() => navigate('/appointments?new=1')}
            className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-primary-700"
          >
            <CalendarPlus size={14} /> Schedule appointment
          </button>
        </div>
      ) : (
        <ul className="divide-y divide-neutral-100/70">
          {list.map((a) => (
            <li key={a.id} className="divide-neutral-100/70">
              <AvatarListRow
                name={a.name}
                primary={a.name}
                secondary={a.type}
                onClick={() => navigate(`/patients/${a.patientId}`)}
                meta={
                  <div className="flex flex-col items-end gap-0.5">
                    <span className="text-sm font-bold text-neutral-800">
                      {a.time}
                    </span>
                    <span className="text-[11px] font-semibold text-neutral-400">
                      {a.room}
                    </span>
                  </div>
                }
              />
            </li>
          ))}
        </ul>
      )}
    </Panel>
  )
}
