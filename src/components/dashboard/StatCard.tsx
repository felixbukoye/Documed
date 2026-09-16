import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import Skeleton from '../ui/Skeleton'

export default function StatCard({
  label,
  value,
  delta,
  icon,
  tone,
  to,
  loading = false,
}: {
  label: string
  value: ReactNode
  delta: ReactNode
  icon: ReactNode
  tone: 'primary' | 'success' | 'warning' | 'danger' | 'accent'
  to: string
  loading?: boolean
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-surface-white p-5 shadow-card ring-1 ring-black/[0.02]">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-3">
            <Skeleton className="h-3.5 w-24" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-3 w-28" />
          </div>
          <Skeleton className="h-11 w-11 rounded-2xl" />
        </div>
      </div>
    )
  }

  return (
    <Link
      to={to}
      className="group flex items-start justify-between gap-3 rounded-2xl bg-surface-white p-5 shadow-card ring-1 ring-black/[0.02] transition hover:-translate-y-0.5 hover:shadow-card-hover focus-visible:shadow-ring"
    >
      <div className="min-w-0">
        <div className="text-sm font-semibold text-neutral-500">{label}</div>
        <div className="mt-1 text-[28px] font-extrabold leading-none tracking-tight text-neutral-900">
          {value}
        </div>
        <div className="mt-2 text-[13px] font-bold">{delta}</div>
      </div>
      <div className="relative">
        {icon}
        <span className="absolute -right-1.5 -top-1.5 grid h-6 w-6 scale-0 place-items-center rounded-full bg-neutral-900 text-white opacity-0 transition group-hover:scale-100 group-hover:opacity-100">
          <ArrowUpRight size={13} />
        </span>
      </div>
    </Link>
  )
}
