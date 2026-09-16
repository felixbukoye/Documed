import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

/**
 * Shared header for sub-module stub screens. Keeps the IA entry points (PRD
 * §5) visually consistent with the dashboard design system.
 */
export default function PageHeader({
  title,
  description,
  backTo = '/',
  backLabel = 'Back to Dashboard',
  actions,
}: {
  title: string
  description?: string
  backTo?: string
  backLabel?: string
  actions?: ReactNode
}) {
  return (
    <div className="mb-6">
      <Link
        to={backTo}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-400 transition hover:text-primary-600"
      >
        <ArrowRight size={13} className="rotate-180" />
        {backLabel}
      </Link>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-primary-600">
            {title}
          </h2>
          {description && (
            <p className="mt-1 max-w-2xl text-sm text-neutral-500">{description}</p>
          )}
        </div>
        {actions}
      </div>
    </div>
  )
}
