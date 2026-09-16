import type { ReactNode } from 'react'
import Avatar from '../ui/Avatar'

/**
 * Shared avatar list row (PRD §4.3): circular avatar + two-line text block +
 * right-aligned meta. Reused by Upcoming Appointments and Recent Patients.
 */
export default function AvatarListRow({
  name,
  primary,
  secondary,
  meta,
  onClick,
  leading,
}: {
  name: string
  primary: ReactNode
  secondary?: ReactNode
  meta?: ReactNode
  onClick?: () => void
  leading?: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left transition hover:bg-neutral-50"
    >
      {leading ?? <Avatar name={name} size={40} />}
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-bold text-neutral-900">{primary}</div>
        {secondary && (
          <div className="truncate text-[13px] text-neutral-400">{secondary}</div>
        )}
      </div>
      {meta && <div className="shrink-0 text-right">{meta}</div>}
    </button>
  )
}
