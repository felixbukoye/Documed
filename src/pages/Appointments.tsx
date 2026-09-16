import { useNavigate } from 'react-router-dom'
import { CalendarPlus, Clock, MapPin } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import StatusChip from '../components/ui/StatusChip'
import Avatar from '../components/ui/Avatar'
import { appointments } from '../lib/mock'

/** Appointments module (IA stub — PRD §5): today's schedule, sorted by time. */
export default function Appointments() {
  const navigate = useNavigate()
  const list = [...appointments].sort((a, b) => a.minutes - b.minutes)

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Appointments"
        description="Today's schedule and room assignments."
        actions={
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-primary-700"
          >
            <CalendarPlus size={16} /> New appointment
          </button>
        }
      />

      <div className="space-y-3">
        {list.map((a) => (
          <button
            key={a.id}
            type="button"
            onClick={() => navigate(`/patients/${a.patientId}`)}
            className="flex w-full items-center gap-4 rounded-2xl bg-white p-4 text-left shadow-card ring-1 ring-black/[0.02] transition hover:-translate-y-0.5 hover:shadow-card-hover"
          >
            <div className="flex w-20 shrink-0 flex-col items-center rounded-xl bg-primary-50 px-3 py-2 text-primary-700">
              <span className="text-base font-extrabold leading-none">{a.time}</span>
              <span className="mt-1 flex items-center gap-1 text-[11px] font-semibold">
                <Clock size={12} /> {a.room}
              </span>
            </div>
            <Avatar name={a.name} size={44} />
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-bold text-neutral-900">
                {a.name}
              </div>
              <div className="flex items-center gap-1.5 truncate text-[13px] text-neutral-400">
                <MapPin size={13} /> {a.type}
              </div>
            </div>
            <StatusChip tone={a.status === 'pending' ? 'warning' : 'success'}>
              {a.status === 'pending' ? 'Pending' : 'Confirmed'}
            </StatusChip>
          </button>
        ))}
      </div>
    </div>
  )
}
