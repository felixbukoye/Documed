import { useNavigate } from 'react-router-dom'
import Panel from '../ui/Panel'
import Skeleton from '../ui/Skeleton'
import AvatarListRow from './AvatarListRow'
import { patients } from '../../lib/mock'

/**
 * Recent Patients widget (PRD §6.8): most recently interacted-with patients,
 * most recent first; row click opens the Patient Profile directly.
 */
export default function RecentPatients({ loading = false }: { loading?: boolean }) {
  const navigate = useNavigate()
  const list = [...patients]
    .sort((a, b) => (a.lastVisit < b.lastVisit ? 1 : -1))
    .slice(0, 4)

  return (
    <Panel
      title="Recent Patients"
      action={
        <button
          type="button"
          onClick={() => navigate('/patients')}
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
                <Skeleton className="h-3.5 w-36" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ul className="divide-y divide-neutral-100/70">
          {list.map((p) => (
            <li key={p.id}>
              <AvatarListRow
                name={p.name}
                primary={p.name}
                secondary={p.type}
                onClick={() => navigate(`/patients/${p.id}`)}
                meta={
                  <span className="text-[11px] font-semibold text-neutral-400">
                    {p.lastVisit}
                  </span>
                }
              />
            </li>
          ))}
        </ul>
      )}
    </Panel>
  )
}
