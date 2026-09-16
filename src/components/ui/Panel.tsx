import type { ReactNode } from 'react'

interface PanelProps {
  title?: string
  action?: ReactNode
  menu?: ReactNode
  children: ReactNode
  className?: string
  bodyClassName?: string
  padded?: boolean
}

/**
 * Card / panel container (PRD §4.3): white surface, rounded-2xl, soft shadow,
 * title + optional header action slot, content below with consistent padding.
 */
export default function Panel({
  title,
  action,
  menu,
  children,
  className = '',
  bodyClassName = '',
  padded = true,
}: PanelProps) {
  return (
    <section
      className={`flex flex-col rounded-2xl bg-surface-white shadow-card ring-1 ring-black/[0.02] ${className}`}
    >
      {(title || action || menu) && (
        <header className="flex items-center justify-between gap-3 px-5 pt-4 pb-1">
          {title && (
            <h2 className="text-[15px] font-bold text-neutral-900 tracking-[-0.01em]">
              {title}
            </h2>
          )}
          {(action || menu) && (
            <div className="flex items-center gap-1">
              {action}
              {menu}
            </div>
          )}
        </header>
      )}
      <div className={`flex-1 ${padded ? 'p-5 pt-3' : ''} ${bodyClassName}`}>
        {children}
      </div>
    </section>
  )
}
