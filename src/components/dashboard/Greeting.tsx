import { useAuth } from '../../context/AuthContext'
import { greetingFor, preferredName } from '../../lib/format'

/** Personalized, time-of-day-aware greeting (PRD §6.5). */
export default function Greeting() {
  const { user } = useAuth()
  const full = user?.name ?? ''
  const g = greetingFor(new Date().getHours())
  const m = full.match(/^(Dr\.|Prof\.)\s+(.*)$/)
  const displayName = m ? `${m[1]} ${m[2].split(' ')[0]}` : preferredName(full)
  return (
    <div className="mb-5">
      <h1 className="text-2xl font-extrabold tracking-tight text-primary-600 sm:text-3xl">
        {g}, {displayName}
      </h1>
    </div>
  )
}
